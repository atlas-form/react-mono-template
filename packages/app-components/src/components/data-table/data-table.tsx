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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui-core/components/dropdown-menu"
import { getDataTableCopy, normalizeLanguage } from "@workspace/shared-i18n"
import {
  MoreHorizontal,
  Plus,
  Pencil,
  RefreshCw,
  RotateCcw,
  SquarePen,
  Trash,
  Trash2,
} from "lucide-react"
import { useTranslation } from "react-i18next"
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

import { DateRangePicker, type DateRangeValue } from "../date-time-picker"

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

export type DataTableBuiltInQueryField<TQuery> =
  | DataTableSearchQueryField<TQuery>
  | DataTableSelectQueryField<TQuery>
  | DataTableDateRangeQueryField<TQuery>

export type DataTableQueryField<TQuery> =
  | DataTableTextQueryField<TQuery>
  | DataTableSearchQueryField<TQuery>
  | DataTableSelectQueryField<TQuery>
  | DataTableDateRangeQueryField<TQuery>

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
  insertLabel?: ReactNode
  actionsLabel?: ReactNode
  editLabel?: ReactNode
  deleteLabel?: ReactNode
  moreLabel?: string
  cancelLabel?: ReactNode
  saveLabel?: ReactNode
  confirmDeleteLabel?: ReactNode
  deleteDialogTitle?: ReactNode
  deleteDialogDescription?: ReactNode
  bulkDeleteDialogDescription?: (count: number) => ReactNode
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

export interface DataTableSelectionContext<T> {
  clearSelection: () => void
  selectedRowKeys: Key[]
  selectedRows: T[]
}

export interface DataTableBulkDeleteConfig<T> {
  label?: ReactNode
  title?: ReactNode
  description?: ReactNode | ((count: number) => ReactNode)
  onDelete: (context: DataTableSelectionContext<T>) => Promise<void> | void
}

export interface DataTableInsertActionConfig {
  label?: ReactNode
  disabled?: boolean
  title?: ReactNode
  description?: ReactNode
  cancelLabel?: ReactNode
  confirmLabel?: ReactNode
  renderContent?: (context: { close: () => void }) => ReactNode
  onConfirm?: () => Promise<void> | void
}

