import { useCallback } from "react"
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
  createdAt: Date
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
  createdAt: new Date(2026, 0, 1 + index, 9 + (index % 8), (index * 7) % 60, 0),
}))

export default function DataTablePage() {
  const fetchData = useCallback(
    async ({
      page,
      pageSize,
      signal: _signal,
    }: {
      page: number
      pageSize: number
      signal: AbortSignal
    }): Promise<DataTableFetchResult<CustomerRow>> => {
      await new Promise((resolve) => setTimeout(resolve, 120))

      const start = (page - 1) * pageSize
      const end = start + pageSize

      return {
        items: customerRows.slice(start, end),
        total: customerRows.length,
      }
    },
    []
  )

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
              {
                key: "createdAt",
                header: "Created At",
                renderCell: (row: CustomerRow) => formatDateTime(row.createdAt),
              },
            ]}
            fetchData={fetchData}
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

function formatDateTime(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0")

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}
