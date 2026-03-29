import {
  Separator as HeadlessSeparator,
  type SeparatorProps as HeadlessSeparatorProps,
} from "@workspace/ui-core/components/separator"

export type SeparatorProps = HeadlessSeparatorProps

export function Separator(props: SeparatorProps) {
  return <HeadlessSeparator {...props} />
}
