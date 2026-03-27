export type ScrollAreaClassNameMode = "merge" | "replace"

export type ScrollAreaClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
