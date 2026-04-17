import { RefreshCw, RotateCcw, Plus, SquarePen, Trash } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui-components"
import type { ReactNode } from "react"

import type {
  DataTableBuiltInQueryField,
  DataTableQueryField,
} from "./data-table.types"
import { getQueryFieldLayoutStyle } from "./data-table.utils"

function ToolbarActions({
  insert,
  bulkDelete,
  bulkUpdate,
  toolbarActions,
  rowSelectionEnabled,
  deleting,
  selectedRowKeysCount,
  resolvedInsertLabel,
  resolvedBulkUpdateLabel,
  resolvedBulkDeleteLabel,
  onOpenInsert,
  onOpenBulkUpdate,
  onOpenBulkDelete,
}: {
  insert: false | { disabled?: boolean; label?: ReactNode }
  bulkDelete: false | { label?: ReactNode }
  bulkUpdate: false | { label?: ReactNode }
  toolbarActions?: ReactNode
  rowSelectionEnabled: boolean
  deleting: boolean
  selectedRowKeysCount: number
  resolvedInsertLabel: ReactNode
  resolvedBulkUpdateLabel: (count: number) => ReactNode
  resolvedBulkDeleteLabel: (count: number) => ReactNode
  onOpenInsert: () => void
  onOpenBulkUpdate: () => void
  onOpenBulkDelete: () => void
}) {
  if (
    insert === false &&
    bulkDelete === false &&
    bulkUpdate === false &&
    !toolbarActions
  ) {
    return null
  }

  const insertTooltip = insert !== false ? insert.label ?? resolvedInsertLabel : null
  const bulkUpdateTooltip =
    bulkUpdate !== false
      ? bulkUpdate.label ?? resolvedBulkUpdateLabel(selectedRowKeysCount)
      : null
  const bulkDeleteTooltip =
    bulkDelete !== false
      ? bulkDelete.label ?? resolvedBulkDeleteLabel(selectedRowKeysCount)
      : null
  const actionCount =
    (insert !== false ? 1 : 0) +
    (bulkUpdate !== false ? 1 : 0) +
    (bulkDelete !== false && rowSelectionEnabled ? 1 : 0)
  const desktopWidthClass =
    actionCount >= 3
      ? "sm:w-[7.5rem]"
      : actionCount === 2
        ? "sm:w-[5rem]"
        : actionCount === 1
          ? "sm:w-[2.5rem]"
          : "sm:w-auto"

  return (
    <div className={`w-[2.5rem] flex-none self-stretch ${desktopWidthClass}`}>
      <div className="flex h-full w-full items-center justify-center border-l border-border pl-2 sm:pl-4">
        <div className="flex w-full flex-col items-center justify-center gap-1.5 sm:flex-row sm:items-center sm:justify-center sm:gap-1">
          {insert !== false ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  disabled={insert.disabled === true}
                  onClick={onOpenInsert}
                  className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  <span className="sr-only">{insertTooltip}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{insertTooltip}</TooltipContent>
            </Tooltip>
          ) : null}
          {bulkUpdate !== false ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  disabled={selectedRowKeysCount === 0}
                  onClick={onOpenBulkUpdate}
                  className="inline-flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                >
                  <SquarePen aria-hidden="true" className="size-4" />
                  <span className="sr-only">{bulkUpdateTooltip}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{bulkUpdateTooltip}</TooltipContent>
            </Tooltip>
          ) : null}
          {bulkDelete !== false && rowSelectionEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  disabled={selectedRowKeysCount === 0 || deleting}
                  onClick={onOpenBulkDelete}
                  className="inline-flex size-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Trash aria-hidden="true" className="size-4" />
                  <span className="sr-only">{bulkDeleteTooltip}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{bulkDeleteTooltip}</TooltipContent>
            </Tooltip>
          ) : null}
          {toolbarActions}
        </div>
      </div>
    </div>
  )
}

