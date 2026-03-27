import * as React from "react"
import { Separator } from "@workspace/ui-core/headless/separator"

export type ButtonGroupOrientation = "horizontal" | "vertical"

export type ButtonGroupClassResolver = (params: {
  orientation: ButtonGroupOrientation
  defaultClassName: string
  className?: string
}) => string

export type ButtonGroupSlotClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string

export type ButtonGroupProps = React.ComponentProps<"div"> & {
  orientation?: ButtonGroupOrientation
  unstyled?: boolean
  classNameMode?: "merge" | "replace"
  classResolver?: ButtonGroupClassResolver
}

export type ButtonGroupTextProps = React.ComponentProps<"div"> & {
  asChild?: boolean
  unstyled?: boolean
  classNameMode?: "merge" | "replace"
  classResolver?: ButtonGroupSlotClassResolver
}

export type ButtonGroupSeparatorProps = React.ComponentProps<
  typeof Separator
> & {
  unstyled?: boolean
  classNameMode?: "merge" | "replace"
  classResolver?: ButtonGroupSlotClassResolver
}
