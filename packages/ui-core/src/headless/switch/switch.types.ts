export type SwitchClassNameMode = "merge" | "replace"

export type SwitchClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
