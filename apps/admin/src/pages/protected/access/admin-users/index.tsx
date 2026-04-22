import { useCallback, useMemo, useState } from "react"
import { ShieldCheck, ShieldOff, SquareUserRound, Users } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Input } from "@workspace/ui-components"
import { Badge } from "@workspace/ui-components/stable/badge"
import {
  DataTable,
  MetricCards,
  type DataTableFetchResult,
  type DataTableSortState,
} from "@workspace/app-components"
import {
  createAdminUserApi,
  listAdminUsersApi,
  type AdminUserStatus as ApiAdminUserStatus,
} from "@/api"

type AdminUserStatusLabel = "启用" | "停用"

interface AdminUserRow {
  user_id: string
  display_name: string
  remark: string | null
  status: ApiAdminUserStatus
  roles: string[]
}

interface AdminUserTableQuery {
  keyword: string
  keywordField: "all" | "display_name" | "user_id" | "remark" | "role"
  status: "" | AdminUserStatusLabel
}

const statusOptions = [
  { label: "启用", value: "启用" },
  { label: "停用", value: "停用" },
] as const

const adminUsersQueryKey = ["admin", "admin-users", "rows"] as const

export default function AdminUsersPage() {
  const [draftUserId, setDraftUserId] = useState("")
  const [draftDisplayName, setDraftDisplayName] = useState("")
  const [draftRemark, setDraftRemark] = useState("")
  const queryClient = useQueryClient()

  const loadAdminUserRows = useCallback(async (): Promise<AdminUserRow[]> => {
    const adminUsers = await listAdminUsersApi()

    return adminUsers.map((adminUser) => ({
      user_id: adminUser.user_id,
      display_name: adminUser.display_name?.trim() || "未设置显示名称",
      remark: adminUser.remark ?? null,
      status: adminUser.status,
      roles: adminUser.roles.map((role) => role.name),
    }))
  }, [])

  const adminUsersQuery = useQuery({
    queryKey: adminUsersQueryKey,
    queryFn: loadAdminUserRows,
  })

  const metricCards = useMemo(
    () => [
      {
        key: "all",
        label: "后台账号总数",
        value: `${adminUsersQuery.data?.length ?? 0}`,
        tail: "当前已注册为后台可登录账号的后台用户数量。",
        icon: <SquareUserRound className="size-4" />,
      },
      {
        key: "enabled",
        label: "启用账号",
        value: `${(adminUsersQuery.data ?? []).filter((row) => row.status === "enabled").length}`,
        tail: "具备正常后台访问能力的账号。",
        icon: <ShieldCheck className="size-4" />,
        variant: "success" as const,
      },
      {
        key: "disabled",
        label: "停用账号",
        value: `${(adminUsersQuery.data ?? []).filter((row) => row.status === "disabled").length}`,
        tail: "已被禁用，需要人工恢复或复核。",
        icon: <ShieldOff className="size-4" />,
        variant: "danger" as const,
      },
      {
        key: "multi-role",
        label: "多角色账号",
        value: `${(adminUsersQuery.data ?? []).filter((row) => row.roles.length > 1).length}`,
        tail: "同时挂载多个角色的重点账号。",
        icon: <Users className="size-4" />,
        variant: "accent" as const,
      },
    ],
    [adminUsersQuery.data]
  )

  const fetchData = useCallback(
    async ({
      page,
      pageSize,
      query,
      signal,
      sort,
    }: {
      page: number
      pageSize: number
      query: AdminUserTableQuery
      signal: AbortSignal
      sort: DataTableSortState | null
    }): Promise<DataTableFetchResult<AdminUserRow>> => {
      void signal
      const rows = await queryClient.ensureQueryData({
        queryKey: adminUsersQueryKey,
        queryFn: loadAdminUserRows,
      })

      const filteredRows = rows.filter((row) => {
        const keyword = query.keyword.trim().toLowerCase()
        const searchCandidatesByField = {
          all: [row.display_name, row.user_id, row.remark ?? "", ...row.roles],
          display_name: [row.display_name],
          user_id: [row.user_id],
          remark: row.remark ? [row.remark] : [],
          role: row.roles,
        } as const
        const searchCandidates =
          searchCandidatesByField[query.keywordField || "all"]

        const matchesKeyword =
          keyword.length === 0 ||
          searchCandidates.some((candidate) =>
            candidate.toLowerCase().includes(keyword)
          )

        const matchesStatus =
          query.status.length === 0 ||
          mapStatusLabelToApiStatus(query.status as AdminUserStatusLabel) ===
            row.status

        return matchesKeyword && matchesStatus
      })

      const sortedRows = [...filteredRows].sort((left, right) => {
        if (!sort) return 0

        const leftValue = getSortValue(left, sort.columnKey)
        const rightValue = getSortValue(right, sort.columnKey)
        const result = compareSortValues(leftValue, rightValue)

        return sort.direction === "asc" ? result : -result
      })

      const start = (page - 1) * pageSize
      const end = start + pageSize

      return {
        items: sortedRows.slice(start, end),
        total: sortedRows.length,
      }
    },
    [loadAdminUserRows, queryClient]
  )

  return (
    <div className="w-full min-w-0 space-y-4">
      <MetricCards items={metricCards} />

      <div className="flex h-[calc(100vh-22rem)] min-h-160 min-w-0 flex-1 overflow-hidden">
        <DataTable<AdminUserRow, AdminUserTableQuery>
          columns={[
            {
              key: "display_name",
              header: "显示名称",
              sortable: true,
              renderCell: (row) => (
                <span className="font-medium">{row.display_name}</span>
              ),
            },
            {
              key: "remark",
              header: "备注",
              sortable: true,
              renderCell: (row) =>
                row.remark?.trim() ? (
                  row.remark
                ) : (
                  <span className="text-sm text-(--app-muted-text)">
                    无备注
                  </span>
                ),
            },
            {
              key: "status",
              header: "状态",
              sortable: true,
              renderCell: (row) => (
                <Badge
                  variant={row.status === "enabled" ? "default" : "outline"}
                >
                  {mapApiStatusToLabel(row.status)}
                </Badge>
              ),
            },
            {
              key: "roles",
              header: "角色",
              renderCell: (row) =>
                row.roles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {row.roles.map((role) => (
                      <Badge key={role} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-(--app-muted-text)">
                    未分配角色
                  </span>
                ),
            },
            {
              key: "roleCount",
              header: "角色数",
              sortable: true,
              renderCell: (row) => row.roles.length,
            },
          ]}
          fetchData={fetchData}
          getRowId={(row) => row.user_id}
          height="100%"
          initialPageSize={10}
          initialQuery={{
            keyword: "",
            keywordField: "all",
            status: "",
          }}
          insert={{
            label: "新增后台账号",
            title: "创建后台账号",
            description:
              "当前服务端要求传入 user_id、display_name，remark 可选，状态默认创建为启用。",
            renderContent: () => (
              <div className="grid gap-4 py-2">
                <Input
                  value={draftUserId}
                  onValueChange={setDraftUserId}
                  placeholder="输入用户 UUID"
                />
                <Input
                  value={draftDisplayName}
                  onValueChange={setDraftDisplayName}
                  placeholder="输入显示名称"
                />
                <Input
                  value={draftRemark}
                  onValueChange={setDraftRemark}
                  placeholder="输入备注（可选）"
                />
              </div>
            ),
            onConfirm: async () => {
              const trimmedUserId = draftUserId.trim()
              const trimmedDisplayName = draftDisplayName.trim()
              if (!trimmedUserId) {
                throw new Error("user_id is required")
              }
              if (!trimmedDisplayName) {
                throw new Error("display_name is required")
              }

              await createAdminUserApi({
                user_id: trimmedUserId,
                display_name: trimmedDisplayName,
                remark: draftRemark.trim() ? draftRemark.trim() : null,
                status: "enabled",
              })

              setDraftUserId("")
              setDraftDisplayName("")
              setDraftRemark("")
              await queryClient.invalidateQueries({
                queryKey: adminUsersQueryKey,
              })
            },
          }}
          selection={{}}
          bulkDelete={false}
          bulkUpdate={false}
          builtInQueryFields={[
            {
              key: "keyword",
              type: "search",
              label: "关键字",
              placeholder: "搜索显示名称、user_id、备注或角色",
              fieldKey: "keywordField",
              fieldPlaceholder: "搜索字段",
              fieldOptions: [
                { label: "全部", value: "all" },
                { label: "显示名称", value: "display_name" },
                { label: "用户 ID", value: "user_id" },
                { label: "备注", value: "remark" },
                { label: "角色", value: "role" },
              ],
            },
          ]}
          queryFields={[
            {
              key: "status",
              type: "select",
              label: "状态",
              placeholder: "状态",
              options: statusOptions.map((option) => ({
                label: option.label,
                value: option.value,
              })),
            },
          ]}
          pageSizeOptions={[10, 20, 50]}
          rowActions={{
            edit: false,
            delete: false,
            moreItems: [
              {
                key: "assign-role",
                label: "查看角色",
                onClick: (row) => {
                  console.info("view roles", row.user_id)
                },
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

function mapApiStatusToLabel(status: ApiAdminUserStatus): AdminUserStatusLabel {
  return status === "enabled" ? "启用" : "停用"
}

function mapStatusLabelToApiStatus(
  status: AdminUserStatusLabel
): ApiAdminUserStatus {
  return status === "启用" ? "enabled" : "disabled"
}

function getSortValue(row: AdminUserRow, columnKey: string) {
  switch (columnKey) {
    case "display_name":
      return row.display_name
    case "user_id":
      return row.user_id
    case "remark":
      return row.remark ?? ""
    case "status":
      return row.status
    case "roleCount":
      return row.roles.length
    default:
      return ""
  }
}

function compareSortValues(left: string | number, right: string | number) {
  if (typeof left === "number" && typeof right === "number") {
    return left - right
  }

  return String(left).localeCompare(String(right), "zh-CN")
}
