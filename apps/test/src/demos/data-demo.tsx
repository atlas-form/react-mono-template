import { Badge } from "@workspace/ui-components/stable/badge"
import { DataTable, type DataTableFetchResult } from "@workspace/ui-data"

import { DemoSection } from "./shared"

interface UserRow {
  id: string
  name: string
  role: "Admin" | "Editor" | "Viewer"
  status: "Active" | "Paused"
  region: string
}

export function DataDemo() {
  return (
    <DemoSection title="DataTable / Remote Data">
      <DataTable<UserRow>
        caption="Remote user directory demo"
        columns={[
          {
            key: "name",
            header: "Name",
            renderCell: (row) => row.name,
          },
          {
            key: "role",
            header: "Role",
            renderCell: (row) => row.role,
          },
          {
            key: "status",
            header: "Status",
            renderCell: (row) => (
              <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                {row.status}
              </Badge>
            ),
          },
          {
            key: "region",
            header: "Region",
            renderCell: (row) => row.region,
          },
        ]}
        fetchData={async ({
          page,
          pageSize,
          signal,
        }): Promise<DataTableFetchResult<UserRow>> => {
          const response = await fetch(
            `/api/users?page=${page}&pageSize=${pageSize}`,
            { signal }
          )

          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
          }

          const payload = (await response.json()) as {
            code: number
            data: DataTableFetchResult<UserRow>
          }

          return payload.data
        }}
        getRowId={(row) => row.id}
        initialPageSize={5}
        pageSizeOptions={[5, 10]}
        emptyText="No users found."
        loadingText="Loading users..."
        errorText="Unable to load users."
      />
    </DemoSection>
  )
}
