export type EmptyClassNameMode = "merge" | "replace"

export type EmptyClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
