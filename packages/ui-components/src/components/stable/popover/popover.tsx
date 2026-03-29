import type { ComponentProps } from "react"
import {
  Popover as CorePopover,
  PopoverAnchor as CorePopoverAnchor,
  PopoverContent as CorePopoverContent,
  PopoverDescription as CorePopoverDescription,
  PopoverHeader as CorePopoverHeader,
  PopoverTitle as CorePopoverTitle,
  PopoverTrigger as CorePopoverTrigger,
} from "@workspace/ui-core/components/popover"

export type PopoverProps = ComponentProps<typeof CorePopover>
export type PopoverTriggerProps = ComponentProps<typeof CorePopoverTrigger>
export type PopoverAnchorProps = ComponentProps<typeof CorePopoverAnchor>
export type PopoverContentProps = ComponentProps<typeof CorePopoverContent>
export type PopoverHeaderProps = ComponentProps<typeof CorePopoverHeader>
export type PopoverTitleProps = ComponentProps<typeof CorePopoverTitle>
export type PopoverDescriptionProps = ComponentProps<typeof CorePopoverDescription>

export function Popover(props: PopoverProps) {
  return <CorePopover {...props} />
}

export function PopoverTrigger(props: PopoverTriggerProps) {
  return <CorePopoverTrigger {...props} />
}

export function PopoverAnchor(props: PopoverAnchorProps) {
  return <CorePopoverAnchor {...props} />
}

export function PopoverContent(props: PopoverContentProps) {
  return <CorePopoverContent {...props} />
}

export function PopoverHeader(props: PopoverHeaderProps) {
  return <CorePopoverHeader {...props} />
}

export function PopoverTitle(props: PopoverTitleProps) {
  return <CorePopoverTitle {...props} />
}

export function PopoverDescription(props: PopoverDescriptionProps) {
  return <CorePopoverDescription {...props} />
}
