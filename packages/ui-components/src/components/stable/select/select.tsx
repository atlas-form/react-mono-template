import type { CSSProperties, ReactNode } from "react"
import {
  Select as HeadlessSelect,
  SelectContent as HeadlessSelectContent,
  SelectGroup as HeadlessSelectGroup,
  SelectItem as HeadlessSelectItem,
  SelectLabel as HeadlessSelectLabel,
  SelectScrollDownButton as HeadlessSelectScrollDownButton,
  SelectScrollUpButton as HeadlessSelectScrollUpButton,
  SelectSeparator as HeadlessSelectSeparator,
  SelectTrigger as HeadlessSelectTrigger,
  SelectValue as HeadlessSelectValue,
  type SelectContentProps as HeadlessSelectContentProps,
  type SelectGroupProps as HeadlessSelectGroupProps,
  type SelectItemProps as HeadlessSelectItemProps,
  type SelectLabelProps as HeadlessSelectLabelProps,
  type SelectProps as HeadlessSelectProps,
  type SelectScrollDownButtonProps as HeadlessSelectScrollDownButtonProps,
  type SelectScrollUpButtonProps as HeadlessSelectScrollUpButtonProps,
  type SelectSeparatorProps as HeadlessSelectSeparatorProps,
  type SelectTriggerProps as HeadlessSelectTriggerProps,
  type SelectValueProps as HeadlessSelectValueProps,
} from "@workspace/ui-core/components/select"

export type SelectProps = HeadlessSelectProps
export type SelectGroupProps = HeadlessSelectGroupProps
export type SelectValueProps = HeadlessSelectValueProps
export type SelectTriggerProps = HeadlessSelectTriggerProps
export type SelectContentProps = HeadlessSelectContentProps
export type SelectLabelProps = HeadlessSelectLabelProps
export type SelectItemProps = HeadlessSelectItemProps
export type SelectSeparatorProps = HeadlessSelectSeparatorProps
export type SelectScrollUpButtonProps = HeadlessSelectScrollUpButtonProps
export type SelectScrollDownButtonProps = HeadlessSelectScrollDownButtonProps

export type AppSelectOption = {
  label: ReactNode
  value: string
  disabled?: boolean
}

export type AppSelectStyles = {
  content?: CSSProperties
  item?: CSSProperties
}

export type AppSelectProps = Omit<SelectProps, "children"> & {
  list: AppSelectOption[]
  placeholder?: ReactNode
  className?: string
  contentClassName?: string
  itemClassName?: string
  style?: CSSProperties
  styles?: AppSelectStyles
}

export function Select(props: SelectProps) {
  return <HeadlessSelect {...props} />
}

export function SelectGroup(props: SelectGroupProps) {
  return <HeadlessSelectGroup {...props} />
}

export function SelectValue(props: SelectValueProps) {
  return <HeadlessSelectValue {...props} />
}

export function SelectTrigger({ ...props }: SelectTriggerProps) {
  return <HeadlessSelectTrigger {...props} />
}

export function SelectContent({ ...props }: SelectContentProps) {
  return <HeadlessSelectContent {...props} />
}

export function SelectLabel(props: SelectLabelProps) {
  return <HeadlessSelectLabel {...props} />
}

export function SelectItem(props: SelectItemProps) {
  return <HeadlessSelectItem {...props} />
}

export function SelectSeparator(props: SelectSeparatorProps) {
  return <HeadlessSelectSeparator {...props} />
}

export function SelectScrollUpButton(props: SelectScrollUpButtonProps) {
  return <HeadlessSelectScrollUpButton {...props} />
}

export function SelectScrollDownButton(props: SelectScrollDownButtonProps) {
  return <HeadlessSelectScrollDownButton {...props} />
}

export function AppSelect({
  list,
  placeholder,
  className,
  contentClassName,
  itemClassName,
  style,
  styles,
  ...props
}: AppSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className={className} style={style}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName} style={styles?.content}>
        {list.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={itemClassName}
            style={styles?.item}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
