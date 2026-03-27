export type TableClassNameMode = "merge" | "replace"

export type TableClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
