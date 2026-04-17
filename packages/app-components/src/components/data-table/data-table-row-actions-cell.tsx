import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui-components"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui-core/components/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState, type ReactNode } from "react"

import type {
  DataTableRowActionItem,
  DataTableRowActionsConfig,
} from "./data-table.types"
import {
  resolveRowActionContent,
  resolveRowActionDisabled,
} from "./data-table.utils"

export function DataTableRowActionsCell<T>({
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
