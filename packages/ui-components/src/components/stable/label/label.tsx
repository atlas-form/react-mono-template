import {
  Label as CoreLabel,
  type LabelProps as CoreLabelProps,
} from "@workspace/ui-core/components/label"

export type LabelProps = CoreLabelProps

export function Label(props: LabelProps) {
  return <CoreLabel {...props} />
}
