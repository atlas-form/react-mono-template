import {
  AdvancedSelect,
  Button,
  Input,
  Pagination,
  SearchInput,
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
  useLayoutEffect,
  useMemo,
  useRef,
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
  sticky?: "left" | "right"
  sortable?: boolean
}

export type DataTableSortDirection = "asc" | "desc"

export interface DataTableSortState {
  columnKey: string
  direction: DataTableSortDirection
}

export interface DataTableSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface DataTableQueryFieldBase<TQuery> {
  key: keyof TQuery & string
  label?: ReactNode
  description?: ReactNode
  disabled?: boolean
}

// A simple text field. Use this for plain value input without the built-in search behavior.
export interface DataTableTextQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "text"
  placeholder?: string
  inputType?: "text" | "search" | "email" | "number" | "tel" | "url"
}

// A built-in select field. Render it only when the page needs this filter.
export interface DataTableSelectQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "select"
  placeholder?: string
  options: readonly DataTableSelectOption[]
}

// A built-in global search field. It can optionally pair with a second select
// so the page can choose which query field(s) the keyword should target.
export interface DataTableSearchQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "search"
  placeholder?: string
  fieldKey?: keyof TQuery & string
  fieldPlaceholder?: string
  fieldOptions?: readonly DataTableSelectOption[]
}

// A built-in date range field. Render it only when the page needs time-based filtering.
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

export type DataTableBuiltInQueryField<TQuery> =
  | DataTableSearchQueryField<TQuery>
  | DataTableSelectQueryField<TQuery>
  | DataTableDateRangeQueryField<TQuery>

export type DataTableQueryField<TQuery> =
  | DataTableTextQueryField<TQuery>
  | DataTableSearchQueryField<TQuery>
  | DataTableSelectQueryField<TQuery>
  | DataTableDateRangeQueryField<TQuery>
  | DataTableCustomQueryField<TQuery>

export interface DataTableFetchParams<TQuery = object> {
  page: number
  pageSize: number
  signal: AbortSignal
  query: TQuery
  sort: DataTableSortState | null
}

export interface DataTableLocaleText {
  emptyText?: ReactNode
  errorText?: ReactNode
  loadingText?: ReactNode
  refreshLabel?: string
  totalLabel?: ReactNode
  sortAscendingLabel?: string
  sortDescendingLabel?: string
  clearSortLabel?: string
}

export interface DataTableProps<T, TQuery extends object = object> {
  columns: readonly DataTableColumn<T>[]
  fixedLeftColumns?: number
  fixedRightColumns?: number
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
  // Built-in query controls are opt-in. Pass only the ones the page actually needs.
  queryFields?: readonly DataTableQueryField<TQuery>[]
  height?: number | string
  refreshLabel?: string
  initialSort?: DataTableSortState | null
  localeText?: DataTableLocaleText
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 30, 50] as const
const DEFAULT_STICKY_COLUMN_WIDTH = 160

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

function resolveColumnPixelWidth(column: DataTableColumn<object>) {
  if (typeof column.width === "number") return column.width
  if (typeof column.width !== "string") return undefined

  const matched = /^(\d+(?:\.\d+)?)px$/.exec(column.width.trim())
  return matched ? Number(matched[1]) : undefined
}

function isLeftStickyColumn<T>(
  column: DataTableColumn<T>,
  columnIndex: number,
  fixedLeftColumns: number
) {
  return column.sticky === "left" || columnIndex < fixedLeftColumns
}

function isRightStickyColumn<T>(
  column: DataTableColumn<T>,
  columnIndex: number,
  columnCount: number,
  fixedLeftColumns: number,
  fixedRightColumns: number
) {
  if (column.sticky === "left" || columnIndex < fixedLeftColumns) {
    return false
  }

  return (
    column.sticky === "right" ||
    (fixedRightColumns > 0 && columnIndex >= columnCount - fixedRightColumns)
  )
}

function getStickyColumnStyles({
  leftOffset,
  rightOffset,
}: {
  leftOffset?: number
  rightOffset?: number
}) {
  if (leftOffset === undefined && rightOffset === undefined) return undefined

  return {
    ...(leftOffset !== undefined ? { left: `${leftOffset}px` } : null),
    position: "sticky" as const,
    ...(rightOffset !== undefined ? { right: `${rightOffset}px` } : null),
  }
}

function getQueryFieldWidth(field: DataTableQueryField<object>) {
  if (field.type === "search") {
    return field.fieldOptions?.length ? 460 : 320
  }
  if (field.type === "text") return 320
  if (field.type === "date-range") return 240
  if (field.type === "select") return 180
  return 220
}

