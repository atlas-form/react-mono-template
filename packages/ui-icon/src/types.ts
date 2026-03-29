export type SemanticIconName =
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

export type IconName = SemanticIconName | (string & {})

export type IconProps = {
  name: IconName
  size?: number
  className?: string
} & Record<string, unknown>
