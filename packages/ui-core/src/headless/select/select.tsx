import { Select as SelectPrimitive } from "radix-ui"
import { Icon } from "@workspace/ui-icon"

import { cn } from "@workspace/ui-core/lib/utils"
import {
  selectContentBaseClassName,
  selectContentPopperOffsetClassName,
  selectContentVariantClassNames,
  selectGroupClassName,
  selectItemClassName,
  selectItemIndicatorContainerClassName,
  selectItemVariantClassNames,
  selectLabelClassName,
  selectScrollButtonClassName,
  selectSeparatorClassName,
  selectTriggerClassName,
  selectTriggerIconClassName,
  selectTriggerVariantClassNames,
  selectViewportClassName,
} from "./select.styles"
import type {
  SelectContentProps,
  SelectClassNameMode,
  SelectClassResolver,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from "./select.types"

function resolveClassName({
  className,
  defaultClassName,
  unstyled,
  classNameMode,
  classResolver,
}: {
  className?: string
  defaultClassName: string
  unstyled?: boolean
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
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

export function Select({ ...props }: SelectProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

export function SelectGroup({
  className,
  unstyled,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={resolveClassName({
        className,
        defaultClassName: selectGroupClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

export function SelectValue({ ...props }: SelectValueProps) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

export function SelectTrigger({
  className,
  size = "default",
  variant = "default",
  children,
  hideIndicator = false,
  indicator,
  indicatorClassName,
  unstyled,
  classNameMode = "merge",
  classResolver,
  indicatorClassResolver,
  ...props
}: SelectTriggerProps) {
  const defaultClassName = cn(
    selectTriggerClassName,
    selectTriggerVariantClassNames[variant]
  )

  const resolvedClassName = classResolver
    ? classResolver({
        defaultClassName,
        className,
        size,
        variant,
      })
    : resolveClassName({
        className,
        defaultClassName,
        unstyled,
        classNameMode,
        classResolver: undefined,
      })

  const resolvedIndicatorClassName = resolveClassName({
    className: indicatorClassName,
    defaultClassName: selectTriggerIconClassName,
    unstyled,
    classNameMode,
    classResolver: indicatorClassResolver,
  })

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      data-variant={variant}
      className={resolvedClassName}
      {...props}
    >
      {children}
      {!hideIndicator && (
        <SelectPrimitive.Icon asChild>
          {indicator ?? (
            <Icon name="arrow-down" className={resolvedIndicatorClassName} />
          )}
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  variant = "default",
  showScrollButtons = false,
  unstyled,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectContentProps) {
  const defaultClassName = cn(
    selectContentBaseClassName,
    selectContentVariantClassNames[variant],
    position === "popper" && selectContentPopperOffsetClassName
  )

  const resolvedClassName = classResolver
    ? classResolver({
        defaultClassName,
        className,
        position,
        variant,
      })
    : resolveClassName({
        className,
        defaultClassName,
        unstyled,
        classNameMode,
        classResolver: undefined,
      })

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-variant={variant}
        data-align-trigger={position === "item-aligned"}
        className={resolvedClassName}
        position={position}
        align={align}
        {...props}
      >
        {showScrollButtons ? <SelectScrollUpButton /> : null}
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(selectViewportClassName)}
        >
          {children}
        </SelectPrimitive.Viewport>
        {showScrollButtons ? <SelectScrollDownButton /> : null}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectLabel({
  className,
  unstyled,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={resolveClassName({
        className,
        defaultClassName: selectLabelClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

export function SelectItem({
  className,
  variant = "default",
  children,
  hideIndicator = false,
  indicator,
  indicatorContainerClassName,
  unstyled,
  classNameMode = "merge",
  classResolver,
  indicatorContainerClassResolver,
  ...props
}: SelectItemProps) {
  const defaultClassName = cn(
    selectItemClassName,
    selectItemVariantClassNames[variant]
  )

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-variant={variant}
      className={resolveClassName({
        className,
        defaultClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    >
      {!hideIndicator && (
        <span
          className={resolveClassName({
            className: indicatorContainerClassName,
            defaultClassName: selectItemIndicatorContainerClassName,
            unstyled,
            classNameMode,
            classResolver: indicatorContainerClassResolver,
          })}
        >
          <SelectPrimitive.ItemIndicator>
            {indicator ?? <Icon name="check" className="pointer-events-none" />}
          </SelectPrimitive.ItemIndicator>
        </span>
      )}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function SelectSeparator({
  className,
  unstyled,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={resolveClassName({
        className,
        defaultClassName: selectSeparatorClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

export function SelectScrollUpButton({
  className,
  children,
  unstyled,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={resolveClassName({
        className,
        defaultClassName: selectScrollButtonClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    >
      {children ?? <Icon name="arrow-up" />}
    </SelectPrimitive.ScrollUpButton>
  )
}

export function SelectScrollDownButton({
  className,
  children,
  unstyled,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={resolveClassName({
        className,
        defaultClassName: selectScrollButtonClassName,
        unstyled,
        classNameMode,
        classResolver,
      })}
      {...props}
    >
      {children ?? <Icon name="arrow-down" />}
    </SelectPrimitive.ScrollDownButton>
  )
}
