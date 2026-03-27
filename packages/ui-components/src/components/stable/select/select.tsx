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

const toneToVariant = {
  default: "default",
  primary: "primary",
  destructive: "destructive",
} as const

export type SelectTone = keyof typeof toneToVariant
export type SelectProps = HeadlessSelectProps
export type SelectGroupProps = HeadlessSelectGroupProps
export type SelectValueProps = HeadlessSelectValueProps
export type SelectTriggerProps = Omit<HeadlessSelectTriggerProps, "variant"> & {
  tone?: SelectTone
}
export type SelectContentProps = Omit<HeadlessSelectContentProps, "variant"> & {
  tone?: SelectTone
}
export type SelectLabelProps = HeadlessSelectLabelProps
export type SelectItemProps = Omit<HeadlessSelectItemProps, "variant"> & {
  tone?: SelectTone
}
export type SelectSeparatorProps = HeadlessSelectSeparatorProps
export type SelectScrollUpButtonProps = HeadlessSelectScrollUpButtonProps
export type SelectScrollDownButtonProps = HeadlessSelectScrollDownButtonProps

export function Select(props: SelectProps) {
  return <HeadlessSelect {...props} />
}

export function SelectGroup(props: SelectGroupProps) {
  return <HeadlessSelectGroup {...props} />
}

export function SelectValue(props: SelectValueProps) {
  return <HeadlessSelectValue {...props} />
}

export function SelectTrigger({
  tone = "default",
  ...props
}: SelectTriggerProps) {
  return <HeadlessSelectTrigger variant={toneToVariant[tone]} {...props} />
}

export function SelectContent({
  tone = "default",
  ...props
}: SelectContentProps) {
  return <HeadlessSelectContent variant={toneToVariant[tone]} {...props} />
}

export function SelectLabel(props: SelectLabelProps) {
  return <HeadlessSelectLabel {...props} />
}

export function SelectItem({ tone = "default", ...props }: SelectItemProps) {
  return <HeadlessSelectItem variant={toneToVariant[tone]} {...props} />
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
