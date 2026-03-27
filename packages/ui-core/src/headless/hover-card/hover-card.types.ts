export type HoverCardClassNameMode = "merge" | "replace"

export type HoverCardClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
