import {
  Button as HeadlessButton,
  type StyledButtonProps as HeadlessStyledButtonProps,
} from "@workspace/ui-core/components/button"

export type ButtonProps = HeadlessStyledButtonProps

export function Button(props: ButtonProps) {
  return <HeadlessButton {...props} />
}
