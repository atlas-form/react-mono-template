import { useCallback } from "react"
import { Badge } from "@workspace/ui-components/stable/badge"
import { Card, CardContent } from "@workspace/ui-components/stable/card"
import { DataTable, type DataTableFetchResult } from "@workspace/ui-data"
import type { DateRangeValue } from "@workspace/app-components"

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

interface CustomerTableQuery {
  keyword: string
  status: "" | CustomerRow["status"]
  createdAt?: DateRangeValue
}

export default function DataTablePage() {
  const fetchData = useCallback(
    async ({
      page,
      pageSize,
      query,
      signal,
    }: {
      page: number
      pageSize: number
      query: CustomerTableQuery
      signal: AbortSignal
    }): Promise<DataTableFetchResult<CustomerRow>> => {
      void signal
      await new Promise((resolve) => setTimeout(resolve, 120))

      const filteredRows = customerRows.filter((row) => {
        const matchesKeyword =
          query.keyword.trim().length === 0 ||
          row.id.toLowerCase().includes(query.keyword.trim().toLowerCase()) ||
          row.name.toLowerCase().includes(query.keyword.trim().toLowerCase())

        const matchesStatus = query.status === "" || row.status === query.status

        const from = query.createdAt?.from
        const to = query.createdAt?.to
        const matchesCreatedAt =
          (!from || row.createdAt >= startOfDay(from)) &&
          (!to || row.createdAt <= endOfDay(to))

        return matchesKeyword && matchesStatus && matchesCreatedAt
      })

      const start = (page - 1) * pageSize
      const end = start + pageSize

      return {
        items: filteredRows.slice(start, end),
        total: filteredRows.length,
      }
    },
    []
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <DataTable<CustomerRow, CustomerTableQuery>
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
                  <Badge
                    variant={row.status === "Active" ? "default" : "secondary"}
                  >
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
            initialQuery={{
              keyword: "",
              status: "",
              createdAt: undefined,
            }}
            queryFields={[
              {
                key: "keyword",
                type: "text",
                label: "Keyword",
                placeholder: "Search by customer ID or name",
              },
              {
                key: "status",
                type: "select",
                label: "Status",
                placeholder: "All status",
                options: [
                  { label: "Active", value: "Active" },
                  { label: "Paused", value: "Paused" },
                ],
              },
              {
                key: "createdAt",
                type: "date-range",
                label: "Created At",
                description: "Filter customers by creation date range.",
              },
            ]}
            queryLegend="Customer Query"
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

function startOfDay(date: Date) {
  const value = new Date(date)
  value.setHours(0, 0, 0, 0)
  return value
}

function endOfDay(date: Date) {
  const value = new Date(date)
  value.setHours(23, 59, 59, 999)
  return value
}
