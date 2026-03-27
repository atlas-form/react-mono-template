import * as React from "react"

import { cn } from "@workspace/ui-core/lib/utils"
import {
  alertActionClassName,
  alertDescriptionClassName,
  alertTitleClassName,
  alertVariants,
} from "./alert.styles"
import type {
  AlertActionProps,
  AlertClassResolver,
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
  AlertVariant,
} from "./alert.types"

function resolveClassName({
  className,
  defaultClassName,
  unstyled,
  classNameMode,
  classResolver,
}: {
  className?: string
  defaultClassName: string
  unstyled: boolean
  classNameMode: "merge" | "replace"
  classResolver?: (params: {
    defaultClassName: string
    className?: string
  }) => string
}) {
  if (unstyled) {
    return className
  }

  if (classResolver) {
    return classResolver({ defaultClassName, className })
  }

  if (classNameMode === "replace") {
    return className ?? defaultClassName
  }

  return cn(defaultClassName, className)
}

function resolveAlertClassName({
  className,
  variant,
  unstyled,
  classNameMode,
  classResolver,
}: {
  className?: string
  variant: AlertVariant
  unstyled: boolean
  classNameMode: "merge" | "replace"
  classResolver?: AlertClassResolver
}) {
  const defaultClassName = alertVariants({ variant })

  if (unstyled) {
    return className
  }

  if (classResolver) {
    return classResolver({ variant, defaultClassName, className })
  }

  if (classNameMode === "replace") {
    return className ?? defaultClassName
  }

  return cn(defaultClassName, className)
}

function Alert({
  className,
  variant = "default",
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: AlertProps) {
  const resolvedVariant = (variant ?? "default") as AlertVariant
  return (
    <div
      data-slot="alert"
      data-variant={resolvedVariant}
      role="alert"
      className={resolveAlertClassName({
        className,
        variant: resolvedVariant,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

function AlertTitle({
  className,
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={resolveClassName({
        className,
        defaultClassName: alertTitleClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={resolveClassName({
        className,
        defaultClassName: alertDescriptionClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

function AlertAction({
  className,
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: AlertActionProps) {
  return (
    <div
      data-slot="alert-action"
      className={resolveClassName({
        className,
        defaultClassName: alertActionClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