export interface DataTableBulkUpdateFieldBase {
  key: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface DataTableBulkUpdateTextField extends DataTableBulkUpdateFieldBase {
  type: "text"
  placeholder?: string
  inputType?: "text" | "search" | "email" | "number" | "tel" | "url"
}

export interface DataTableBulkUpdateSelectField extends DataTableBulkUpdateFieldBase {
  type: "select"
  placeholder?: string
  options: readonly DataTableSelectOption[]
}

export type DataTableBulkUpdateField =
  | DataTableBulkUpdateTextField
  | DataTableBulkUpdateSelectField

export interface DataTableBulkUpdateSubmitContext<
  T,
> extends DataTableSelectionContext<T> {
  fieldKey: string
  value: unknown
}

export interface DataTableBulkUpdateConfig<T> {
  label?: ReactNode
  title?: ReactNode
  description?: ReactNode
  fields: readonly DataTableBulkUpdateField[]
  onSubmit: (
    context: DataTableBulkUpdateSubmitContext<T>
  ) => Promise<void> | void
}

export interface DataTableRowSelectionConfig<T> {
  columnWidth?: number
  selectedRowKeys?: readonly Key[]
  onSelectedRowKeysChange?: (keys: Key[], rows: T[]) => void
}

export interface DataTableRowActionItem<T> {
  key: string
  label: ReactNode
  variant?: "default" | "destructive"
  disabled?: boolean | ((row: T, rowIndex: number) => boolean)
  onClick?: (row: T, rowIndex: number) => void
}

export interface DataTableEditActionConfig<T> {
  label?: ReactNode
  title?: ReactNode | ((row: T, rowIndex: number) => ReactNode)
  description?: ReactNode | ((row: T, rowIndex: number) => ReactNode)
  cancelLabel?: ReactNode
  confirmLabel?: ReactNode
  renderContent?: (context: {
    row: T
    rowIndex: number
    close: () => void
  }) => ReactNode
  onConfirm?: (row: T, rowIndex: number) => Promise<void> | void
}

export interface DataTableDeleteActionConfig<T> {
  label?: ReactNode
  title?: ReactNode | ((row: T, rowIndex: number) => ReactNode)
  description?: ReactNode | ((row: T, rowIndex: number) => ReactNode)
  cancelLabel?: ReactNode
  confirmLabel?: ReactNode
  onConfirm?: (row: T, rowIndex: number) => Promise<void> | void
}

export interface DataTableRowActionsConfig<T> {
  header?: ReactNode
  columnWidth?: number | string
  sticky?: "left" | "right" | false
  moreLabel?: string
  edit?: false | DataTableEditActionConfig<T>
  delete?: false | DataTableDeleteActionConfig<T>
  moreItems?: readonly DataTableRowActionItem<T>[]
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
  builtInQueryFields?: readonly DataTableBuiltInQueryField<TQuery>[]
  queryFields?: readonly DataTableQueryField<TQuery>[]
  toolbarActions?: ReactNode
  insert?: false | DataTableInsertActionConfig
  selection?: false | DataTableRowSelectionConfig<T>
  bulkDelete?: false | DataTableBulkDeleteConfig<T>
  bulkUpdate?: false | DataTableBulkUpdateConfig<T>
  rowActions?: false | DataTableRowActionsConfig<T>
  height?: number | string
  refreshLabel?: string
  resetLabel?: string
  initialSort?: DataTableSortState | null
  localeText?: DataTableLocaleText
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 30, 50] as const
const DEFAULT_STICKY_COLUMN_WIDTH = 160
const DEFAULT_SELECTION_COLUMN_WIDTH = 44
const DEFAULT_ROW_ACTION_BUTTON_WIDTH = 32
const DEFAULT_ROW_ACTION_GAP_WIDTH = 6
const DEFAULT_ROW_ACTION_CELL_PADDING = 16

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

function resolveRowActionsColumnWidth<T>(
  rowActions: DataTableRowActionsConfig<T>
) {
  if (rowActions.columnWidth !== undefined) {
    return rowActions.columnWidth
  }

  const buttonCount =
    (rowActions.edit ? 1 : 0) +
    (rowActions.delete ? 1 : 0) +
    ((rowActions.moreItems?.length ?? 0) > 0 ? 1 : 0)

  if (buttonCount <= 0) {
    return 0
  }

  return (
    buttonCount * DEFAULT_ROW_ACTION_BUTTON_WIDTH +
    Math.max(0, buttonCount - 1) * DEFAULT_ROW_ACTION_GAP_WIDTH +
    DEFAULT_ROW_ACTION_CELL_PADDING
  )
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

function getQueryFieldLayoutStyle(field: DataTableQueryField<object>) {
  if (field.type === "search") {
    return field.fieldOptions?.length
      ? {
          flex: "1 1 420px",
          minWidth: "340px",
          maxWidth: "520px",
        }
      : {
          flex: "1 1 320px",
          minWidth: "260px",
          maxWidth: "420px",
        }
  }

  if (field.type === "text") {
    return {
      flex: "1 1 280px",
      minWidth: "220px",
      maxWidth: "360px",
    }
  }

  if (field.type === "date-range") {
    return {
      flex: "0 1 240px",
      minWidth: "220px",
      maxWidth: "280px",
    }
  }

  if (field.type === "select") {
    return {
      flex: "0 1 180px",
      minWidth: "160px",
      maxWidth: "220px",
    }
  }

  return {
    flex: "0 1 220px",
    minWidth: "180px",
    maxWidth: "280px",
  }
}

function resolveRowActionDisabled<T>(
  disabled: DataTableRowActionItem<T>["disabled"],
  row: T,
  rowIndex: number
) {
  if (typeof disabled === "function") {
    return disabled(row, rowIndex)
  }

  return disabled === true
}

function resolveRowActionContent<T>(
  value: ReactNode | ((row: T, rowIndex: number) => ReactNode) | undefined,
  row: T,
  rowIndex: number
) {
  if (typeof value === "function") {
    return value(row, rowIndex)
  }

  return value
}

function DataTableRowActionsCell<T>({
  row,
  rowIndex,
  rowActions,
  moreItems,
  resolvedEditLabel,
  resolvedDeleteLabel,
  resolvedMoreLabel,
  resolvedCancelLabel,
  resolvedSaveLabel,
  resolvedConfirmDeleteLabel,
  resolvedDeleteDialogTitle,
  resolvedDeleteDialogDescription,
}: {
  row: T
  rowIndex: number
  rowActions: DataTableRowActionsConfig<T>
  moreItems: readonly DataTableRowActionItem<T>[]
  resolvedEditLabel: ReactNode
  resolvedDeleteLabel: ReactNode
  resolvedMoreLabel: string
  resolvedCancelLabel: ReactNode
  resolvedSaveLabel: ReactNode
  resolvedConfirmDeleteLabel: ReactNode
  resolvedDeleteDialogTitle: ReactNode
  resolvedDeleteDialogDescription: ReactNode
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [submittingEdit, setSubmittingEdit] = useState(false)
  const [submittingDelete, setSubmittingDelete] = useState(false)
  const editAction = rowActions.edit || null
  const deleteAction = rowActions.delete || null
  const hasMoreActions = moreItems.length > 0

  const handleEditConfirm = async () => {
    if (!editAction?.onConfirm || submittingEdit) {
      setEditDialogOpen(false)
      return
    }

    setSubmittingEdit(true)

    try {
      await editAction.onConfirm(row, rowIndex)
      setEditDialogOpen(false)
    } finally {
      setSubmittingEdit(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteAction?.onConfirm || submittingDelete) {
      setDeleteDialogOpen(false)
      return
    }

    setSubmittingDelete(true)

    try {
      await deleteAction.onConfirm(row, rowIndex)
      setDeleteDialogOpen(false)
    } finally {
      setSubmittingDelete(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        {editAction ? (
          <button
            type="button"
            onClick={() => setEditDialogOpen(true)}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <Pencil aria-hidden="true" className="size-4" />
            <span className="sr-only">
              {editAction.label ?? resolvedEditLabel}
            </span>
          </button>
        ) : null}

        {deleteAction ? (
          <button
            type="button"
            onClick={() => setDeleteDialogOpen(true)}
            className="inline-flex size-8 items-center justify-center rounded-md text-destructive transition hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
          >
            <Trash2 aria-hidden="true" className="size-4" />
            <span className="sr-only">
              {deleteAction.label ?? resolvedDeleteLabel}
            </span>
          </button>
        ) : null}

        {hasMoreActions ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                <MoreHorizontal aria-hidden="true" className="size-4.5" />
                <span className="sr-only">
                  {rowActions.moreLabel ?? resolvedMoreLabel}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              mode="headless"
              align="end"
              sideOffset={8}
              className="z-[2000] min-w-36 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-hidden"
            >
              {moreItems.map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  mode="headless"
                  variant={item.variant ?? "default"}
                  className="flex min-h-8 cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm leading-none outline-hidden transition focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-disabled:pointer-events-none data-disabled:opacity-50"
                  disabled={resolveRowActionDisabled(
                    item.disabled,
                    row,
                    rowIndex
                  )}
                  onSelect={() => item.onClick?.(row, rowIndex)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      {editAction ? (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {resolveRowActionContent(editAction.title, row, rowIndex) ??
                  editAction.label ??
                  resolvedEditLabel}
              </DialogTitle>
              {editAction.description ? (
                <DialogDescription>
                  {resolveRowActionContent(
                    editAction.description,
                    row,
                    rowIndex
                  )}
                </DialogDescription>
              ) : null}
            </DialogHeader>

            {editAction.renderContent?.({
              row,
              rowIndex,
              close: () => setEditDialogOpen(false),
            }) ?? null}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                disabled={submittingEdit}
              >
                {editAction.cancelLabel ?? resolvedCancelLabel}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  void handleEditConfirm()
                }}
                disabled={submittingEdit}
              >
                {editAction.confirmLabel ?? resolvedSaveLabel}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}

      {deleteAction ? (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {resolveRowActionContent(deleteAction.title, row, rowIndex) ??
                  deleteAction.label ??
                  resolvedDeleteDialogTitle}
              </DialogTitle>
              {deleteAction.description || resolvedDeleteDialogDescription ? (
                <DialogDescription>
                  {resolveRowActionContent(
                    deleteAction.description,
                    row,
                    rowIndex
                  ) ?? resolvedDeleteDialogDescription}
                </DialogDescription>
              ) : null}
            </DialogHeader>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={submittingDelete}
              >
                {deleteAction.cancelLabel ?? resolvedCancelLabel}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  void handleDeleteConfirm()
                }}
                disabled={submittingDelete}
              >
                {deleteAction.confirmLabel ?? resolvedConfirmDeleteLabel}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
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
  builtInQueryFields = [],
  queryFields = [],
  toolbarActions,
  insert = false,
  selection,
  bulkDelete = false,
  bulkUpdate = false,
  rowActions = false,
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
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState<Key[]>(
    []
  )
  const [insertDialogOpen, setInsertDialogOpen] = useState(false)
  const [submittingInsert, setSubmittingInsert] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [bulkUpdateDialogOpen, setBulkUpdateDialogOpen] = useState(false)
  const [bulkUpdateFieldKey, setBulkUpdateFieldKey] = useState("")
  const [bulkUpdateValue, setBulkUpdateValue] = useState<unknown>("")
  const [updating, setUpdating] = useState(false)
  const [draftQuery, setDraftQuery] = useState<TQuery>(() =>
    createQueryState(initialQuery)
  )
  const headerCellRefs = useRef<Array<HTMLTableCellElement | null>>([])
  const selectionConfig: false | DataTableRowSelectionConfig<T> =
    selection === false
      ? false
      : selection
        ? selection
        : bulkDelete !== false || bulkUpdate !== false
          ? {}
          : false
  const rowSelectionEnabled = selectionConfig !== false
  const selectionColumnWidth =
    selectionConfig !== false
      ? (selectionConfig.columnWidth ?? DEFAULT_SELECTION_COLUMN_WIDTH)
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
  const hasBuiltInQueryFields = builtInQueryFields.length > 0
  const hasUserQueryFields = queryFields.length > 0
  const hasAnyQueryFields = hasBuiltInQueryFields || hasUserQueryFields
  const leadingBuiltInSearchField =
    builtInQueryFields.find((field) => field.type === "search") ?? null
  const trailingBuiltInQueryFields = leadingBuiltInSearchField
    ? builtInQueryFields.filter((field) => field !== leadingBuiltInSearchField)
    : builtInQueryFields
  const resolvedEmptyText = localeText?.emptyText ?? emptyText ?? copy.emptyText
  const resolvedErrorText = localeText?.errorText ?? errorText ?? copy.errorText
  const resolvedLoadingText =
    localeText?.loadingText ?? loadingText ?? copy.loadingText
  const resolvedRefreshLabel =
    localeText?.refreshLabel ?? refreshLabel ?? copy.refreshLabel
  const resolvedResetLabel =
    localeText?.resetLabel ?? resetLabel ?? copy.resetLabel
  const resolvedTotalLabel = localeText?.totalLabel ?? copy.totalLabel
  const resolvedInsertLabel = localeText?.insertLabel ?? copy.insertLabel
  const resolvedActionsLabel = localeText?.actionsLabel ?? copy.actionsLabel
  const resolvedEditLabel = localeText?.editLabel ?? copy.editLabel
  const resolvedDeleteLabel = localeText?.deleteLabel ?? copy.deleteLabel
  const resolvedMoreLabel = localeText?.moreLabel ?? copy.moreLabel
  const resolvedCancelLabel = localeText?.cancelLabel ?? copy.cancelLabel
  const resolvedSaveLabel = localeText?.saveLabel ?? copy.saveLabel
  const resolvedConfirmDeleteLabel =
    localeText?.confirmDeleteLabel ?? copy.confirmDeleteLabel
  const resolvedDeleteDialogTitle =
    localeText?.deleteDialogTitle ?? copy.deleteDialogTitle
  const resolvedDeleteDialogDescription =
    localeText?.deleteDialogDescription ?? copy.deleteDialogDescription
  const resolvedBulkDeleteDialogDescription =
    localeText?.bulkDeleteDialogDescription ?? copy.bulkDeleteDialogDescription
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
  const resolvedColumns = useMemo(() => {
    if (rowActions === false) {
      return [...columns]
    }

    const moreItems = rowActions.moreItems ?? []
    const actionColumn: DataTableColumn<T> = {
      key: "__actions__",
      header: rowActions.header ?? resolvedActionsLabel,
      width: resolveRowActionsColumnWidth(rowActions),
      sticky:
        rowActions.sticky === false
          ? undefined
          : (rowActions.sticky ?? "right"),
      renderCell: (row, rowIndex) => (
        <DataTableRowActionsCell
          row={row}
          rowIndex={rowIndex}
          rowActions={rowActions}
          moreItems={moreItems}
          resolvedEditLabel={resolvedEditLabel}
          resolvedDeleteLabel={resolvedDeleteLabel}
          resolvedMoreLabel={resolvedMoreLabel}
          resolvedCancelLabel={resolvedCancelLabel}
          resolvedSaveLabel={resolvedSaveLabel}
          resolvedConfirmDeleteLabel={resolvedConfirmDeleteLabel}
          resolvedDeleteDialogTitle={resolvedDeleteDialogTitle}
          resolvedDeleteDialogDescription={resolvedDeleteDialogDescription}
        />
      ),
    }

    return [...columns, actionColumn]
  }, [
    columns,
    resolvedActionsLabel,
    resolvedCancelLabel,
    resolvedConfirmDeleteLabel,
    resolvedDeleteLabel,
    resolvedDeleteDialogDescription,
    resolvedDeleteDialogTitle,
    resolvedEditLabel,
    resolvedMoreLabel,
    resolvedSaveLabel,
    rowActions,
  ])

  useLayoutEffect(() => {
    const updateWidths = () => {
      setMeasuredColumnWidths(
        resolvedColumns.map((_, columnIndex) => {
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
  }, [resolvedColumns])

  const stickyLeftOffsets = useMemo(() => {
    let currentLeft = rowSelectionEnabled ? selectionColumnWidth : 0

    return resolvedColumns.map((column, columnIndex) => {
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
    fixedLeftColumns,
    measuredColumnWidths,
    resolvedColumns,
    rowSelectionEnabled,
    selectionColumnWidth,
  ])

  const stickyRightOffsets = useMemo(() => {
    let currentRight = 0
    const offsets = Array<number | undefined>(resolvedColumns.length).fill(
      undefined
    )

    for (
      let columnIndex = resolvedColumns.length - 1;
      columnIndex >= 0;
      columnIndex -= 1
    ) {
      const column = resolvedColumns[columnIndex]

      if (
        !isRightStickyColumn(
          column,
          columnIndex,
          resolvedColumns.length,
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
  }, [
    fixedLeftColumns,
    fixedRightColumns,
    measuredColumnWidths,
    resolvedColumns,
  ])

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
      availableBulkUpdateFields.find(
        (field) => field.key === bulkUpdateFieldKey
      ) ??
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
  const totalColumnCount =
    resolvedColumns.length + (rowSelectionEnabled ? 1 : 0)

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

  const handleInsertConfirm = async () => {
    if (insert === false || !insert.onConfirm || submittingInsert) {
      setInsertDialogOpen(false)
      return
    }

    setSubmittingInsert(true)

    try {
      await insert.onConfirm()
      setInsertDialogOpen(false)
      handleRetry()
    } finally {
      setSubmittingInsert(false)
    }
  }

  const emptyContent = renderEmpty ? renderEmpty() : resolvedEmptyText
  const errorContent = renderError
    ? renderError(error, handleRetry)
    : resolvedErrorText
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

    return null
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

    return null
  }

  return (
    <TooltipProvider>
      <div
        className="flex h-full min-h-0 w-full max-w-full min-w-0 flex-col overflow-hidden rounded-xl"
        data-slot="data-table"
        style={{ height: resolveTableHeight(height) }}
      >
        <div className="shrink-0 px-3 pt-2" data-slot="data-table-header">
          {hasAnyQueryFields ? (
            <div className="flex min-w-0 items-start gap-4 overflow-hidden">
              <div className="flex min-w-0 flex-1 flex-col gap-2.5 overflow-hidden">
                <div className="flex min-w-0 flex-wrap items-start gap-3 overflow-hidden">
                  <div className="flex min-w-0 flex-1 flex-wrap items-start gap-2.5">
                  {leadingBuiltInSearchField ? (
                    <label
                      key={leadingBuiltInSearchField.key}
                      className="flex min-w-0 flex-col gap-1"
                      style={getQueryFieldLayoutStyle(
                        leadingBuiltInSearchField as DataTableQueryField<object>
                      )}
                    >
                      {renderQueryFieldControl(leadingBuiltInSearchField)}
                      {leadingBuiltInSearchField.description ? (
                        <span className="text-xs leading-4 text-muted-foreground">
                          {leadingBuiltInSearchField.description}
                        </span>
                      ) : null}
                    </label>
                  ) : null}

                  <div className="flex shrink-0 items-center gap-1 self-center px-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={handleResetQuery}
                          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                        >
                          <RotateCcw aria-hidden="true" className="size-4.5" />
                          <span className="sr-only">{resolvedResetLabel}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{resolvedResetLabel}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={handleRetry}
                          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                        >
                          <RefreshCw aria-hidden="true" className="size-4.5" />
                          <span className="sr-only">{resolvedRefreshLabel}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{resolvedRefreshLabel}</TooltipContent>
                    </Tooltip>
                  </div>

                  {trailingBuiltInQueryFields.map((field) => (
                    <label
                      key={field.key}
                      className="flex min-w-0 flex-col gap-1"
                      style={getQueryFieldLayoutStyle(
                        field as DataTableQueryField<object>
                      )}
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

              {hasUserQueryFields ? (
                <div className="flex min-w-0 flex-wrap items-start gap-2.5">
                  {queryFields.map((field) => (
                    <label
                      key={field.key}
                      className="flex min-w-0 flex-col gap-1"
                      style={getQueryFieldLayoutStyle(
                        field as DataTableQueryField<object>
                      )}
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
              ) : null}

              </div>

              {insert !== false ||
              bulkDelete !== false ||
              bulkUpdate !== false ||
              toolbarActions ? (
                <div className="w-[5.5rem] flex-none self-stretch sm:w-[14rem]">
                  <div className="flex h-full w-full items-start justify-center border-l border-border pl-2 sm:pl-4">
                    <div className="flex w-full flex-col items-stretch gap-1.5 pt-1 sm:flex-row sm:items-center sm:justify-center sm:gap-2">
                      {insert !== false ? (
                        <button
                          type="button"
                          disabled={insert.disabled === true}
                          onClick={() => {
                            setInsertDialogOpen(true)
                          }}
                          className="inline-flex w-full flex-col items-center justify-start gap-1 rounded-lg bg-primary px-1 py-1.5 text-primary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 sm:w-16 sm:px-1.5"
                        >
                          <Plus aria-hidden="true" className="size-4.5" />
                          <span className="line-clamp-2 min-h-[1.75rem] text-center text-[10px] leading-3.5 sm:min-h-[2rem] sm:leading-4">
                            {insert.label ?? resolvedInsertLabel}
                          </span>
                        </button>
                      ) : null}
                      {bulkUpdate !== false ? (
                        <button
                          type="button"
                          disabled={selectedRowKeys.length === 0}
                          onClick={handleOpenBulkUpdate}
                          className="inline-flex w-full flex-col items-center justify-start gap-1 rounded-lg bg-secondary px-1 py-1.5 text-secondary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 sm:w-16 sm:px-1.5"
                        >
                          <SquarePen aria-hidden="true" className="size-4.5" />
                          <span className="line-clamp-2 min-h-[1.75rem] text-center text-[10px] leading-3.5 sm:min-h-[2rem] sm:leading-4">
                            {bulkUpdate.label ??
                              resolvedBulkUpdateLabel(selectedRowKeys.length)}
                          </span>
                        </button>
                      ) : null}
                      {bulkDelete !== false && rowSelectionEnabled ? (
                        <button
                          type="button"
                          disabled={selectedRowKeys.length === 0 || deleting}
                          onClick={() => {
                            setBulkDeleteDialogOpen(true)
                          }}
                          className="inline-flex w-full flex-col items-center justify-start gap-1 rounded-lg bg-destructive px-1 py-1.5 text-destructive-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 sm:w-16 sm:px-1.5"
                        >
                          <Trash aria-hidden="true" className="size-4.5" />
                          <span className="line-clamp-2 min-h-[1.75rem] text-center text-[10px] leading-3.5 sm:min-h-[2rem] sm:leading-4">
                            {bulkDelete.label ??
                              resolvedBulkDeleteLabel(selectedRowKeys.length)}
                          </span>
                        </button>
                      ) : null}
                      {toolbarActions}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleRetry}
                      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      <RefreshCw aria-hidden="true" className="size-4.5" />
                      <span className="sr-only">{resolvedRefreshLabel}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{resolvedRefreshLabel}</TooltipContent>
                </Tooltip>
              </div>
              {insert !== false ||
              bulkDelete !== false ||
              bulkUpdate !== false ||
              toolbarActions ? (
                <div className="w-[5.5rem] flex-none self-stretch sm:w-[14rem]">
                  <div className="flex h-full w-full items-start justify-center border-l border-border pl-2 sm:pl-4">
                    <div className="flex w-full flex-col items-stretch gap-1.5 pt-1 sm:flex-row sm:items-center sm:justify-center sm:gap-2">
                      {insert !== false ? (
                        <button
                          type="button"
                          disabled={insert.disabled === true}
                          onClick={() => {
                            setInsertDialogOpen(true)
                          }}
                          className="inline-flex w-full flex-col items-center justify-start gap-1 rounded-lg bg-primary px-1 py-1.5 text-primary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 sm:w-16 sm:px-1.5"
                        >
                          <Plus aria-hidden="true" className="size-4.5" />
                          <span className="line-clamp-2 min-h-[1.75rem] text-center text-[10px] leading-3.5 sm:min-h-[2rem] sm:leading-4">
                            {insert.label ?? resolvedInsertLabel}
                          </span>
                        </button>
                      ) : null}
                      {bulkUpdate !== false ? (
                        <button
                          type="button"
                          disabled={selectedRowKeys.length === 0}
                          onClick={handleOpenBulkUpdate}
                          className="inline-flex w-full flex-col items-center justify-start gap-1 rounded-lg bg-secondary px-1 py-1.5 text-secondary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 sm:w-16 sm:px-1.5"
                        >
                          <SquarePen aria-hidden="true" className="size-4.5" />
                          <span className="line-clamp-2 min-h-[1.75rem] text-center text-[10px] leading-3.5 sm:min-h-[2rem] sm:leading-4">
                            {bulkUpdate.label ??
                              resolvedBulkUpdateLabel(selectedRowKeys.length)}
                          </span>
                        </button>
                      ) : null}
                      {bulkDelete !== false && rowSelectionEnabled ? (
                        <button
                          type="button"
                          disabled={selectedRowKeys.length === 0 || deleting}
                          onClick={() => {
                            setBulkDeleteDialogOpen(true)
                          }}
                          className="inline-flex w-full flex-col items-center justify-start gap-1 rounded-lg bg-destructive px-1 py-1.5 text-destructive-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 sm:w-16 sm:px-1.5"
                        >
                          <Trash aria-hidden="true" className="size-4.5" />
                          <span className="line-clamp-2 min-h-[1.75rem] text-center text-[10px] leading-3.5 sm:min-h-[2rem] sm:leading-4">
                            {bulkDelete.label ??
                              resolvedBulkDeleteLabel(selectedRowKeys.length)}
                          </span>
                        </button>
                      ) : null}
                      {toolbarActions}
                    </div>
                  </div>
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
              className="w-max min-w-full"
              containerClassName="overflow-visible"
            >
              {caption ? <TableCaption>{caption}</TableCaption> : null}
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
                  {resolvedColumns.map((column, columnIndex) => {
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
                          <span className="min-w-0 truncate">
                            {column.header}
                          </span>
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
                    <TableCell colSpan={totalColumnCount}>
                      {errorContent}
                    </TableCell>
                  </TableRow>
                ) : null}

                {!loading && !error && !hasRows ? (
                  <TableRow>
                    <TableCell colSpan={totalColumnCount}>
                      {emptyContent}
                    </TableCell>
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
                                      selectedRowKeys.filter(
                                        (key) => key !== rowKey
                                      )
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
                        {resolvedColumns.map((column, columnIndex) => (
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
                            <Fragment>
                              {column.renderCell(row, rowIndex)}
                            </Fragment>
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
          className="mt-2 overflow-x-auto px-3 py-2"
          data-slot="data-table-tail"
        >
          <div className="flex min-w-max flex-nowrap items-center justify-between">
            <div className="flex shrink-0 items-center gap-2 text-sm">
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
          <Dialog
            open={bulkUpdateDialogOpen}
            onOpenChange={setBulkUpdateDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {bulkUpdate.title ?? resolvedBulkUpdateTitle}
                </DialogTitle>
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

        {bulkDelete !== false ? (
          <Dialog
            open={bulkDeleteDialogOpen}
            onOpenChange={setBulkDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {bulkDelete.title ?? resolvedDeleteDialogTitle}
                </DialogTitle>
                <DialogDescription>
                  {(typeof bulkDelete.description === "function"
                    ? bulkDelete.description(selectedRowKeys.length)
                    : bulkDelete.description) ??
                    resolvedBulkDeleteDialogDescription(selectedRowKeys.length)}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={deleting}
                  onClick={() => setBulkDeleteDialogOpen(false)}
                >
                  {resolvedCancelLabel}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={deleting || selectedRowKeys.length === 0}
                  onClick={() => {
                    void (async () => {
                      await handleBulkDelete()
                      setBulkDeleteDialogOpen(false)
                    })()
                  }}
                >
                  {resolvedConfirmDeleteLabel}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}

        {insert !== false ? (
          <Dialog open={insertDialogOpen} onOpenChange={setInsertDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {insert.title ?? insert.label ?? resolvedInsertLabel}
                </DialogTitle>
                {insert.description ? (
                  <DialogDescription>{insert.description}</DialogDescription>
                ) : null}
              </DialogHeader>

              {insert.renderContent?.({
                close: () => setInsertDialogOpen(false),
              }) ?? null}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={submittingInsert}
                  onClick={() => setInsertDialogOpen(false)}
                >
                  {insert.cancelLabel ?? resolvedCancelLabel}
                </Button>
                <Button
                  type="button"
                  disabled={submittingInsert}
                  onClick={() => {
                    void handleInsertConfirm()
                  }}
                >
                  {insert.confirmLabel ?? resolvedSaveLabel}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    </TooltipProvider>
  )
}
