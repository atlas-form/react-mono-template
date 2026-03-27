export type AvatarClassNameMode = "merge" | "replace"

export type AvatarClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
