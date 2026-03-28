import {
  Switch as HeadlessSwitch,
  type SwitchProps as HeadlessSwitchProps,
} from "@workspace/ui-core/components/switch"

export type SwitchProps = HeadlessSwitchProps

export function Switch(props: SwitchProps) {
  return <HeadlessSwitch {...props} />
}
