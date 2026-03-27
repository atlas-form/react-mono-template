import { cn } from "../../lib/utils"
import { inputClassName } from "./input.styles"
import type { InputClassResolver, InputProps } from "./input.types"

function resolveInputClassName({
  className,
  unstyled,
  classNameMode,
  classResolver,
}: {
  className?: string
  unstyled: boolean
  classNameMode: "merge" | "replace"
  classResolver?: InputClassResolver
}) {
  if (unstyled) {
    return className
  }

  if (classResolver) {
    return classResolver({
      defaultClassName: inputClassName,
      className,
    })
  }

  if (classNameMode === "replace") {
    return className ?? inputClassName
  }

  return cn(inputClassName, className)
}

export function Input({
  className,
  type,
  unstyled = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: InputProps) {
  const resolvedClassName = resolveInputClassName({
    className,
    unstyled,
    classNameMode,
    classResolver,
  })

  return (
    <input
      type={type}
      data-slot="input"
      className={resolvedClassName}
      {...props}
    />
  )
}
