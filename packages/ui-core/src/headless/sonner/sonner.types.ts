export type SonnerClassNameMode = "merge" | "replace"

export type SonnerClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
