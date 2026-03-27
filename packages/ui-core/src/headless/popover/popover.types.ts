export type PopoverClassNameMode = "merge" | "replace"

export type PopoverClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
