import {
  Spinner as CoreSpinner,
  type SpinnerProps as CoreSpinnerProps,
} from "@workspace/ui-core/components/spinner"

export type SpinnerProps = CoreSpinnerProps

export function Spinner(props: SpinnerProps) {
  return <CoreSpinner {...props} />
}
