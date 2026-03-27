import { Slot } from "radix-ui"

import { DEFAULT_MODE, type BaseMode } from "../../lib/component-mode"
import { cn } from "../../lib/utils"
import { buttonVariants } from "./button.styles"
import type {
  ButtonClassResolver,
  ButtonColor,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./button.types"

function resolveStyledClassName({
  className,
  variant,
  color,
  size,
  classNameMode,
  classResolver,
}: {
  className?: string
  variant: ButtonVariant
  color: ButtonColor
  size: ButtonSize
  classNameMode: "merge" | "replace"
  classResolver?: ButtonClassResolver
}) {
  const defaultClassName = buttonVariants({ variant, color, size })

  if (classResolver) {
    return classResolver({
      variant,
      color,
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
      color: _color,
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
    color = "default",
    size = "default",
    classNameMode = "merge",
    classResolver,
    ...styledProps
  } = props
  const resolvedVariant = (variant ?? "default") as ButtonVariant
  const resolvedColor = (color ?? "default") as ButtonColor
  const resolvedSize = (size ?? "default") as ButtonSize
  const resolvedClassName = resolveStyledClassName({
    className,
    variant: resolvedVariant,
    color: resolvedColor,
    size: resolvedSize,
    classNameMode,
    classResolver,
  })

  return (
    <Comp
      data-slot="button"
      data-variant={resolvedVariant}
      data-color={resolvedColor}
      data-size={resolvedSize}
      className={resolvedClassName}
      {...styledProps}
    />
  )
}
