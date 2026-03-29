import type { ComponentProps } from "react"
import {
  Dialog as CoreDialog,
  DialogClose as CoreDialogClose,
  DialogContent as CoreDialogContent,
  DialogDescription as CoreDialogDescription,
  DialogFooter as CoreDialogFooter,
  DialogHeader as CoreDialogHeader,
  DialogOverlay as CoreDialogOverlay,
  DialogPortal as CoreDialogPortal,
  DialogTitle as CoreDialogTitle,
  DialogTrigger as CoreDialogTrigger,
} from "@workspace/ui-core/components/dialog"

export type DialogProps = ComponentProps<typeof CoreDialog>
export type DialogTriggerProps = ComponentProps<typeof CoreDialogTrigger>
export type DialogPortalProps = ComponentProps<typeof CoreDialogPortal>
export type DialogOverlayProps = ComponentProps<typeof CoreDialogOverlay>
export type DialogContentProps = ComponentProps<typeof CoreDialogContent>
export type DialogHeaderProps = ComponentProps<typeof CoreDialogHeader>
export type DialogFooterProps = ComponentProps<typeof CoreDialogFooter>
export type DialogTitleProps = ComponentProps<typeof CoreDialogTitle>
export type DialogDescriptionProps = ComponentProps<typeof CoreDialogDescription>
export type DialogCloseProps = ComponentProps<typeof CoreDialogClose>

export function Dialog(props: DialogProps) {
  return <CoreDialog {...props} />
}

export function DialogTrigger(props: DialogTriggerProps) {
  return <CoreDialogTrigger {...props} />
}

export function DialogPortal(props: DialogPortalProps) {
  return <CoreDialogPortal {...props} />
}

export function DialogOverlay(props: DialogOverlayProps) {
  return <CoreDialogOverlay {...props} />
}

export function DialogContent(props: DialogContentProps) {
  return <CoreDialogContent {...props} />
}

export function DialogHeader(props: DialogHeaderProps) {
  return <CoreDialogHeader {...props} />
}

export function DialogFooter(props: DialogFooterProps) {
  return <CoreDialogFooter {...props} />
}

export function DialogTitle(props: DialogTitleProps) {
  return <CoreDialogTitle {...props} />
}

export function DialogDescription(props: DialogDescriptionProps) {
  return <CoreDialogDescription {...props} />
}

export function DialogClose(props: DialogCloseProps) {
  return <CoreDialogClose {...props} />
}
