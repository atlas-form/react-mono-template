export type ButtonGroupClassNameMode = "merge" | "replace"

export type ButtonGroupClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
