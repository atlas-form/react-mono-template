import { useCallback } from "react"
import { Badge } from "@workspace/ui-components/stable/badge"
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
const owners = ["Alice", "Bob", "Cathy", "David"]
const channels = ["Direct", "Partner", "Online", "Field"]
const industries = ["Retail", "Finance", "Education", "Manufacturing"]
const segments = ["Strategic", "Enterprise", "Growth", "SMB"]

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
    <div className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden">
      <DataTable<CustomerRow, CustomerTableQuery>
        caption="Customer directory"
        // fixedLeftColumns={2}
        // fixedRightColumns={3}
        columns={[
          {
            key: "seq",
            header: "#",
            width: 48,
            renderCell: (_row: CustomerRow, rowIndex: number) => rowIndex + 1,
          },
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
          {
            key: "owner",
            header: "Owner",
            renderCell: (row: CustomerRow) =>
              owners[Number(row.id.slice(-1)) % owners.length],
          },
          {
            key: "channel",
            header: "Channel",
            renderCell: (row: CustomerRow) =>
              channels[Number(row.id.slice(-2)) % channels.length],
          },
          {
            key: "industry",
            header: "Industry",
            renderCell: (row: CustomerRow) =>
              industries[Number(row.id.slice(-1)) % industries.length],
          },
          {
            key: "segment",
            header: "Segment",
            renderCell: (row: CustomerRow) =>
              segments[Number(row.id.slice(-2)) % segments.length],
          },
          {
            key: "city",
            header: "City",
            renderCell: (row: CustomerRow) => row.region.replace(" China", ""),
          },
          {
            key: "renewal",
            header: "Renewal",
            renderCell: (row: CustomerRow) =>
              formatDateTime(addDays(row.createdAt, 90)).slice(0, 10),
          },
          {
            key: "contractValue",
            header: "Contract",
            renderCell: (row: CustomerRow) =>
              `$${(Number(row.id.slice(-2)) * 1200).toLocaleString()}`,
          },
          {
            key: "users",
            header: "Users",
            renderCell: (row: CustomerRow) => Number(row.id.slice(-2)) + 12,
          },
          {
            key: "storage",
            header: "Storage",
            renderCell: (row: CustomerRow) =>
              `${Number(row.id.slice(-2)) % 80} GB`,
          },
          {
            key: "health",
            header: "Health",
            renderCell: (row: CustomerRow) =>
              ["Great", "Good", "Watch", "Risk"][Number(row.id.slice(-1)) % 4],
          },
          {
            key: "lastActive",
            header: "Last Active",
            width: 140,
            renderCell: (row: CustomerRow) =>
              formatDateTime(addDays(row.createdAt, 7)).slice(5, 16),
          },
          {
            key: "plan",
            header: "Plan",
            renderCell: (row: CustomerRow) =>
              row.tier === "Enterprise" ? "Annual" : "Monthly",
          },
          {
            key: "source",
            header: "Source",
            renderCell: (row: CustomerRow) =>
              ["Expo", "Referral", "Ads", "SEO"][Number(row.id.slice(-1)) % 4],
          },
          {
            key: "score",
            header: "Score",
            renderCell: (row: CustomerRow) =>
              60 + (Number(row.id.slice(-2)) % 40),
          },
        ]}
        fetchData={fetchData}
        getRowId={(row: CustomerRow) => row.id}
        height="100%"
        initialPageSize={15}
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
          },
        ]}
        queryLegend="Customer Query"
        pageSizeOptions={[10, 15, 30, 50]}
        emptyText="No customers found."
        loadingText="Loading customers..."
        errorText="Unable to load customers."
      />
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

function addDays(date: Date, days: number) {
  const value = new Date(date)
  value.setDate(value.getDate() + days)
  return value
}
