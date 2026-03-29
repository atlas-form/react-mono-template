import {
  Checkbox as CoreCheckbox,
  type CheckboxProps as CoreCheckboxProps,
} from "@workspace/ui-core/components/checkbox"

export type CheckboxProps = CoreCheckboxProps

export function Checkbox(props: CheckboxProps) {
  return <CoreCheckbox {...props} />
}
