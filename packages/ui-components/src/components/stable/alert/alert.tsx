import type { ComponentProps } from "react"
import {
  Alert as HeadlessAlert,
  type AlertProps as HeadlessAlertProps,
  AlertAction as HeadlessAlertAction,
  AlertDescription as HeadlessAlertDescription,
  AlertTitle as HeadlessAlertTitle,
} from "@workspace/ui-core/components/alert"

export type AlertVariant = "info" | "success" | "warning" | "error"

export type AlertProps = Omit<HeadlessAlertProps, "variant"> & {
  variant?: AlertVariant
}
export type AlertTitleProps = ComponentProps<typeof HeadlessAlertTitle>
export type AlertDescriptionProps = ComponentProps<
  typeof HeadlessAlertDescription
>
export type AlertActionProps = ComponentProps<typeof HeadlessAlertAction>

const ALERT_VARIANT_CLASSNAME: Record<AlertVariant, string> = {
  info: "text-[var(--info,var(--primary))] border-[color-mix(in_oklab,var(--info,var(--primary))_35%,var(--border))] bg-[color-mix(in_oklab,var(--info,var(--primary))_12%,var(--card))]",
  success:
    "text-[var(--success,var(--primary))] border-[color-mix(in_oklab,var(--success,var(--primary))_35%,var(--border))] bg-[color-mix(in_oklab,var(--success,var(--primary))_12%,var(--card))]",
  warning:
    "text-[var(--warning,var(--primary))] border-[color-mix(in_oklab,var(--warning,var(--primary))_35%,var(--border))] bg-[color-mix(in_oklab,var(--warning,var(--primary))_12%,var(--card))]",
  error:
    "text-[var(--error,var(--destructive))] border-[color-mix(in_oklab,var(--error,var(--destructive))_35%,var(--border))] bg-[color-mix(in_oklab,var(--error,var(--destructive))_12%,var(--card))]",
}

export function Alert({ variant = "info", className, ...props }: AlertProps) {
  const mergedClassName = [ALERT_VARIANT_CLASSNAME[variant], className]
    .filter(Boolean)
    .join(" ")

  return (
    <HeadlessAlert {...props} variant="default" className={mergedClassName} />
  )
}

export function AlertTitle(props: AlertTitleProps) {
  return <HeadlessAlertTitle {...props} />
}

export function AlertDescription(props: AlertDescriptionProps) {
  return <HeadlessAlertDescription {...props} />
}

export function AlertAction(props: AlertActionProps) {
  return <HeadlessAlertAction {...props} />
}
