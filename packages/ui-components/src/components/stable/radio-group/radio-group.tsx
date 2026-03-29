import {
  RadioGroup as CoreRadioGroup,
  RadioGroupItem as CoreRadioGroupItem,
  type RadioGroupItemProps as CoreRadioGroupItemProps,
  type RadioGroupProps as CoreRadioGroupProps,
} from "@workspace/ui-core/components/radio-group"

export type RadioGroupProps = CoreRadioGroupProps
export type RadioGroupItemProps = CoreRadioGroupItemProps

export function RadioGroup(props: RadioGroupProps) {
  return <CoreRadioGroup {...props} />
}

export function RadioGroupItem(props: RadioGroupItemProps) {
  return <CoreRadioGroupItem {...props} />
}
