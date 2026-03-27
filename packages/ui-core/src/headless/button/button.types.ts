import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { buttonVariants } from "./button.styles"

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
export type ButtonVariant = NonNullable<ButtonVariantProps["variant"]>
export type ButtonSize = NonNullable<ButtonVariantProps["size"]>

export type ButtonClassResolver = (params: {
  variant: ButtonVariant
  size: ButtonSize
  defaultClassName: string
  className?: string
}) => string

export type ButtonProps = React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean
    unstyled?: boolean
    classNameMode?: "merge" | "replace"
    classResolver?: ButtonClassResolver
  }
