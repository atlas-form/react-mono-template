export type SkeletonClassNameMode = "merge" | "replace"

export type SkeletonClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
