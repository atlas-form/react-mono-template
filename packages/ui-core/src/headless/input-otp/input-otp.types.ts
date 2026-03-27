export type InputOtpClassNameMode = "merge" | "replace"

export type InputOtpClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
