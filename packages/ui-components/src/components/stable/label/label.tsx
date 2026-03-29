import {
  Label as HeadlessLabel,
  type LabelProps as HeadlessLabelProps,
} from "@workspace/ui-core/components/label"

export type LabelProps = HeadlessLabelProps

export function Label(props: LabelProps) {
  return <HeadlessLabel {...props} />
}
