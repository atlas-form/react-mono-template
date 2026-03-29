import type { ComponentProps } from "react"
import {
  Tooltip as CoreTooltip,
  TooltipContent as CoreTooltipContent,
  TooltipProvider as CoreTooltipProvider,
  TooltipTrigger as CoreTooltipTrigger,
} from "@workspace/ui-core/components/tooltip"

export type TooltipProviderProps = ComponentProps<typeof CoreTooltipProvider>
export type TooltipProps = ComponentProps<typeof CoreTooltip>
export type TooltipTriggerProps = ComponentProps<typeof CoreTooltipTrigger>
export type TooltipContentProps = ComponentProps<typeof CoreTooltipContent>

export function TooltipProvider(props: TooltipProviderProps) {
  return <CoreTooltipProvider {...props} />
}

export function Tooltip(props: TooltipProps) {
  return <CoreTooltip {...props} />
}

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <CoreTooltipTrigger {...props} />
}

export function TooltipContent(props: TooltipContentProps) {
  return <CoreTooltipContent {...props} />
}
