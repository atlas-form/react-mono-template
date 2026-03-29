import {
  Separator as CoreSeparator,
  type SeparatorProps as CoreSeparatorProps,
} from "@workspace/ui-core/components/separator"

export type SeparatorProps = CoreSeparatorProps

export function Separator(props: SeparatorProps) {
  return <CoreSeparator {...props} />
}
