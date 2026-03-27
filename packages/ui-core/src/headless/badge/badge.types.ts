export type BadgeClassNameMode = "merge" | "replace"

export type BadgeClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
