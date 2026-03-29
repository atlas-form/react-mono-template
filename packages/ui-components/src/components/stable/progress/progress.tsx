import {
  Progress as HeadlessProgress,
  type ProgressProps as HeadlessProgressProps,
} from "@workspace/ui-core/components/progress"

export type ProgressProps = HeadlessProgressProps

export function Progress(props: ProgressProps) {
  return <HeadlessProgress {...props} />
}
