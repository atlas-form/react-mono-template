export type SpinnerClassNameMode = "merge" | "replace"

export type SpinnerClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