export function DataTableHeader<TQuery extends object>({
  hasAnyQueryFields,
  hasUserQueryFields,
  leadingBuiltInSearchField,
  trailingBuiltInQueryFields,
  queryFields,
  loading,
  insert,
  bulkDelete,
  bulkUpdate,
  toolbarActions,
  rowSelectionEnabled,
  deleting,
  selectedRowKeysCount,
  resolvedResetLabel,
  resolvedRefreshLabel,
  resolvedInsertLabel,
  resolvedBulkUpdateLabel,
  resolvedBulkDeleteLabel,
  renderQueryFieldControl,
  onResetQuery,
  onRetry,
  onOpenInsert,
  onOpenBulkUpdate,
  onOpenBulkDelete,
}: {
  hasAnyQueryFields: boolean
  hasUserQueryFields: boolean
  leadingBuiltInSearchField: DataTableBuiltInQueryField<TQuery> | null
  trailingBuiltInQueryFields: readonly DataTableBuiltInQueryField<TQuery>[]
  queryFields: readonly DataTableQueryField<TQuery>[]
  loading: boolean
  insert: false | { disabled?: boolean; label?: ReactNode }
  bulkDelete: false | { label?: ReactNode }
  bulkUpdate: false | { label?: ReactNode }
  toolbarActions?: ReactNode
  rowSelectionEnabled: boolean
  deleting: boolean
  selectedRowKeysCount: number
  resolvedResetLabel: ReactNode
  resolvedRefreshLabel: ReactNode
  resolvedInsertLabel: ReactNode
  resolvedBulkUpdateLabel: (count: number) => ReactNode
  resolvedBulkDeleteLabel: (count: number) => ReactNode
  renderQueryFieldControl: (field: DataTableQueryField<TQuery>) => ReactNode
  onResetQuery: () => void
  onRetry: () => void
  onOpenInsert: () => void
  onOpenBulkUpdate: () => void
  onOpenBulkDelete: () => void
}) {
  return hasAnyQueryFields ? (
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
                    onClick={onResetQuery}
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
                    onClick={onRetry}
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
                style={getQueryFieldLayoutStyle(field as DataTableQueryField<object>)}
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
                style={getQueryFieldLayoutStyle(field as DataTableQueryField<object>)}
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

      <ToolbarActions
        insert={insert}
        bulkDelete={bulkDelete}
        bulkUpdate={bulkUpdate}
        toolbarActions={toolbarActions}
        rowSelectionEnabled={rowSelectionEnabled}
        deleting={deleting}
        selectedRowKeysCount={selectedRowKeysCount}
        resolvedInsertLabel={resolvedInsertLabel}
        resolvedBulkUpdateLabel={resolvedBulkUpdateLabel}
        resolvedBulkDeleteLabel={resolvedBulkDeleteLabel}
        onOpenInsert={onOpenInsert}
        onOpenBulkUpdate={onOpenBulkUpdate}
        onOpenBulkDelete={onOpenBulkDelete}
      />
    </div>
  ) : (
    <div className="flex items-start justify-between gap-4 border border-cyan-500">
      <div className="flex min-w-0 flex-1 items-center gap-3 border border-amber-500">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              disabled={loading}
              onClick={onRetry}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <RefreshCw aria-hidden="true" className="size-4.5" />
              <span className="sr-only">{resolvedRefreshLabel}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>{resolvedRefreshLabel}</TooltipContent>
        </Tooltip>
      </div>

      <ToolbarActions
        insert={insert}
        bulkDelete={bulkDelete}
        bulkUpdate={bulkUpdate}
        toolbarActions={toolbarActions}
        rowSelectionEnabled={rowSelectionEnabled}
        deleting={deleting}
        selectedRowKeysCount={selectedRowKeysCount}
        resolvedInsertLabel={resolvedInsertLabel}
        resolvedBulkUpdateLabel={resolvedBulkUpdateLabel}
        resolvedBulkDeleteLabel={resolvedBulkDeleteLabel}
        onOpenInsert={onOpenInsert}
        onOpenBulkUpdate={onOpenBulkUpdate}
        onOpenBulkDelete={onOpenBulkDelete}
      />
    </div>
  )
}
