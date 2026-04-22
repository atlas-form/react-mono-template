import type { DataTableRowActionsConfig } from "@workspace/app-components"
import type { AdminUserRow } from "./types"

export const adminUserRowActions: DataTableRowActionsConfig<AdminUserRow> = {
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
}
