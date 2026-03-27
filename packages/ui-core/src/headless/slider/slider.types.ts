export type SliderClassNameMode = "merge" | "replace"

export type SliderClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
