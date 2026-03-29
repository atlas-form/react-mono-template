import {
  Skeleton as HeadlessSkeleton,
  type SkeletonProps as HeadlessSkeletonProps,
} from "@workspace/ui-core/components/skeleton"

export type SkeletonProps = HeadlessSkeletonProps

export function Skeleton(props: SkeletonProps) {
  return <HeadlessSkeleton {...props} />
}
