import type { ComponentType } from "react"

export type IconName =
  | "add"
  | "edit"
  | "delete"
  | "arrow-right"
  | "arrow-down"
  | "arrow-up"
  | "check"

export type IconProvider = "lucide" | "heroicons"

export type IconProps = {
  name: IconName
  size?: number
  className?: string
  provider?: IconProvider
}

export type IconComponent = ComponentType<{
  size?: number
  className?: string
}>

export type IconMap = Partial<Record<IconName, IconComponent>>
