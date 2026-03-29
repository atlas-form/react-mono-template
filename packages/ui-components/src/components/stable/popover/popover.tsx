import type { ComponentProps } from "react"
import {
  Popover as HeadlessPopover,
  PopoverAnchor as HeadlessPopoverAnchor,
  PopoverContent as HeadlessPopoverContent,
  PopoverDescription as HeadlessPopoverDescription,
  PopoverHeader as HeadlessPopoverHeader,
  PopoverTitle as HeadlessPopoverTitle,
  PopoverTrigger as HeadlessPopoverTrigger,
} from "@workspace/ui-core/components/popover"

export type PopoverProps = ComponentProps<typeof HeadlessPopover>
export type PopoverTriggerProps = ComponentProps<typeof HeadlessPopoverTrigger>
export type PopoverAnchorProps = ComponentProps<typeof HeadlessPopoverAnchor>
export type PopoverContentProps = ComponentProps<typeof HeadlessPopoverContent>
export type PopoverHeaderProps = ComponentProps<typeof HeadlessPopoverHeader>
export type PopoverTitleProps = ComponentProps<typeof HeadlessPopoverTitle>
export type PopoverDescriptionProps = ComponentProps<typeof HeadlessPopoverDescription>

export function Popover(props: PopoverProps) {
  return <HeadlessPopover {...props} />
}

export function PopoverTrigger(props: PopoverTriggerProps) {
  return <HeadlessPopoverTrigger {...props} />
}

export function PopoverAnchor(props: PopoverAnchorProps) {
  return <HeadlessPopoverAnchor {...props} />
}

export function PopoverContent(props: PopoverContentProps) {
  return <HeadlessPopoverContent {...props} />
}

export function PopoverHeader(props: PopoverHeaderProps) {
  return <HeadlessPopoverHeader {...props} />
}

export function PopoverTitle(props: PopoverTitleProps) {
  return <HeadlessPopoverTitle {...props} />
}

export function PopoverDescription(props: PopoverDescriptionProps) {
  return <HeadlessPopoverDescription {...props} />
}
