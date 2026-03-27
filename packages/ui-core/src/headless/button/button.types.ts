import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { buttonVariants } from "./button.styles"

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
export type ButtonVariant = NonNullable<ButtonVariantProps["variant"]>
export type ButtonColor = NonNullable<ButtonVariantProps["color"]>
export type ButtonSize = NonNullable<ButtonVariantProps["size"]>

export type ButtonClassResolver = (params: {
  variant: ButtonVariant
  color: ButtonColor
  size: ButtonSize
  defaultClassName: string
  className?: string
}) => string

type ButtonBaseProps = React.ComponentProps<"button"> & {
  asChild?: boolean
}

export type StyledButtonProps = ButtonBaseProps &
  ButtonVariantProps & {
    mode?: "styled"
    classNameMode?: "merge" | "replace"
    classResolver?: ButtonClassResolver
  }

export type HeadlessButtonProps = ButtonBaseProps & {
  mode: "headless"
  variant?: never
  color?: never
  size?: never
  classNameMode?: never
  classResolver?: never
}

export type ButtonProps = StyledButtonProps | HeadlessButtonProps
