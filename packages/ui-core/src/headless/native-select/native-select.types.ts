export type NativeSelectClassNameMode = "merge" | "replace"

export type NativeSelectClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string
