export type AspectRatioClassNameMode = "merge" | "replace"

export type AspectRatioClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
