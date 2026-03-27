import { Select as SelectPrimitive } from "radix-ui"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "../../lib/icon-slots"

import { DEFAULT_MODE } from "../../lib/component-mode"
import { cn } from "../../lib/utils"
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

function resolveStyledClassName({
  className,
  defaultClassName,
  classNameMode,
  classResolver,
}: {
  className?: string
  defaultClassName: string
  classNameMode?: SelectClassNameMode
  classResolver?: SelectClassResolver
}) {
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
  mode = DEFAULT_MODE,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectGroupProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return <SelectPrimitive.Group className={className} {...rest} />
  }

  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={resolveStyledClassName({
        className,
        defaultClassName: selectGroupClassName,
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
  mode = DEFAULT_MODE,
  size = "default",
  variant = "default",
  children,
  hideIndicator = false,
  indicator,
  indicatorClassName,
  classNameMode = "merge",
  classResolver,
  indicatorClassResolver,
  ...props
}: SelectTriggerProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return (
      <SelectPrimitive.Trigger className={className} {...rest}>
        {children}
        {!hideIndicator && (
          <SelectPrimitive.Icon asChild>
            {indicator ?? <ChevronDownIcon className={indicatorClassName} />}
          </SelectPrimitive.Icon>
        )}
      </SelectPrimitive.Trigger>
    )
  }

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
    : resolveStyledClassName({
        className,
        defaultClassName,
        classNameMode,
        classResolver: undefined,
      })

  const resolvedIndicatorClassName = resolveStyledClassName({
    className: indicatorClassName,
    defaultClassName: selectTriggerIconClassName,
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
            <ChevronDownIcon className={resolvedIndicatorClassName} />
          )}
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({
  className,
  mode = DEFAULT_MODE,
  children,
  position = "popper",
  align = "center",
  variant = "default",
  showScrollButtons = false,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectContentProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={className}
          position={position}
          align={align}
          {...rest}
        >
          {showScrollButtons ? <SelectScrollUpButton mode="headless" /> : null}
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          {showScrollButtons ? (
            <SelectScrollDownButton mode="headless" />
          ) : null}
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    )
  }

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
    : resolveStyledClassName({
        className,
        defaultClassName,
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
  mode = DEFAULT_MODE,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectLabelProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return <SelectPrimitive.Label className={className} {...rest} />
  }

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={resolveStyledClassName({
        className,
        defaultClassName: selectLabelClassName,
        classNameMode,
        classResolver,
      })}
      {...props}
    />
  )
}

export function SelectItem({
  className,
  mode = DEFAULT_MODE,
  variant = "default",
  children,
  hideIndicator = false,
  indicator,
  indicatorContainerClassName,
  classNameMode = "merge",
  classResolver,
  indicatorContainerClassResolver,
  ...props
}: SelectItemProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return (
      <SelectPrimitive.Item className={className} {...rest}>
        {!hideIndicator && (
          <span className={indicatorContainerClassName}>
            <SelectPrimitive.ItemIndicator>
              {indicator ?? <CheckIcon className="pointer-events-none" />}
            </SelectPrimitive.ItemIndicator>
          </span>
        )}
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }

  const defaultClassName = cn(
    selectItemClassName,
    selectItemVariantClassNames[variant]
  )

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-variant={variant}
      className={resolveStyledClassName({
        className,
        defaultClassName,
        classNameMode,
        classResolver,
      })}
      {...props}
    >
      {!hideIndicator && (
        <span
          className={resolveStyledClassName({
            className: indicatorContainerClassName,
            defaultClassName: selectItemIndicatorContainerClassName,
            classNameMode,
            classResolver: indicatorContainerClassResolver,
          })}
        >
          <SelectPrimitive.ItemIndicator>
            {indicator ?? <CheckIcon className="pointer-events-none" />}
          </SelectPrimitive.ItemIndicator>
        </span>
      )}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function SelectSeparator({
  className,
  mode = DEFAULT_MODE,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectSeparatorProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return <SelectPrimitive.Separator className={className} {...rest} />
  }

  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={resolveStyledClassName({
        className,
        defaultClassName: selectSeparatorClassName,
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
  mode = DEFAULT_MODE,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectScrollUpButtonProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return (
      <SelectPrimitive.ScrollUpButton className={className} {...rest}>
        {children ?? <ChevronUpIcon />}
      </SelectPrimitive.ScrollUpButton>
    )
  }

  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={resolveStyledClassName({
        className,
        defaultClassName: selectScrollButtonClassName,
        classNameMode,
        classResolver,
      })}
      {...props}
    >
      {children ?? <ChevronUpIcon />}
    </SelectPrimitive.ScrollUpButton>
  )
}

export function SelectScrollDownButton({
  className,
  children,
  mode = DEFAULT_MODE,
  classNameMode = "merge",
  classResolver,
  ...props
}: SelectScrollDownButtonProps) {
  if (mode === "headless") {
    const rest = { ...props }
    return (
      <SelectPrimitive.ScrollDownButton className={className} {...rest}>
        {children ?? <ChevronDownIcon />}
      </SelectPrimitive.ScrollDownButton>
    )
  }

  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={resolveStyledClassName({
        className,
        defaultClassName: selectScrollButtonClassName,
        classNameMode,
        classResolver,
      })}
      {...props}
    >
      {children ?? <ChevronDownIcon />}
    </SelectPrimitive.ScrollDownButton>
  )
}
