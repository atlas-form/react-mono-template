import * as React from "react"

import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@workspace/ui-core/components/button"

const toneToVariant = {
  primary: "default",
  secondary: "secondary",
  subtle: "outline",
} as const

export type ButtonTone = keyof typeof toneToVariant

export type ButtonProps = Omit<HeadlessButtonProps, "variant"> & {
  tone?: ButtonTone
}

export function Button({ tone = "primary", ...props }: ButtonProps) {
  return <HeadlessButton variant={toneToVariant[tone]} {...props} />
}
