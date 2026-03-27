export type SeparatorClassNameMode = "merge" | "replace"

export type SeparatorClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
