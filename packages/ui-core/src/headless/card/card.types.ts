export type CardClassNameMode = "merge" | "replace"

export type CardClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
