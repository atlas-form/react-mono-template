import {
  Button,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
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
  type ComponentProps,
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
  querySubmitText?: ReactNode
  queryResetText?: ReactNode
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50] as const

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
  initialPageSize = 10,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onError,
  initialQuery,
  queryFields = [],
  queryLegend = "Query",
  querySubmitText = "Search",
  queryResetText = "Reset",
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
  const [appliedQuery, setAppliedQuery] = useState<TQuery>(() =>
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
          query: appliedQuery,
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
  }, [appliedQuery, fetchData, onError, page, pageSize, reloadToken])

  const handleRetry = () => {
    setReloadToken((current: number) => current + 1)
  }

  const updateDraftQueryValue = <K extends keyof TQuery>(
    key: K,
    value: TQuery[K]
  ) => {
    setDraftQuery((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSubmitQuery: NonNullable<ComponentProps<"form">["onSubmit"]> = (
    event
  ) => {
    event.preventDefault()
    setPage(1)
    setAppliedQuery({ ...draftQuery })
  }

  const handleResetQuery = () => {
    const nextQuery = createQueryState(initialQuery)
    setPage(1)
    setDraftQuery(nextQuery)
    setAppliedQuery(nextQuery)
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
      return (
        <NativeSelect
          value={asStringValue(value)}
          onValueChange={(nextValue) =>
            setValue(nextValue as TQuery[keyof TQuery & string])
          }
          options={field.options.map((option) => ({
            label: option.label,
            value: option.value,
            disabled: option.disabled,
          }))}
          placeholder={field.placeholder}
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
    <div className="flex flex-col gap-4" data-slot="data-table">
      <div data-slot="data-table-header">
        {hasQueryFields ? (
          <form onSubmit={handleSubmitQuery}>
            <FieldSet>
              <FieldLegend>{queryLegend}</FieldLegend>
              <FieldGroup>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {queryFields.map((field) => (
                    <Field key={field.key}>
                      <FieldLabel>{field.label}</FieldLabel>
                      <FieldContent>
                        {renderQueryFieldControl(field)}
                        {field.description ? (
                          <FieldDescription>
                            {field.description}
                          </FieldDescription>
                        ) : null}
                      </FieldContent>
                    </Field>
                  ))}
                </div>
              </FieldGroup>

              <div className="flex flex-wrap items-center gap-2">
                <Button type="submit" disabled={loading}>
                  {querySubmitText}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={handleResetQuery}
                >
                  {queryResetText}
                </Button>
              </div>
            </FieldSet>
          </form>
        ) : null}
      </div>

      <div data-slot="data-table-body">
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
                      <TableCell key={column.key}>
                        <Fragment>{column.renderCell(row, rowIndex)}</Fragment>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>

      <div
        className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        data-slot="data-table-tail"
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>
            <strong>Total:</strong> {total}
          </span>
          <div className="flex items-center gap-2">
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

        <Pagination
          page={Math.min(page, totalPages)}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
