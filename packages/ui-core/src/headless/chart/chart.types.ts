export type ChartClassNameMode = "merge" | "replace"

export type ChartClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
