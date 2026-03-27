import {
  Button as HeadlessButton,
  type StyledButtonProps as HeadlessStyledButtonProps,
} from "@workspace/ui-core/components/button"

const toneToVariant = {
  primary: { variant: "solid", color: "primary" },
  secondary: { variant: "solid", color: "secondary" },
  subtle: { variant: "outline", color: "secondary" },
} as const

export type ButtonTone = keyof typeof toneToVariant

export type ButtonProps = Omit<HeadlessStyledButtonProps, "variant" | "color"> & {
  tone?: ButtonTone
}

export function Button({ tone = "primary", ...props }: ButtonProps) {
  const mapped = toneToVariant[tone]
  return <HeadlessButton variant={mapped.variant} color={mapped.color} {...props} />
}
