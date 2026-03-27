export type ResizableClassNameMode = "merge" | "replace"

export type ResizableClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
