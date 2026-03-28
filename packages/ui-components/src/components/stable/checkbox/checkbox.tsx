import {
  Checkbox as HeadlessCheckbox,
  type CheckboxProps as HeadlessCheckboxProps,
} from "@workspace/ui-core/components/checkbox"

export type CheckboxProps = HeadlessCheckboxProps

export function Checkbox(props: CheckboxProps) {
  return <HeadlessCheckbox {...props} />
}
