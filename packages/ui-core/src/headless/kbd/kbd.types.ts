export type KbdClassNameMode = "merge" | "replace"

export type KbdClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
