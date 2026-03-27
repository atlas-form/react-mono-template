export type NavigationMenuClassNameMode = "merge" | "replace"

export type NavigationMenuClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
