export type CheckboxClassNameMode = "merge" | "replace"

export type CheckboxClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
