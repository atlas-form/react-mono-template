import {
  AdvancedSelect,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui-components"
import { RefreshCw, RotateCcw } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState, type Key, type ReactNode } from "react"

import { DateRangePicker, type DateRangeValue } from "../date-time-picker"
import { normalizeLanguage } from "../date-time-picker/shared"
import { getDataTableCopy } from "./data-table.locale"

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

export interface DataTableSearchQueryField<
  TQuery,
> extends DataTableQueryFieldBase<TQuery> {
  type: "search"
  placeholder?: string
  fieldKey?: keyof TQuery & string
  fieldPlaceholder?: string
  fieldOptions?: readonly DataTableSelectOption[]
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
  resetLabel?: string
  totalLabel?: ReactNode
  sortAscendingLabel?: string
  sortDescendingLabel?: string
  clearSortLabel?: string
  bulkDeleteLabel?: (count: number) => ReactNode
  bulkUpdateLabel?: (count: number) => ReactNode
  bulkUpdateTitle?: ReactNode
  bulkUpdateDescription?: (count: number) => ReactNode
  bulkUpdateFieldLabel?: ReactNode
  bulkUpdateValueLabel?: ReactNode
  bulkUpdateCancelLabel?: ReactNode
  bulkUpdateApplyLabel?: ReactNode
}

export interface DataTableHeaderActionsContext<T> {
  clearSelection: () => void
  selectedRowKeys: Key[]
  selectedRows: T[]
}

export interface DataTableBulkDeleteConfig<T> {
  label?: ReactNode
  onDelete: (context: DataTableHeaderActionsContext<T>) => Promise<void> | void
  columnWidth?: number
  selectedRowKeys?: readonly Key[]
  onSelectedRowKeysChange?: (keys: Key[], rows: T[]) => void
}

