import {
  Badge as HeadlessBadge,
  type BadgeProps as HeadlessBadgeProps,
} from "@workspace/ui-core/components/badge"

export type BadgeProps = HeadlessBadgeProps

export function Badge(props: BadgeProps) {
  return <HeadlessBadge {...props} />
}
