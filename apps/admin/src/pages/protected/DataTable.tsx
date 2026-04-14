import { Badge } from "@workspace/ui-components/stable/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { DataTable, type DataTableFetchResult } from "@workspace/ui-data"

interface CustomerRow {
  id: string
  name: string
  tier: "Enterprise" | "Growth" | "Starter"
  status: "Active" | "Paused"
  region: string
}

const tiers: CustomerRow["tier"][] = ["Enterprise", "Growth", "Starter"]
const statuses: CustomerRow["status"][] = ["Active", "Paused"]
const regions = ["North China", "East China", "South China", "West China"]

const customerRows: CustomerRow[] = Array.from({ length: 100 }, (_, index) => ({
  id: `C-${String(index + 1001)}`,
  name: `Customer ${index + 1}`,
  tier: tiers[index % tiers.length],
  status: statuses[index % statuses.length],
  region: regions[index % regions.length],
}))

export default function DataTablePage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Badge variant="outline">DataTable</Badge>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            使用 `@workspace/ui-data` 的远程分页表格组件做 admin 示例页。
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          <DataTable<CustomerRow>
            caption="Customer directory"
            columns={[
              {
                key: "id",
                header: "ID",
                renderCell: (row: CustomerRow) => row.id,
              },
              {
                key: "name",
                header: "Name",
                renderCell: (row: CustomerRow) => row.name,
              },
              {
                key: "tier",
                header: "Tier",
                renderCell: (row: CustomerRow) => row.tier,
              },
              {
                key: "status",
                header: "Status",
                renderCell: (row: CustomerRow) => (
                  <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                    {row.status}
                  </Badge>
                ),
              },
              {
                key: "region",
                header: "Region",
                renderCell: (row: CustomerRow) => row.region,
              },
            ]}
            fetchData={async ({
              page,
              pageSize,
              signal: _signal,
            }: {
              page: number
              pageSize: number
              signal: AbortSignal
            }): Promise<DataTableFetchResult<CustomerRow>> => {
              const start = (page - 1) * pageSize
              const end = start + pageSize

              await new Promise((resolve) => setTimeout(resolve, 120))

              return {
                items: customerRows.slice(start, end),
                total: customerRows.length,
              }
            }}
            getRowId={(row: CustomerRow) => row.id}
            initialPageSize={10}
            pageSizeOptions={[10, 20, 50]}
            emptyText="No customers found."
            loadingText="Loading customers..."
            errorText="Unable to load customers."
          />
        </CardContent>
      </Card>
    </div>
  )
}
