export type ToggleClassNameMode = "merge" | "replace"

export type ToggleClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
