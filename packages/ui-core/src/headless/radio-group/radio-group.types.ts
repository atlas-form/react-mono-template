export type RadioGroupClassNameMode = "merge" | "replace"

export type RadioGroupClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
