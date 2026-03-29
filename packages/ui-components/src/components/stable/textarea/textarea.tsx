import {
  Textarea as HeadlessTextarea,
  type TextareaProps as HeadlessTextareaProps,
} from "@workspace/ui-core/components/textarea"

export type TextareaProps = HeadlessTextareaProps

export function Textarea(props: TextareaProps) {
  return <HeadlessTextarea {...props} />
}
