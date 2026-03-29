import {
  Textarea as CoreTextarea,
  type TextareaProps as CoreTextareaProps,
} from "@workspace/ui-core/components/textarea"

export type TextareaProps = CoreTextareaProps

export function Textarea(props: TextareaProps) {
  return <CoreTextarea {...props} />
}
