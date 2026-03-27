export type TabsClassNameMode = "merge" | "replace"

export type TabsClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
