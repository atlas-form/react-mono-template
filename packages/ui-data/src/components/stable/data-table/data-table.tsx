import {
  Button,
  NativeSelect,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components"
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  type Key,
  type ReactNode,
} from "react"

export interface DataTableFetchParams {
  page: number
  pageSize: number
  signal: AbortSignal
}

export interface DataTableFetchResult<T> {
  items: T[]
  total: number
}

export interface DataTableColumn<T> {
  key: string
  header: ReactNode
  renderCell: (row: T, rowIndex: number) => ReactNode
}

export interface DataTableProps<T> {
  columns: readonly DataTableColumn<T>[]
  fetchData: (params: DataTableFetchParams) => Promise<DataTableFetchResult<T>>
  getRowId: (row: T, rowIndex: number) => Key
  caption?: ReactNode
  emptyText?: ReactNode
  errorText?: ReactNode
  loadingText?: ReactNode
  initialPage?: number
  initialPageSize?: number
  pageSizeOptions?: readonly number[]
  onError?: (error: unknown) => void
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50] as const

export function DataTable<T>({
  columns,
  fetchData,
  getRowId,
  caption,
  emptyText = "No data available.",
  errorText = "Failed to load data.",
  loadingText = "Loading data...",
  initialPage = 1,
  initialPageSize = 10,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onError,
}: DataTableProps<T>) {
  const [rows, setRows] = useState<T[]>([])
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [reloadToken, setReloadToken] = useState(0)

  const safePageSizeOptions = useMemo(() => {
    const values = new Set<number>([...pageSizeOptions, initialPageSize])
    return Array.from(values).sort((left, right) => left - right)
  }, [initialPageSize, pageSizeOptions])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasRows = rows.length > 0

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    void (async () => {
      try {
        const result = await fetchData({
          page,
          pageSize,
          signal: controller.signal,
        })

        if (controller.signal.aborted) return

        setRows(result.items)
        setTotal(result.total)
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError)
          onError?.(loadError)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    })()

    return () => controller.abort()
  }, [fetchData, onError, page, pageSize, reloadToken])

  const handleRetry = () => {
    setReloadToken((current: number) => current + 1)
  }

  const renderFillerCells = () =>
    columns
      .slice(1)
      .map((column) => <TableCell key={column.key}>{null}</TableCell>)

  return (
    <div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div>
          <strong>Total:</strong> {total}
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: "8px",
          }}
        >
          <span>Rows per page</span>
          <NativeSelect
            value={String(pageSize)}
            onValueChange={(value: string) => {
              setPage(1)
              setPageSize(Number(value))
            }}
            options={safePageSizeOptions.map((value) => ({
              label: String(value),
              value: String(value),
            }))}
            disabled={loading}
          />
        </div>
      </div>

      <Table>
        {caption ? <TableCaption>{caption}</TableCaption> : null}
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <Spinner size="sm" />
                  <span>{loadingText}</span>
                </div>
              </TableCell>
              {renderFillerCells()}
            </TableRow>
          ) : null}

          {!loading && error ? (
            <TableRow>
              <TableCell>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "12px",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{errorText}</span>
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    Retry
                  </Button>
                </div>
              </TableCell>
              {renderFillerCells()}
            </TableRow>
          ) : null}

          {!loading && !error && !hasRows ? (
            <TableRow>
              <TableCell>{emptyText}</TableCell>
              {renderFillerCells()}
            </TableRow>
          ) : null}

          {!loading && !error
            ? rows.map((row: T, rowIndex: number) => (
                <TableRow key={getRowId(row, rowIndex)}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      <Fragment>{column.renderCell(row, rowIndex)}</Fragment>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>

      <div style={{ marginTop: "16px" }}>
        <Pagination
          page={Math.min(page, totalPages)}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
