export type ProgressClassNameMode = "merge" | "replace"

export type ProgressClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
