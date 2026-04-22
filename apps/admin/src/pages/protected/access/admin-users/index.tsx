import { DataTable, MetricCards } from "@workspace/app-components"
import {
  adminUserBuiltInQueryFields,
  adminUserColumns,
  adminUserQueryFields,
} from "./admin-users-config"
import { useAdminUsersData } from "./admin-users-data"
import {
  invalidateAdminUsersQuery,
  useCreateAdminUserInsertAction,
} from "./create-admin-user-dialog"
import type { AdminUserRow, AdminUserTableQuery } from "./types"

export default function AdminUsersPage() {
  const { metricCards, fetchData, queryClient } = useAdminUsersData()
  const insertAction = useCreateAdminUserInsertAction(() =>
    invalidateAdminUsersQuery(({ queryKey }) =>
      queryClient.invalidateQueries({ queryKey })
    )
  )

  return (
    <div className="w-full min-w-0 space-y-4">
      <MetricCards items={metricCards} />

      <div className="flex h-[calc(100vh-22rem)] min-h-160 min-w-0 flex-1 overflow-hidden">
        <DataTable<AdminUserRow, AdminUserTableQuery>
          columns={adminUserColumns}
          fetchData={fetchData}
          getRowId={(row) => row.user_id}
          height="100%"
          initialPageSize={10}
          initialQuery={{
            keyword: "",
            keywordField: "all",
            status: "",
          }}
          insert={insertAction}
          selection={{}}
          bulkDelete={false}
          bulkUpdate={false}
          builtInQueryFields={adminUserBuiltInQueryFields}
          queryFields={adminUserQueryFields}
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
