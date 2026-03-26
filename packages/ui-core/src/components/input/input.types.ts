import * as React from "react"

export type InputClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string

export type InputProps = React.ComponentProps<"input"> & {
  unstyled?: boolean
  classNameMode?: "merge" | "replace"
  classResolver?: InputClassResolver
}
