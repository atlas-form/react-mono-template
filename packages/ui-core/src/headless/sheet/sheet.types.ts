export type SheetClassNameMode = "merge" | "replace"

export type SheetClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
