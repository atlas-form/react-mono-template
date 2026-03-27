import { Slot } from "radix-ui"

import { cn } from "@workspace/ui-core/lib/utils"
import { Separator } from "@workspace/ui-core/headless/separator"
import {
  buttonGroupBaseClassName,
  buttonGroupOrientationClassNames,
  buttonGroupSeparatorClassName,
  buttonGroupTextClassName,
} from "./button-group.styles"
import type {
  ButtonGroupClassResolver,
  ButtonGroupOrientation,
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
} from "./button-group.types"

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

function resolveButtonGroupClassName({
  className,
  orientation,
  unstyled,
  classNameMode,
  classResolver,
}: {
  className?: string
  orientation: ButtonGroupOrientation
  unstyled: boolean
  classNameMode: "merge" | "replace"
  classResolver?: ButtonGroupClassResolver
}) {
  const defaultClassName = cn(
    buttonGroupBaseClassName,
    buttonGroupOrientationClassNames[orientation]
  )

  if (unstyled) {
    return className
  }

  if (classResolver) {
    return classResolver({ orientation, defaultClassName, className })
  }

  if (classNameMode === "replace") {
    return className ?? defaultClassName
  }

  return cn(defaultClassName, className)
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: ButtonGroupProps) {
  const resolvedOrientation = orientation as ButtonGroupOrientation

  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={resolvedOrientation}
      className={resolveButtonGroupClassName({
        className,
        orientation: resolvedOrientation,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: ButtonGroupTextProps) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      className={resolveClassName({
        className,
        defaultClassName: buttonGroupTextClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={resolveClassName({
        className,
        defaultClassName: buttonGroupSeparatorClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
