export type DropdownMenuClassNameMode = "merge" | "replace"

export type DropdownMenuClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
