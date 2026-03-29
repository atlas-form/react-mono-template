import type { ComponentProps } from "react"
import {
  Tooltip as HeadlessTooltip,
  TooltipContent as HeadlessTooltipContent,
  TooltipProvider as HeadlessTooltipProvider,
  TooltipTrigger as HeadlessTooltipTrigger,
} from "@workspace/ui-core/components/tooltip"

export type TooltipProviderProps = ComponentProps<typeof HeadlessTooltipProvider>
export type TooltipProps = ComponentProps<typeof HeadlessTooltip>
export type TooltipTriggerProps = ComponentProps<typeof HeadlessTooltipTrigger>
export type TooltipContentProps = ComponentProps<typeof HeadlessTooltipContent>

export function TooltipProvider(props: TooltipProviderProps) {
  return <HeadlessTooltipProvider {...props} />
}

export function Tooltip(props: TooltipProps) {
  return <HeadlessTooltip {...props} />
}

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <HeadlessTooltipTrigger {...props} />
}

export function TooltipContent(props: TooltipContentProps) {
  return <HeadlessTooltipContent {...props} />
}
