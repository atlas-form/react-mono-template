import type { MouseEventHandler, ReactNode } from "react"
import { Button as CoreButton } from "@workspace/ui-core/components/button"
import { cn } from "@workspace/ui-core/lib/utils.js"

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"

export type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon"

export type ButtonType = "button" | "submit" | "reset"

const BUTTON_VARIANT_MAP = {
  default: "default",
  primary: "primary",
  secondary: "secondary",
  destructive: "destructive",
  outline: "outline",
  ghost: "ghost",
  link: "link",
} as const

const BUTTON_SIZE_MAP = {
  default: "default",
  xs: "xs",
  sm: "sm",
  lg: "lg",
  icon: "icon",
} as const

export interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  type?: ButtonType
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Button({
  children,
  variant = "default",
  size = "default",
  fullWidth = false,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <CoreButton
      variant={BUTTON_VARIANT_MAP[variant]}
      size={BUTTON_SIZE_MAP[size]}
      className={cn(fullWidth && "w-full")}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </CoreButton>
  )
}
