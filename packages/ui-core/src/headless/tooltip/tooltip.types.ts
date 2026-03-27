export type TooltipClassNameMode = "merge" | "replace"

export type TooltipClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
