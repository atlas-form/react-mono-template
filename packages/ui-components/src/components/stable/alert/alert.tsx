import type { ReactNode } from "react"
import {
  Alert as HeadlessAlert,
  AlertDescription as HeadlessAlertDescription,
  AlertTitle as HeadlessAlertTitle,
} from "@workspace/ui-core/components/alert"

export type AlertVariant = "default" | "success" | "warning" | "error"

export type AlertProps = {
  variant?: AlertVariant
  title?: ReactNode
  description?: ReactNode
}

export function Alert({ variant = "default", title, description }: AlertProps) {
  return (
    <HeadlessAlert variant={variant}>
      {title && <HeadlessAlertTitle>{title}</HeadlessAlertTitle>}
      {description && (
        <HeadlessAlertDescription>{description}</HeadlessAlertDescription>
      )}
    </HeadlessAlert>
  )
}
