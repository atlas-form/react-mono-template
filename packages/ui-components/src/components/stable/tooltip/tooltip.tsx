import type { ReactNode } from "react"
import {
  Tooltip as CoreTooltip,
  TooltipContent as CoreTooltipContent,
  TooltipProvider as CoreTooltipProvider,
  TooltipTrigger as CoreTooltipTrigger,
} from "@workspace/ui-core/components/tooltip"

export interface TooltipProviderProps {
  children: ReactNode
  delayDuration?: number
}

export interface TooltipProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export interface TooltipTriggerProps {
  children: ReactNode
}

export type TooltipSide = "top" | "right" | "bottom" | "left"

export interface TooltipContentProps {
  children: ReactNode
  side?: TooltipSide
}

export function TooltipProvider({
  children,
  delayDuration = 200,
}: TooltipProviderProps) {
  return <CoreTooltipProvider delayDuration={delayDuration}>{children}</CoreTooltipProvider>
}

export function Tooltip({ open, onOpenChange, children }: TooltipProps) {
  return (
    <CoreTooltip open={open} onOpenChange={onOpenChange}>
      {children}
    </CoreTooltip>
  )
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  return <CoreTooltipTrigger>{children}</CoreTooltipTrigger>
}

export function TooltipContent({
  children,
  side = "top",
}: TooltipContentProps) {
  return <CoreTooltipContent side={side}>{children}</CoreTooltipContent>
}
