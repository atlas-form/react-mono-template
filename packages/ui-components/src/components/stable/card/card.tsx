import type { ComponentProps } from "react"
import {
  Card as CoreCard,
  CardAction as CoreCardAction,
  CardContent as CoreCardContent,
  CardDescription as CoreCardDescription,
  CardFooter as CoreCardFooter,
  CardHeader as CoreCardHeader,
  CardTitle as CoreCardTitle,
} from "@workspace/ui-core/components/card"

export type CardProps = ComponentProps<typeof CoreCard>
export type CardHeaderProps = ComponentProps<typeof CoreCardHeader>
export type CardFooterProps = ComponentProps<typeof CoreCardFooter>
export type CardTitleProps = ComponentProps<typeof CoreCardTitle>
export type CardDescriptionProps = ComponentProps<
  typeof CoreCardDescription
>
export type CardActionProps = ComponentProps<typeof CoreCardAction>
export type CardContentProps = ComponentProps<typeof CoreCardContent>

export function Card(props: CardProps) {
  return <CoreCard {...props} />
}

export function CardHeader(props: CardHeaderProps) {
  return <CoreCardHeader {...props} />
}

export function CardFooter(props: CardFooterProps) {
  return <CoreCardFooter {...props} />
}

export function CardTitle(props: CardTitleProps) {
  return <CoreCardTitle {...props} />
}

export function CardDescription(props: CardDescriptionProps) {
  return <CoreCardDescription {...props} />
}

export function CardAction(props: CardActionProps) {
  return <CoreCardAction {...props} />
}

export function CardContent(props: CardContentProps) {
  return <CoreCardContent {...props} />
}
