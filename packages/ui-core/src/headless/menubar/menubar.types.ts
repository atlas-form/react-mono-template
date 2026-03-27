export type MenubarClassNameMode = "merge" | "replace"

export type MenubarClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
