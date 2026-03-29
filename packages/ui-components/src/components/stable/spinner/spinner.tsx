import {
  Spinner as HeadlessSpinner,
  type SpinnerProps as HeadlessSpinnerProps,
} from "@workspace/ui-core/components/spinner"

export type SpinnerProps = HeadlessSpinnerProps

export function Spinner(props: SpinnerProps) {
  return <HeadlessSpinner {...props} />
}
