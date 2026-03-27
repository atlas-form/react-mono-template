import { Slot } from "radix-ui"

import { cn } from "@workspace/ui-core/lib/utils"
import { buttonVariants } from "./button.styles"
import type {
  ButtonClassResolver,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./button.types"

function resolveButtonClassName({
  className,
  variant,
  size,
  unstyled,
  classNameMode,
  classResolver,
}: {
  className?: string
  variant: ButtonVariant
  size: ButtonSize
  unstyled: boolean
  classNameMode: "merge" | "replace"
  classResolver?: ButtonClassResolver
}) {
  if (unstyled) {
    return className
  }

  const defaultClassName = buttonVariants({ variant, size })

  if (classResolver) {
    return classResolver({
      variant,
      size,
      defaultClassName,
      className,
    })
  }

  if (classNameMode === "replace") {
    return className ?? defaultClassName
  }

  return cn(defaultClassName, className)
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const resolvedVariant = (variant ?? "default") as ButtonVariant
  const resolvedSize = (size ?? "default") as ButtonSize
  const resolvedClassName = resolveButtonClassName({
    className,
    variant: resolvedVariant,
    size: resolvedSize,
    unstyled,
    classNameMode,
    classResolver,
  })

  return (
    <Comp
      data-slot="button"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={resolvedClassName}
      {...props}
    />
  )
}
