import type { ComponentProps } from "react"
import {
  Dialog as HeadlessDialog,
  DialogClose as HeadlessDialogClose,
  DialogContent as HeadlessDialogContent,
  DialogDescription as HeadlessDialogDescription,
  DialogFooter as HeadlessDialogFooter,
  DialogHeader as HeadlessDialogHeader,
  DialogOverlay as HeadlessDialogOverlay,
  DialogPortal as HeadlessDialogPortal,
  DialogTitle as HeadlessDialogTitle,
  DialogTrigger as HeadlessDialogTrigger,
} from "@workspace/ui-core/components/dialog"

export type DialogProps = ComponentProps<typeof HeadlessDialog>
export type DialogTriggerProps = ComponentProps<typeof HeadlessDialogTrigger>
export type DialogPortalProps = ComponentProps<typeof HeadlessDialogPortal>
export type DialogOverlayProps = ComponentProps<typeof HeadlessDialogOverlay>
export type DialogContentProps = ComponentProps<typeof HeadlessDialogContent>
export type DialogHeaderProps = ComponentProps<typeof HeadlessDialogHeader>
export type DialogFooterProps = ComponentProps<typeof HeadlessDialogFooter>
export type DialogTitleProps = ComponentProps<typeof HeadlessDialogTitle>
export type DialogDescriptionProps = ComponentProps<typeof HeadlessDialogDescription>
export type DialogCloseProps = ComponentProps<typeof HeadlessDialogClose>

export function Dialog(props: DialogProps) {
  return <HeadlessDialog {...props} />
}

export function DialogTrigger(props: DialogTriggerProps) {
  return <HeadlessDialogTrigger {...props} />
}

export function DialogPortal(props: DialogPortalProps) {
  return <HeadlessDialogPortal {...props} />
}

export function DialogOverlay(props: DialogOverlayProps) {
  return <HeadlessDialogOverlay {...props} />
}

export function DialogContent(props: DialogContentProps) {
  return <HeadlessDialogContent {...props} />
}

export function DialogHeader(props: DialogHeaderProps) {
  return <HeadlessDialogHeader {...props} />
}

export function DialogFooter(props: DialogFooterProps) {
  return <HeadlessDialogFooter {...props} />
}

export function DialogTitle(props: DialogTitleProps) {
  return <HeadlessDialogTitle {...props} />
}

export function DialogDescription(props: DialogDescriptionProps) {
  return <HeadlessDialogDescription {...props} />
}

export function DialogClose(props: DialogCloseProps) {
  return <HeadlessDialogClose {...props} />
}
