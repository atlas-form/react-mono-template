import {
  Button,
  Input,
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
import { DateRangePicker, type DateRangeValue } from "@workspace/app-components"
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  type Key,
  type ReactNode,
} from "react"

export interface DataTableFetchResult<T> {
  items: T[]
  total: number
}

export interface DataTableColumn<T> {
  key: string
  header: ReactNode
  renderCell: (row: T, rowIndex: number) => ReactNode
  width?: number | string
  sticky?: "left"
}

export interface DataTableSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface DataTableQueryFieldBase<TQuery> {
  key: keyof TQuery & string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface DataTableTextQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "text"
  placeholder?: string
  inputType?: "text" | "search" | "email" | "number" | "tel" | "url"
}

export interface DataTableSelectQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "select"
  placeholder?: string
  options: readonly DataTableSelectOption[]
}

export interface DataTableDateRangeQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "date-range"
  placeholder?: string
}

export interface DataTableCustomQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "custom"
  renderControl: (
    value: TQuery[keyof TQuery & string],
    setValue: (value: TQuery[keyof TQuery & string]) => void,
    context: {
      query: TQuery
      disabled: boolean
    }
  ) => ReactNode
}

export type DataTableQueryField<TQuery> =
  | DataTableTextQueryField<TQuery>
  | DataTableSelectQueryField<TQuery>
  | DataTableDateRangeQueryField<TQuery>
  | DataTableCustomQueryField<TQuery>

export interface DataTableFetchParams<TQuery = object> {
  page: number
  pageSize: number
  signal: AbortSignal
  query: TQuery
}

export interface DataTableProps<T, TQuery extends object = object> {
  columns: readonly DataTableColumn<T>[]
  fetchData: (
    params: DataTableFetchParams<TQuery>
  ) => Promise<DataTableFetchResult<T>>
  getRowId: (row: T, rowIndex: number) => Key
  caption?: ReactNode
  emptyText?: ReactNode
  errorText?: ReactNode
  loadingText?: ReactNode
  renderEmpty?: () => ReactNode
  renderError?: (error: unknown, retry: () => void) => ReactNode
  renderLoading?: () => ReactNode
  initialPage?: number
  initialPageSize?: number
  pageSizeOptions?: readonly number[]
  onError?: (error: unknown) => void
  initialQuery?: TQuery
  queryFields?: readonly DataTableQueryField<TQuery>[]
  queryLegend?: ReactNode
  height?: number | string
  refreshLabel?: string
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 30, 50] as const

function createQueryState<TQuery extends object>(initialQuery?: TQuery) {
  return { ...(initialQuery ?? {}) } as TQuery
}

function asStringValue(value: unknown) {
  return typeof value === "string" ? value : ""
}

function asDateRangeValue(value: unknown) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined
  }

  return value as DateRangeValue
}

function resolveTableHeight(height?: number | string) {
  if (height === undefined) return undefined
  return typeof height === "number" ? `${height}px` : height
}

function resolveColumnMinWidth(column: DataTableColumn<object>) {
  if (column.width === undefined) return undefined

  return typeof column.width === "number" ? `${column.width}px` : column.width
}

function getStickyColumnStyles<T>(column: DataTableColumn<T>) {
  if (column.sticky !== "left") return undefined

  return {
    left: 0,
    position: "sticky" as const,
  }
}

function getQueryFieldWidth(field: DataTableQueryField<object>) {
  if (field.type === "text") return 320
  if (field.type === "date-range") return 240
  if (field.type === "select") return 180
  return 220
}

