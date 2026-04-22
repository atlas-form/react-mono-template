import { Badge } from "@workspace/ui-components/stable/badge"
import type {
  DataTableBuiltInQueryField,
  DataTableColumn,
  DataTableQueryField,
} from "@workspace/app-components"
import type { AdminUserStatus as ApiAdminUserStatus } from "@/api"
import type {
  AdminUserRow,
  AdminUserTableQuery,
  AdminUserStatusLabel,
} from "./types"

export const statusOptions = [
  { label: "启用", value: "启用" },
  { label: "停用", value: "停用" },
] as const

export const adminUserColumns: DataTableColumn<AdminUserRow>[] = [
  {
    key: "display_name",
    header: "显示名称",
    sortable: true,
    renderCell: (row) => <span className="font-medium">{row.display_name}</span>,
  },
  {
    key: "remark",
    header: "备注",
    sortable: true,
    renderCell: (row) =>
      row.remark?.trim() ? (
        row.remark
      ) : (
        <span className="text-sm text-(--app-muted-text)">无备注</span>
      ),
  },
  {
    key: "status",
    header: "状态",
    sortable: true,
    renderCell: (row) => (
      <Badge variant={row.status === "enabled" ? "default" : "outline"}>
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
        <span className="text-sm text-(--app-muted-text)">未分配角色</span>
      ),
  },
  {
    key: "roleCount",
    header: "角色数",
    sortable: true,
    renderCell: (row) => row.roles.length,
  },
]

export const adminUserBuiltInQueryFields: DataTableBuiltInQueryField<AdminUserTableQuery>[] = [
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
]

export const adminUserQueryFields: DataTableQueryField<AdminUserTableQuery>[] = [
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
]

export function mapApiStatusToLabel(
  status: ApiAdminUserStatus
): AdminUserStatusLabel {
  return status === "enabled" ? "启用" : "停用"
}

export function mapStatusLabelToApiStatus(
  status: AdminUserStatusLabel
): ApiAdminUserStatus {
  return status === "启用" ? "enabled" : "disabled"
}

export function getAdminUserSortValue(row: AdminUserRow, columnKey: string) {
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

export function compareSortValues(left: string | number, right: string | number) {
  if (typeof left === "number" && typeof right === "number") {
    return left - right
  }

  return String(left).localeCompare(String(right), "zh-CN")
}
