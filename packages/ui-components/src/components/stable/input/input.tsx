import {
  Input as CoreInput,
  inputClassName,
  type InputClassResolver as CoreInputClassResolver,
  type InputProps as CoreInputProps,
} from "@workspace/ui-core/components/input"

export type InputClassResolver = CoreInputClassResolver
export type InputProps = CoreInputProps

export function Input(props: InputProps) {
  return <CoreInput {...props} />
}

export { inputClassName }
