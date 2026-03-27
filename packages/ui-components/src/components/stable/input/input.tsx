import {
  Input as HeadlessInput,
  inputClassName,
  type InputClassResolver as HeadlessInputClassResolver,
  type InputProps as HeadlessInputProps,
} from "@workspace/ui-core/components/input"

export type InputClassResolver = HeadlessInputClassResolver
export type InputProps = HeadlessInputProps

export function Input(props: InputProps) {
  return <HeadlessInput {...props} />
}

export { inputClassName }
