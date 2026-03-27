import type { ComponentType } from "react"

export type IconName =
  | "add"
  | "edit"
  | "delete"
  | "arrow-right"
  | "arrow-left"
  | "arrow-down"
  | "arrow-up"
  | "check"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "chevron-up"
  | "more-horizontal"
  | "x"
  | "search"
  | "minus"
  | "loader-2"
  | "panel-left"
  | "circle-check"
  | "info"
  | "triangle-alert"
  | "octagon-x"

export type IconProvider = "lucide" | "heroicons"

export type IconProps = {
  name: IconName
  size?: number
  className?: string
  provider?: IconProvider
} & Record<string, unknown>

export type IconComponent = ComponentType<{
  size?: number
  className?: string
} & Record<string, unknown>>

export type IconMap = Partial<Record<IconName, IconComponent>>
