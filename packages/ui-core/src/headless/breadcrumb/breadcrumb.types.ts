export type BreadcrumbClassNameMode = "merge" | "replace"

export type BreadcrumbClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
