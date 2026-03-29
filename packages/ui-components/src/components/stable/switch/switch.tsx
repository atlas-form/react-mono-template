import {
  Switch as CoreSwitch,
  type SwitchProps as CoreSwitchProps,
} from "@workspace/ui-core/components/switch"

export type SwitchProps = CoreSwitchProps

export function Switch(props: SwitchProps) {
  return <CoreSwitch {...props} />
}
