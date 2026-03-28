import {
  RadioGroup as HeadlessRadioGroup,
  RadioGroupItem as HeadlessRadioGroupItem,
  type RadioGroupItemProps as HeadlessRadioGroupItemProps,
  type RadioGroupProps as HeadlessRadioGroupProps,
} from "@workspace/ui-core/components/radio-group"

export type RadioGroupProps = HeadlessRadioGroupProps
export type RadioGroupItemProps = HeadlessRadioGroupItemProps

export function RadioGroup(props: RadioGroupProps) {
  return <HeadlessRadioGroup {...props} />
}

export function RadioGroupItem(props: RadioGroupItemProps) {
  return <HeadlessRadioGroupItem {...props} />
}
