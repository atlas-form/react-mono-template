export type ContextMenuClassNameMode = "merge" | "replace"

export type ContextMenuClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