export function DataTable<T, TQuery extends object = object>({
  columns,
  fetchData,
  getRowId,
  caption,
  emptyText = "No data available.",
  errorText = "Failed to load data.",
  loadingText = "Loading data...",
  renderEmpty,
  renderError,
  renderLoading,
  initialPage = 1,
  initialPageSize = 15,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onError,
  initialQuery,
  queryFields = [],
  queryLegend = "Query",
  height,
  refreshLabel = "Refresh data",
}: DataTableProps<T, TQuery>) {
  const [rows, setRows] = useState<T[]>([])
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [reloadToken, setReloadToken] = useState(0)
  const [draftQuery, setDraftQuery] = useState<TQuery>(() =>
    createQueryState(initialQuery)
  )

  const safePageSizeOptions = useMemo(() => {
    const values = new Set<number>([...pageSizeOptions, initialPageSize])
    return Array.from(values).sort((left, right) => left - right)
  }, [initialPageSize, pageSizeOptions])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasRows = rows.length > 0
  const hasQueryFields = queryFields.length > 0

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
          query: draftQuery,
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
  }, [draftQuery, fetchData, onError, page, pageSize, reloadToken])

  const handleRetry = () => {
    setReloadToken((current: number) => current + 1)
  }

  const updateDraftQueryValue = <K extends keyof TQuery>(
    key: K,
    value: TQuery[K]
  ) => {
    setPage(1)
    setDraftQuery((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const renderFillerCells = () =>
    columns
      .slice(1)
      .map((column) => <TableCell key={column.key}>{null}</TableCell>)

  const loadingContent = renderLoading ? renderLoading() : loadingText
  const emptyContent = renderEmpty ? renderEmpty() : emptyText
  const errorContent = renderError ? renderError(error, handleRetry) : errorText

  const renderQueryFieldControl = (field: DataTableQueryField<TQuery>) => {
    const value = draftQuery[field.key]
    const disabled = loading || field.disabled === true
    const setValue = (nextValue: TQuery[keyof TQuery & string]) => {
      updateDraftQueryValue(field.key, nextValue as TQuery[typeof field.key])
    }

    if (field.type === "text") {
      return (
        <Input
          value={asStringValue(value)}
          onValueChange={(nextValue) =>
            setValue(nextValue as TQuery[keyof TQuery & string])
          }
          placeholder={field.placeholder}
          disabled={disabled}
          type={field.inputType}
        />
      )
    }

    if (field.type === "select") {
      const options = field.placeholder
        ? [
            {
              label: field.placeholder,
              value: "",
            },
            ...field.options,
          ]
        : field.options

      return (
        <NativeSelect
          value={asStringValue(value)}
          onValueChange={(nextValue) =>
            setValue(nextValue as TQuery[keyof TQuery & string])
          }
          options={options.map((option) => ({
            label: option.label,
            value: option.value,
            disabled: option.disabled,
          }))}
          disabled={disabled}
        />
      )
    }

    if (field.type === "date-range") {
      return (
        <DateRangePicker
          value={asDateRangeValue(value)}
          onValueChange={(nextValue) =>
            setValue(nextValue as TQuery[keyof TQuery & string])
          }
          placeholder={field.placeholder}
          disabled={disabled}
        />
      )
    }

    return field.renderControl(value, setValue, {
      query: draftQuery,
      disabled,
    })
  }

  return (
    <div
      className="flex h-full min-h-0 min-w-0 w-full max-w-full overflow-hidden flex-col gap-3"
      data-slot="data-table"
      style={{ height: resolveTableHeight(height) }}
    >
      <div className="shrink-0" data-slot="data-table-header">
        {hasQueryFields ? (
          <div className="flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold">{queryLegend}</div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={loading}
                onClick={handleRetry}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  ↻
                </span>
                <span className="sr-only">{refreshLabel}</span>
              </Button>
            </div>

            <div
              className="flex max-h-[112px] flex-wrap items-start gap-x-3 gap-y-2 overflow-hidden"
              data-slot="data-table-query-fields"
            >
              {queryFields.map((field) => (
                <label
                  key={field.key}
                  className="flex min-w-[180px] flex-col gap-1"
                  style={{
                    width: `min(100%, ${getQueryFieldWidth(
                      field as DataTableQueryField<object>
                    )}px)`,
                  }}
                >
                  {renderQueryFieldControl(field)}
                  {field.description ? (
                    <span className="text-xs leading-4 text-muted-foreground">
                      {field.description}
                    </span>
                  ) : null}
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={loading}
              onClick={handleRetry}
            >
              <span aria-hidden="true" className="text-base leading-none">
                ↻
              </span>
              <span className="sr-only">{refreshLabel}</span>
            </Button>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden" data-slot="data-table-body">
        <div className="h-full overflow-auto">
          <Table
            className="min-w-full w-max"
            containerClassName="overflow-visible"
          >
            {caption ? <TableCaption>{caption}</TableCaption> : null}
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={column.sticky === "left"
                      ? "sticky top-0 left-0 z-20 bg-[var(--surface)] shadow-[inset_-1px_0_0_var(--border)]"
                      : "sticky top-0 z-10 bg-[var(--surface)]"}
                    style={
                      {
                        ...getStickyColumnStyles(column),
                        minWidth: resolveColumnMinWidth(
                          column as DataTableColumn<object>
                        ),
                      }
                    }
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell>
                    {renderLoading ? (
                      loadingContent
                    ) : (
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <Spinner size="sm" />
                        <span>{loadingContent}</span>
                      </div>
                    )}
                  </TableCell>
                  {renderFillerCells()}
                </TableRow>
              ) : null}

              {!loading && error ? (
                <TableRow>
                  <TableCell>{errorContent}</TableCell>
                  {renderFillerCells()}
                </TableRow>
              ) : null}

              {!loading && !error && !hasRows ? (
                <TableRow>
                  <TableCell>{emptyContent}</TableCell>
                  {renderFillerCells()}
                </TableRow>
              ) : null}

              {!loading && !error
                ? rows.map((row: T, rowIndex: number) => (
                    <TableRow key={getRowId(row, rowIndex)}>
                      {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={column.sticky === "left"
                          ? "sticky left-0 z-10 bg-[var(--background)] shadow-[inset_-1px_0_0_var(--border)]"
                          : undefined}
                        style={{
                          ...getStickyColumnStyles(column),
                          minWidth: resolveColumnMinWidth(
                            column as DataTableColumn<object>
                          ),
                        }}
                      >
                        <Fragment>{column.renderCell(row, rowIndex)}</Fragment>
                      </TableCell>
                    ))}
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </div>

      <div
        className="relative mt-2 overflow-x-auto px-4 py-2"
        data-slot="data-table-tail"
      >
        <div className="flex min-w-max items-center text-sm">
          <div className="flex shrink-0 items-center gap-2">
            <span>
              <strong>Total:</strong> {total}
            </span>
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

        <div className="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center">
          <div className="pointer-events-auto shrink-0">
            <Pagination
              page={Math.min(page, totalPages)}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