export function DataTable<T, TQuery extends object = object>({
  columns,
  fixedLeftColumns = 0,
  fixedRightColumns = 0,
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
  height,
  refreshLabel = "Refresh data",
  initialSort = null,
  localeText,
}: DataTableProps<T, TQuery>) {
  const [rows, setRows] = useState<T[]>([])
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [reloadToken, setReloadToken] = useState(0)
  const [measuredColumnWidths, setMeasuredColumnWidths] = useState<number[]>([])
  const [sort, setSort] = useState<DataTableSortState | null>(initialSort)
  const [draftQuery, setDraftQuery] = useState<TQuery>(() =>
    createQueryState(initialQuery)
  )
  const headerCellRefs = useRef<Array<HTMLTableCellElement | null>>([])

  const safePageSizeOptions = useMemo(() => {
    const values = new Set<number>([...pageSizeOptions, initialPageSize])
    return Array.from(values).sort((left, right) => left - right)
  }, [initialPageSize, pageSizeOptions])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasRows = rows.length > 0
  const hasQueryFields = queryFields.length > 0
  const resolvedEmptyText = localeText?.emptyText ?? emptyText
  const resolvedErrorText = localeText?.errorText ?? errorText
  const resolvedLoadingText = localeText?.loadingText ?? loadingText
  const resolvedRefreshLabel = localeText?.refreshLabel ?? refreshLabel
  const resolvedTotalLabel = localeText?.totalLabel ?? "Total"
  const resolvedSortAscendingLabel =
    localeText?.sortAscendingLabel ?? "Sort ascending"
  const resolvedSortDescendingLabel =
    localeText?.sortDescendingLabel ?? "Sort descending"
  const resolvedClearSortLabel = localeText?.clearSortLabel ?? "Clear sort"

  useLayoutEffect(() => {
    const updateWidths = () => {
      setMeasuredColumnWidths(
        columns.map((_, columnIndex) => {
          const cell = headerCellRefs.current[columnIndex]
          return cell?.getBoundingClientRect().width ?? 0
        })
      )
    }

    updateWidths()

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidths)

      return () => {
        window.removeEventListener("resize", updateWidths)
      }
    }

    const observer = new ResizeObserver(() => {
      updateWidths()
    })

    headerCellRefs.current.forEach((cell) => {
      if (cell) observer.observe(cell)
    })

    return () => {
      observer.disconnect()
    }
  }, [columns])

  const stickyLeftOffsets = useMemo(() => {
    let currentLeft = 0

    return columns.map((column, columnIndex) => {
      if (!isLeftStickyColumn(column, columnIndex, fixedLeftColumns)) {
        return undefined
      }

      const leftOffset = currentLeft
      const columnWidth =
        measuredColumnWidths[columnIndex] ||
        resolveColumnPixelWidth(column as DataTableColumn<object>) ||
        DEFAULT_STICKY_COLUMN_WIDTH
      currentLeft += columnWidth

      return leftOffset
    })
  }, [columns, fixedLeftColumns, measuredColumnWidths])

  const stickyRightOffsets = useMemo(() => {
    let currentRight = 0
    const offsets = Array<number | undefined>(columns.length).fill(undefined)

    for (let columnIndex = columns.length - 1; columnIndex >= 0; columnIndex -= 1) {
      const column = columns[columnIndex]

      if (
        !isRightStickyColumn(
          column,
          columnIndex,
          columns.length,
          fixedLeftColumns,
          fixedRightColumns
        )
      ) {
        continue
      }

      const columnWidth =
        measuredColumnWidths[columnIndex] ||
        resolveColumnPixelWidth(column as DataTableColumn<object>) ||
        DEFAULT_STICKY_COLUMN_WIDTH
      offsets[columnIndex] = currentRight
      currentRight += columnWidth
    }

    return offsets
  }, [columns, fixedLeftColumns, fixedRightColumns, measuredColumnWidths])

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
          sort,
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
  }, [draftQuery, fetchData, onError, page, pageSize, reloadToken, sort])

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

  const toggleSort = (column: DataTableColumn<T>) => {
    if (column.sortable !== true) return

    setPage(1)
    setSort((current) => {
      if (current?.columnKey !== column.key) {
        return {
          columnKey: column.key,
          direction: "asc",
        }
      }

      if (current.direction === "asc") {
        return {
          columnKey: column.key,
          direction: "desc",
        }
      }

      return null
    })
  }

  const getSortIndicator = (column: DataTableColumn<T>) => {
    if (column.sortable !== true) return null
    if (sort?.columnKey !== column.key) return "↕"
    return sort.direction === "asc" ? "↑" : "↓"
  }

  const getSortAriaLabel = (column: DataTableColumn<T>) => {
    if (column.sortable !== true) return undefined
    if (sort?.columnKey !== column.key) return resolvedSortAscendingLabel
    return sort.direction === "asc"
      ? resolvedSortDescendingLabel
      : resolvedClearSortLabel
  }

  const getAriaSort = (column: DataTableColumn<T>) => {
    if (column.sortable !== true || sort?.columnKey !== column.key) {
      return "none" as const
    }

    return sort.direction === "asc" ? "ascending" : "descending"
  }

  const renderFillerCells = () =>
    columns
      .slice(1)
      .map((column) => <TableCell key={column.key}>{null}</TableCell>)

  const emptyContent = renderEmpty ? renderEmpty() : resolvedEmptyText
  const errorContent = renderError ? renderError(error, handleRetry) : resolvedErrorText
  const loadingContentResolved = renderLoading
    ? renderLoading()
    : resolvedLoadingText

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

    if (field.type === "search") {
      const searchInput = (
        <SearchInput
          value={asStringValue(value)}
          onValueChange={(nextValue) =>
            setValue(nextValue as TQuery[keyof TQuery & string])
          }
          placeholder={field.placeholder}
          disabled={disabled}
          updateStrategy="enter"
        />
      )

      if (!field.fieldKey || !field.fieldOptions?.length) {
        return searchInput
      }

      const fieldKey = field.fieldKey

      return (
        <div className="flex items-center gap-2">
          <div className="w-36 shrink-0">
            <AdvancedSelect
              value={asStringValue(draftQuery[fieldKey])}
              onValueChange={(nextValue) =>
                updateDraftQueryValue(
                  fieldKey,
                  nextValue as TQuery[typeof fieldKey]
                )
              }
              list={field.fieldOptions.map((option) => ({
                label: option.label,
                value: option.value,
                disabled: option.disabled,
              }))}
              disabled={disabled}
              placeholder={field.fieldPlaceholder}
              allowClear
            />
          </div>

          <div className="min-w-0 flex-1">{searchInput}</div>
        </div>
      )
    }

    if (field.type === "select") {
      return (
        <AdvancedSelect
          value={asStringValue(value)}
          onValueChange={(nextValue) =>
            setValue(nextValue as TQuery[keyof TQuery & string])
          }
          list={field.options.map((option) => ({
            label: option.label,
            value: option.value,
            disabled: option.disabled,
          }))}
          disabled={disabled}
          placeholder={field.placeholder}
          allowClear
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
            <div className="flex items-center justify-end gap-3">
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
                <span className="sr-only">{resolvedRefreshLabel}</span>
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
              <span className="sr-only">{resolvedRefreshLabel}</span>
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
            {caption ? (
              <TableCaption>{caption}</TableCaption>
            ) : null}
            <TableHeader>
              <TableRow>
                {columns.map((column, columnIndex) => {
                  const leftOffset = stickyLeftOffsets[columnIndex]
                  const rightOffset = stickyRightOffsets[columnIndex]
                  const isStickyLeft = leftOffset !== undefined
                  const isStickyRight = rightOffset !== undefined

                  return (
                    <TableHead
                      key={column.key}
                      ref={(element) => {
                        headerCellRefs.current[columnIndex] = element
                      }}
                      aria-sort={getAriaSort(column)}
                      className={
                        isStickyLeft
                          ? "sticky top-0 left-0 z-20 bg-[var(--surface)] shadow-[inset_-1px_0_0_var(--border)]"
                          : isStickyRight
                            ? "sticky top-0 right-0 z-20 bg-[var(--surface)] shadow-[inset_1px_0_0_var(--border)]"
                          : "sticky top-0 z-10 bg-[var(--surface)]"
                      }
                      style={{
                        ...getStickyColumnStyles({ leftOffset, rightOffset }),
                        minWidth: resolveColumnMinWidth(
                          column as DataTableColumn<object>
                        ),
                      }}
                    >
                      <button
                        type="button"
                        className="flex w-full cursor-pointer items-center gap-2 text-left disabled:cursor-default"
                        onClick={() => toggleSort(column)}
                        disabled={column.sortable !== true}
                        aria-label={getSortAriaLabel(column)}
                      >
                        <span className="min-w-0 truncate">{column.header}</span>
                        {column.sortable !== true ? null : (
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-xs text-muted-foreground"
                          >
                            {getSortIndicator(column)}
                          </span>
                        )}
                      </button>
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell>
                    {renderLoading ? (
                      loadingContentResolved
                    ) : (
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <Spinner size="sm" />
                        <span>{loadingContentResolved}</span>
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
                      {columns.map((column, columnIndex) => (
                        <TableCell
                          key={column.key}
                          className={
                            stickyLeftOffsets[columnIndex] !== undefined
                              ? "sticky left-0 z-10 bg-[var(--background)] shadow-[inset_-1px_0_0_var(--border)]"
                              : stickyRightOffsets[columnIndex] !== undefined
                                ? "sticky right-0 z-10 bg-[var(--background)] shadow-[inset_1px_0_0_var(--border)]"
                              : undefined
                          }
                          style={{
                            ...getStickyColumnStyles({
                              leftOffset: stickyLeftOffsets[columnIndex],
                              rightOffset: stickyRightOffsets[columnIndex],
                            }),
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

      <div className="mt-2 overflow-x-auto px-4 py-2" data-slot="data-table-tail">
        <div className="flex min-w-max flex-nowrap items-center justify-between">
          <div className="shrink-0 flex items-center gap-2 text-sm">
            <span>
              <strong>{resolvedTotalLabel}:</strong> {total}
            </span>
            <AdvancedSelect
              value={String(pageSize)}
              onValueChange={(value: string) => {
                setPage(1)
                setPageSize(Number(value))
              }}
              list={safePageSizeOptions.map((value) => ({
                label: String(value),
                value: String(value),
              }))}
              disabled={loading}
            />
          </div>

          <div className="shrink-0">
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
