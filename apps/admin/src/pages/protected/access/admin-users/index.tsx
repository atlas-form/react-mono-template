import { DataTable, MetricCards } from "@workspace/app-components"
import { useAdminUsersData } from "./admin-users-data"
import {
  invalidateAdminUsersQuery,
  useCreateAdminUserInsertAction,
} from "./create-admin-user-dialog"
import { useAdminUsersTable } from "./use-admin-users-table"
import type { AdminUserRow, AdminUserTableQuery } from "./types"

export default function AdminUsersPage() {
  const { metricCards, fetchData, queryClient } = useAdminUsersData()
  const table = useAdminUsersTable(fetchData)
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
          columns={table.columns}
          fetchData={table.fetchData}
          getRowId={table.getRowId}
          height="100%"
          initialPageSize={table.initialPageSize}
          initialQuery={table.initialQuery}
          insert={insertAction}
          selection={table.selection}
          bulkDelete={table.bulkDelete}
          bulkUpdate={table.bulkUpdate}
          builtInQueryFields={table.builtInQueryFields}
          queryFields={table.queryFields}
          pageSizeOptions={table.pageSizeOptions}
          rowActions={table.rowActions}
        />
      </div>
    </div>
  )
}
