export type CollapsibleClassNameMode = "merge" | "replace"

export type CollapsibleClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
