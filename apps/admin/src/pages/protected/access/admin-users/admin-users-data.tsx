import { useCallback, useMemo } from "react"
import { ShieldCheck, ShieldOff, SquareUserRound, Users } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type {
  DataTableFetchResult,
  DataTableSortState,
} from "@workspace/app-components"
import { listAdminUsersApi } from "@/api"
import {
  compareSortValues,
  getAdminUserSortValue,
  mapStatusLabelToApiStatus,
} from "./admin-users-config"
import type {
  AdminUserRow,
  AdminUserStatusLabel,
  AdminUserTableQuery,
} from "./types"

export const adminUsersQueryKey = ["admin", "admin-users", "rows"] as const

export function useAdminUsersData() {
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

        const leftValue = getAdminUserSortValue(left, sort.columnKey)
        const rightValue = getAdminUserSortValue(right, sort.columnKey)
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

  return {
    metricCards,
    fetchData,
    queryClient,
  }
}
