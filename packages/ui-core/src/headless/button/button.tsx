import { Slot } from "radix-ui"

import { DEFAULT_MODE, type BaseMode } from "../../lib/component-mode"
import { cn } from "../../lib/utils"
import { buttonVariants } from "./button.styles"
import type {
  ButtonClassResolver,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./button.types"

function resolveStyledClassName({
  className,
  variant,
  size,
  classNameMode,
  classResolver,
}: {
  className?: string
  variant: ButtonVariant
  size: ButtonSize
  classNameMode: "merge" | "replace"
  classResolver?: ButtonClassResolver
}) {
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
  mode = DEFAULT_MODE,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const resolvedMode: BaseMode = mode

  if (resolvedMode === "headless") {
    const {
      className,
      variant: _variant,
      size: _size,
      classNameMode: _classNameMode,
      classResolver: _classResolver,
      ...rest
    } = props
    return <Comp className={className} {...rest} />
  }

  const {
    className,
    variant = "default",
    size = "default",
    classNameMode = "merge",
    classResolver,
    ...styledProps
  } = props
  const resolvedVariant = (variant ?? "default") as ButtonVariant
  const resolvedSize = (size ?? "default") as ButtonSize
  const resolvedClassName = resolveStyledClassName({
    className,
    variant: resolvedVariant,
    size: resolvedSize,
    classNameMode,
    classResolver,
  })

  return (
    <Comp
      data-slot="button"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={resolvedClassName}
      {...styledProps}
    />
  )
}
