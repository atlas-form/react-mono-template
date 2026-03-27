export type DrawerClassNameMode = "merge" | "replace"

export type DrawerClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
