import {
  Badge as CoreBadge,
  type BadgeProps as CoreBadgeProps,
} from "@workspace/ui-core/components/badge"

export type BadgeProps = CoreBadgeProps

export function Badge(props: BadgeProps) {
  return <CoreBadge {...props} />
}
