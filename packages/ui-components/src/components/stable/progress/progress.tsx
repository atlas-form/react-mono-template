import {
  Progress as CoreProgress,
  type ProgressProps as CoreProgressProps,
} from "@workspace/ui-core/components/progress"

export type ProgressProps = CoreProgressProps

export function Progress(props: ProgressProps) {
  return <CoreProgress {...props} />
}
