export type TextareaClassNameMode = "merge" | "replace"

export type TextareaClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
