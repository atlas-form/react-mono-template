import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  Ellipsis,
  Info,
  Loader2,
  Minus,
  OctagonX,
  PanelLeft,
  Plus,
  Search,
  SquarePen,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react"
import type { ComponentType } from "react"

import type { SemanticIconName } from "../types"

export type LucideIconComponent = ComponentType<{
  size?: number
  className?: string
} & Record<string, unknown>>

export const lucideComponentsByName = {
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "circle-check": CircleCheck,
  ellipsis: Ellipsis,
  info: Info,
  "loader-2": Loader2,
  minus: Minus,
  "octagon-x": OctagonX,
  "panel-left": PanelLeft,
  plus: Plus,
  search: Search,
  "square-pen": SquarePen,
  "trash-2": Trash2,
  "triangle-alert": TriangleAlert,
  x: X,
} as const satisfies Record<string, LucideIconComponent>

export type LucideIconName = keyof typeof lucideComponentsByName

export const lucideSemanticAliases: Partial<
  Record<SemanticIconName, readonly LucideIconName[]>
> = {
  add: ["plus"],
  edit: ["square-pen"],
  delete: ["trash-2"],
  "more-horizontal": ["ellipsis"],
}