export interface DataTableBulkUpdateFieldBase {
  key: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface DataTableBulkUpdateTextField
  extends DataTableBulkUpdateFieldBase {
  type: "text"
  placeholder?: string
  inputType?: "text" | "search" | "email" | "number" | "tel" | "url"
}

export interface DataTableBulkUpdateSelectField
  extends DataTableBulkUpdateFieldBase {
  type: "select"
  placeholder?: string
  options: readonly DataTableSelectOption[]
}

export interface DataTableBulkUpdateCustomField<T>
  extends DataTableBulkUpdateFieldBase {
  type: "custom"
  renderControl: (
    value: unknown,
    setValue: (value: unknown) => void,
    context: {
      disabled: boolean
      selectedRowKeys: Key[]
      selectedRows: T[]
    }
  ) => ReactNode
}

export type DataTableBulkUpdateField<T> =
  | DataTableBulkUpdateTextField
  | DataTableBulkUpdateSelectField
  | DataTableBulkUpdateCustomField<T>

export interface DataTableBulkUpdateSubmitContext<T>
  extends DataTableHeaderActionsContext<T> {
  fieldKey: string
  value: unknown
}

export interface DataTableBulkUpdateConfig<T> {
  label?: ReactNode
  title?: ReactNode
  description?: ReactNode
  fields: readonly DataTableBulkUpdateField<T>[]
  onSubmit: (
    context: DataTableBulkUpdateSubmitContext<T>
  ) => Promise<void> | void
  columnWidth?: number
  selectedRowKeys?: readonly Key[]
  onSelectedRowKeysChange?: (keys: Key[], rows: T[]) => void
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
  queryFields?: readonly DataTableQueryField<TQuery>[]
  headerActions?:
    | ReactNode
    | ((context: DataTableHeaderActionsContext<T>) => ReactNode)
  bulkDelete?: false | DataTableBulkDeleteConfig<T>
  bulkUpdate?: false | DataTableBulkUpdateConfig<T>
  height?: number | string
  refreshLabel?: string
  resetLabel?: string
  initialSort?: DataTableSortState | null
  localeText?: DataTableLocaleText
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 30, 50] as const
const DEFAULT_STICKY_COLUMN_WIDTH = 160
const DEFAULT_SELECTION_COLUMN_WIDTH = 44

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
    return field.fieldOptions?.length ? 380 : 280
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
  emptyText,
  errorText,
  loadingText,
  renderEmpty,
  renderError,
  renderLoading,
  initialPage = 1,
  initialPageSize = 15,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onError,
  initialQuery,
  queryFields = [],
  headerActions,
  bulkDelete = false,
  bulkUpdate = false,
  height,
  refreshLabel,
  resetLabel,
  initialSort = null,
  localeText,
}: DataTableProps<T, TQuery>) {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.language)
  const copy = getDataTableCopy(language)
  const [rows, setRows] = useState<T[]>([])
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [reloadToken, setReloadToken] = useState(0)
  const [measuredColumnWidths, setMeasuredColumnWidths] = useState<number[]>([])
  const [sort, setSort] = useState<DataTableSortState | null>(initialSort)
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState<Key[]>([])
  const [deleting, setDeleting] = useState(false)
  const [bulkUpdateDialogOpen, setBulkUpdateDialogOpen] = useState(false)
  const [bulkUpdateFieldKey, setBulkUpdateFieldKey] = useState("")
  const [bulkUpdateValue, setBulkUpdateValue] = useState<unknown>("")
  const [updating, setUpdating] = useState(false)
  const [draftQuery, setDraftQuery] = useState<TQuery>(() =>
    createQueryState(initialQuery)
  )
  const headerCellRefs = useRef<Array<HTMLTableCellElement | null>>([])
  const selectionConfig =
    bulkDelete !== false ? bulkDelete : bulkUpdate !== false ? bulkUpdate : false
  const rowSelectionEnabled = selectionConfig !== false
  const selectionColumnWidth =
    selectionConfig !== false
      ? selectionConfig.columnWidth ?? DEFAULT_SELECTION_COLUMN_WIDTH
      : DEFAULT_SELECTION_COLUMN_WIDTH
  const selectedRowKeys =
    selectionConfig !== false && selectionConfig.selectedRowKeys
      ? [...selectionConfig.selectedRowKeys]
    : internalSelectedRowKeys

  const safePageSizeOptions = useMemo(() => {
    const values = new Set<number>([...pageSizeOptions, initialPageSize])
    return Array.from(values).sort((left, right) => left - right)
  }, [initialPageSize, pageSizeOptions])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasRows = rows.length > 0
  const hasQueryFields = queryFields.length > 0
  const leadingSearchField =
    queryFields.find((field) => field.type === "search") ?? null
  const trailingQueryFields = leadingSearchField
    ? queryFields.filter((field) => field !== leadingSearchField)
    : queryFields
  const resolvedEmptyText = localeText?.emptyText ?? emptyText ?? copy.emptyText
  const resolvedErrorText = localeText?.errorText ?? errorText ?? copy.errorText
  const resolvedLoadingText =
    localeText?.loadingText ?? loadingText ?? copy.loadingText
  const resolvedRefreshLabel =
    localeText?.refreshLabel ?? refreshLabel ?? copy.refreshLabel
  const resolvedResetLabel =
    localeText?.resetLabel ?? resetLabel ?? copy.resetLabel
  const resolvedTotalLabel = localeText?.totalLabel ?? copy.totalLabel
  const resolvedSortAscendingLabel =
    localeText?.sortAscendingLabel ?? copy.sortAscendingLabel
  const resolvedSortDescendingLabel =
    localeText?.sortDescendingLabel ?? copy.sortDescendingLabel
  const resolvedClearSortLabel =
    localeText?.clearSortLabel ?? copy.clearSortLabel
  const resolvedBulkDeleteLabel =
    localeText?.bulkDeleteLabel ?? copy.bulkDeleteLabel
  const resolvedBulkUpdateLabel =
    localeText?.bulkUpdateLabel ?? copy.bulkUpdateLabel
  const resolvedBulkUpdateTitle =
    localeText?.bulkUpdateTitle ?? copy.bulkUpdateTitle
  const resolvedBulkUpdateDescription =
    localeText?.bulkUpdateDescription ?? copy.bulkUpdateDescription
  const resolvedBulkUpdateFieldLabel =
    localeText?.bulkUpdateFieldLabel ?? copy.bulkUpdateFieldLabel
  const resolvedBulkUpdateValueLabel =
    localeText?.bulkUpdateValueLabel ?? copy.bulkUpdateValueLabel
  const resolvedBulkUpdateCancelLabel =
    localeText?.bulkUpdateCancelLabel ?? copy.bulkUpdateCancelLabel
  const resolvedBulkUpdateApplyLabel =
    localeText?.bulkUpdateApplyLabel ?? copy.bulkUpdateApplyLabel
  const bulkUpdateFields = bulkUpdate !== false ? bulkUpdate.fields : []
  const availableBulkUpdateFields = useMemo(
    () => bulkUpdateFields.filter((field) => field.disabled !== true),
    [bulkUpdateFields]
  )

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
    let currentLeft = rowSelectionEnabled ? selectionColumnWidth : 0

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
  }, [
    columns,
    fixedLeftColumns,
    measuredColumnWidths,
    rowSelectionEnabled,
    selectionColumnWidth,
  ])

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

  const updateSelectedRowKeys = (nextKeys: Key[]) => {
    if (selectionConfig === false || !selectionConfig.selectedRowKeys) {
      setInternalSelectedRowKeys(nextKeys)
    }

    const selectedRows = rows.filter((row, rowIndex) =>
      nextKeys.includes(getRowId(row, rowIndex))
    )

    if (selectionConfig !== false) {
      selectionConfig.onSelectedRowKeysChange?.(nextKeys, selectedRows)
    }
  }

  const clearSelection = () => {
    updateSelectedRowKeys([])
  }

  const handleResetQuery = () => {
    setPage(1)
    setDraftQuery(createQueryState(initialQuery))
  }

  const activeBulkUpdateField = useMemo(
    () =>
      availableBulkUpdateFields.find((field) => field.key === bulkUpdateFieldKey) ??
      availableBulkUpdateFields[0] ??
      null,
    [availableBulkUpdateFields, bulkUpdateFieldKey]
  )

  const handleOpenBulkUpdate = () => {
    if (bulkUpdate === false || selectedRowKeys.length === 0) return

    const defaultField = availableBulkUpdateFields[0] ?? null
    setBulkUpdateFieldKey(defaultField?.key ?? "")
    setBulkUpdateValue("")
    setBulkUpdateDialogOpen(true)
  }

  const handleBulkUpdateSubmit = async () => {
    if (
      bulkUpdate === false ||
      activeBulkUpdateField === null ||
      updating ||
      selectedRowKeys.length === 0
    ) {
      return
    }

    setUpdating(true)

    try {
      await bulkUpdate.onSubmit({
        clearSelection,
        fieldKey: activeBulkUpdateField.key,
        selectedRowKeys,
        selectedRows,
        value: bulkUpdateValue,
      })
      setBulkUpdateDialogOpen(false)
      setBulkUpdateValue("")
      clearSelection()
      handleRetry()
    } finally {
      setUpdating(false)
    }
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
  const selectedRowKeySet = useMemo(
    () => new Set<Key>(selectedRowKeys),
    [selectedRowKeys]
  )
  const currentPageRowKeys = useMemo(
    () => rows.map((row, rowIndex) => getRowId(row, rowIndex)),
    [getRowId, rows]
  )
  const selectedRows = useMemo(
    () =>
      rows.filter((row, rowIndex) =>
        selectedRowKeySet.has(getRowId(row, rowIndex))
      ),
    [getRowId, rows, selectedRowKeySet]
  )
  const allCurrentPageRowsSelected =
    rowSelectionEnabled &&
    currentPageRowKeys.length > 0 &&
    currentPageRowKeys.every((key) => selectedRowKeySet.has(key))
  const totalColumnCount = columns.length + (rowSelectionEnabled ? 1 : 0)
  const resolvedHeaderActions =
    typeof headerActions === "function"
      ? headerActions({
          clearSelection,
          selectedRowKeys,
          selectedRows,
        })
      : headerActions

  const handleBulkDelete = async () => {
    if (bulkDelete === false || deleting || selectedRowKeys.length === 0) return

    setDeleting(true)

    try {
      await bulkDelete.onDelete({
        clearSelection,
        selectedRowKeys,
        selectedRows,
      })
      clearSelection()
      handleRetry()
    } finally {
      setDeleting(false)
    }
  }

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
        <div className="flex items-center gap-2.5">
          <div className="min-w-0 flex-1">{searchInput}</div>

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

  const renderBulkUpdateControl = () => {
    if (activeBulkUpdateField === null) return null

    if (activeBulkUpdateField.type === "text") {
      return (
        <Input
          value={typeof bulkUpdateValue === "string" ? bulkUpdateValue : ""}
          onValueChange={setBulkUpdateValue}
          placeholder={activeBulkUpdateField.placeholder}
          disabled={updating}
          type={activeBulkUpdateField.inputType}
        />
      )
    }

    if (activeBulkUpdateField.type === "select") {
      return (
        <AdvancedSelect
          value={typeof bulkUpdateValue === "string" ? bulkUpdateValue : ""}
          onValueChange={setBulkUpdateValue}
          list={activeBulkUpdateField.options.map((option) => ({
            label: option.label,
            value: option.value,
            disabled: option.disabled,
          }))}
          placeholder={activeBulkUpdateField.placeholder}
          disabled={updating}
        />
      )
    }

    return activeBulkUpdateField.renderControl(bulkUpdateValue, setBulkUpdateValue, {
      disabled: updating,
      selectedRowKeys,
      selectedRows,
    })
  }

  return (
    <TooltipProvider>
      <div
        className="flex h-full min-h-0 min-w-0 w-full max-w-full overflow-hidden rounded-xl flex-col"
        data-slot="data-table"
        style={{ height: resolveTableHeight(height) }}
      >
      <div className="shrink-0 px-3 pt-2" data-slot="data-table-header">
        {hasQueryFields ? (
          <div className="flex min-w-0 items-start gap-6 overflow-hidden">
            <div className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto">
              {leadingSearchField ? (
                <label
                  key={leadingSearchField.key}
                  className="flex min-w-[180px] shrink-0 flex-col gap-1"
                  style={{
                    width: `min(100%, ${getQueryFieldWidth(
                      leadingSearchField as DataTableQueryField<object>
                    )}px)`,
                  }}
                >
                  {renderQueryFieldControl(leadingSearchField)}
                  {leadingSearchField.description ? (
                    <span className="text-xs leading-4 text-muted-foreground">
                      {leadingSearchField.description}
                    </span>
                  ) : null}
                </label>
              ) : null}

              <div className="flex shrink-0 items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={loading}
                      onClick={handleResetQuery}
                    >
                      <RotateCcw aria-hidden="true" className="size-4.5" />
                      <span className="sr-only">{resolvedResetLabel}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{resolvedResetLabel}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={loading}
                      onClick={handleRetry}
                    >
                      <RefreshCw aria-hidden="true" className="size-4.5" />
                      <span className="sr-only">{resolvedRefreshLabel}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{resolvedRefreshLabel}</TooltipContent>
                </Tooltip>
              </div>

              {trailingQueryFields.map((field) => (
                <label
                  key={field.key}
                  className="flex min-w-[180px] shrink-0 flex-col gap-1"
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

            {bulkDelete !== false || bulkUpdate !== false || resolvedHeaderActions ? (
              <div className="flex shrink-0 items-center gap-2">
                {bulkDelete !== false && rowSelectionEnabled ? (
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={selectedRowKeys.length === 0 || deleting}
                    onClick={() => {
                      void handleBulkDelete()
                    }}
                  >
                    {bulkDelete.label ??
                      resolvedBulkDeleteLabel(selectedRowKeys.length)}
                  </Button>
                ) : null}
                {bulkUpdate !== false ? (
                  <Button
                    type="button"
                    variant="outline"
                    disabled={selectedRowKeys.length === 0}
                    onClick={handleOpenBulkUpdate}
                  >
                    {bulkUpdate.label ??
                      resolvedBulkUpdateLabel(selectedRowKeys.length)}
                  </Button>
                ) : null}
                {resolvedHeaderActions}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="flex shrink-0 items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={loading}
                    onClick={handleRetry}
                  >
                    <RefreshCw aria-hidden="true" className="size-4.5" />
                    <span className="sr-only">{resolvedRefreshLabel}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{resolvedRefreshLabel}</TooltipContent>
              </Tooltip>
            </div>
            {bulkDelete !== false || bulkUpdate !== false || resolvedHeaderActions ? (
              <div className="flex min-w-0 items-center justify-end gap-2">
                {bulkDelete !== false && rowSelectionEnabled ? (
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={selectedRowKeys.length === 0 || deleting}
                    onClick={() => {
                      void handleBulkDelete()
                    }}
                  >
                    {bulkDelete.label ??
                      resolvedBulkDeleteLabel(selectedRowKeys.length)}
                  </Button>
                ) : null}
                {bulkUpdate !== false ? (
                  <Button
                    type="button"
                    variant="outline"
                    disabled={selectedRowKeys.length === 0}
                    onClick={handleOpenBulkUpdate}
                  >
                    {bulkUpdate.label ??
                      resolvedBulkUpdateLabel(selectedRowKeys.length)}
                  </Button>
                ) : null}
                {resolvedHeaderActions}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div
        className="mt-3 min-h-0 flex-1 overflow-hidden"
        data-slot="data-table-body"
      >
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
                {rowSelectionEnabled ? (
                  <TableHead
                    className="sticky top-0 left-0 z-30 bg-[var(--surface)] shadow-[inset_-1px_0_0_var(--border)]"
                    style={{
                      left: 0,
                      minWidth: `${selectionColumnWidth}px`,
                      width: `${selectionColumnWidth}px`,
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={allCurrentPageRowsSelected}
                        onCheckedChange={(checked) => {
                          if (!checked) {
                            updateSelectedRowKeys(
                              selectedRowKeys.filter(
                                (key) => !currentPageRowKeys.includes(key)
                              )
                            )
                            return
                          }

                          updateSelectedRowKeys(
                            Array.from(
                              new Set<Key>([
                                ...selectedRowKeys,
                                ...currentPageRowKeys,
                              ])
                            )
                          )
                        }}
                        disabled={!hasRows || loading}
                      />
                    </div>
                  </TableHead>
                ) : null}
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
                  <TableCell colSpan={totalColumnCount}>
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
                </TableRow>
              ) : null}

              {!loading && error ? (
                <TableRow>
                  <TableCell colSpan={totalColumnCount}>{errorContent}</TableCell>
                </TableRow>
              ) : null}

              {!loading && !error && !hasRows ? (
                <TableRow>
                  <TableCell colSpan={totalColumnCount}>{emptyContent}</TableCell>
                </TableRow>
              ) : null}

              {!loading && !error
                ? rows.map((row: T, rowIndex: number) => (
                    <TableRow key={getRowId(row, rowIndex)}>
                      {rowSelectionEnabled ? (
                        <TableCell
                          className="sticky left-0 z-20 bg-[var(--background)] shadow-[inset_-1px_0_0_var(--border)]"
                          style={{
                            left: 0,
                            minWidth: `${selectionColumnWidth}px`,
                            width: `${selectionColumnWidth}px`,
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <Checkbox
                              checked={selectedRowKeySet.has(
                                getRowId(row, rowIndex)
                              )}
                              onCheckedChange={(checked) => {
                                const rowKey = getRowId(row, rowIndex)

                                if (!checked) {
                                  updateSelectedRowKeys(
                                    selectedRowKeys.filter((key) => key !== rowKey)
                                  )
                                  return
                                }

                                updateSelectedRowKeys(
                                  Array.from(
                                    new Set<Key>([...selectedRowKeys, rowKey])
                                  )
                                )
                              }}
                            />
                          </div>
                        </TableCell>
                      ) : null}
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

      <div className="mt-2 overflow-x-auto px-3 py-2" data-slot="data-table-tail">
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

      {bulkUpdate !== false ? (
        <Dialog open={bulkUpdateDialogOpen} onOpenChange={setBulkUpdateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{bulkUpdate.title ?? resolvedBulkUpdateTitle}</DialogTitle>
              <DialogDescription>
                {bulkUpdate.description ??
                  resolvedBulkUpdateDescription(selectedRowKeys.length)}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  {resolvedBulkUpdateFieldLabel}
                </span>
                <AdvancedSelect
                  value={activeBulkUpdateField?.key ?? ""}
                  onValueChange={(value) => {
                    setBulkUpdateFieldKey(value)
                    setBulkUpdateValue("")
                  }}
                  list={availableBulkUpdateFields.map((field) => ({
                    label: field.label,
                    value: field.key,
                  }))}
                  disabled={updating}
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  {resolvedBulkUpdateValueLabel}
                </span>
                {renderBulkUpdateControl()}
                {activeBulkUpdateField?.description ? (
                  <span className="text-xs text-muted-foreground">
                    {activeBulkUpdateField.description}
                  </span>
                ) : null}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={updating}
                onClick={() => setBulkUpdateDialogOpen(false)}
              >
                {resolvedBulkUpdateCancelLabel}
              </Button>
              <Button
                type="button"
                disabled={activeBulkUpdateField === null || updating}
                onClick={() => {
                  void handleBulkUpdateSubmit()
                }}
              >
                {resolvedBulkUpdateApplyLabel}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
      </div>
    </TooltipProvider>
  )
}
