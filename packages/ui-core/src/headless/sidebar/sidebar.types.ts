export type SidebarClassNameMode = "merge" | "replace"

export type SidebarClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
