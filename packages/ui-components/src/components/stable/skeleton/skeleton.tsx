import {
  Skeleton as CoreSkeleton,
  type SkeletonProps as CoreSkeletonProps,
} from "@workspace/ui-core/components/skeleton"

export type SkeletonProps = CoreSkeletonProps

export function Skeleton(props: SkeletonProps) {
  return <CoreSkeleton {...props} />
}
