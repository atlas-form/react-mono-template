import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>
export type SelectClassNameMode = "merge" | "replace"

export type SelectClassResolver = (params: {
  defaultClassName: string
  className?: string
}) => string

export type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group> & {
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
}

export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>

export type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
> & {
  size?: "sm" | "default"
  variant?: "default" | "primary" | "destructive"
  hideIndicator?: boolean
  indicator?: React.ReactNode
  indicatorClassName?: string
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: (params: {
    defaultClassName: string
    className?: string
    size: "sm" | "default"
    variant: "default" | "primary" | "destructive"
  }) => string
  indicatorClassResolver?: SelectClassResolver
}

export type SelectContentProps = React.ComponentProps<
  typeof SelectPrimitive.Content
> & {
  variant?: "default" | "primary" | "destructive"
  showScrollButtons?: boolean
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: (params: {
    defaultClassName: string
    className?: string
    position: React.ComponentProps<typeof SelectPrimitive.Content>["position"]
    variant: "default" | "primary" | "destructive"
  }) => string
}

export type SelectLabelProps = React.ComponentProps<
  typeof SelectPrimitive.Label
> & {
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
}

export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item> & {
  variant?: "default" | "primary" | "destructive"
  hideIndicator?: boolean
  indicator?: React.ReactNode
  indicatorContainerClassName?: string
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
  indicatorContainerClassResolver?: SelectClassResolver
}

export type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
> & {
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
}

export type SelectScrollUpButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
> & {
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
}

export type SelectScrollDownButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
> & {
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
}
