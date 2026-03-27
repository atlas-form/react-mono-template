export type LabelClassNameMode = "merge" | "replace"

export type LabelClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
