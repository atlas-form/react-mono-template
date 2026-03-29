import type { ComponentProps } from "react"
import {
  Card as HeadlessCard,
  CardAction as HeadlessCardAction,
  CardContent as HeadlessCardContent,
  CardDescription as HeadlessCardDescription,
  CardFooter as HeadlessCardFooter,
  CardHeader as HeadlessCardHeader,
  CardTitle as HeadlessCardTitle,
} from "@workspace/ui-core/components/card"

export type CardProps = ComponentProps<typeof HeadlessCard>
export type CardHeaderProps = ComponentProps<typeof HeadlessCardHeader>
export type CardFooterProps = ComponentProps<typeof HeadlessCardFooter>
export type CardTitleProps = ComponentProps<typeof HeadlessCardTitle>
export type CardDescriptionProps = ComponentProps<typeof HeadlessCardDescription>
export type CardActionProps = ComponentProps<typeof HeadlessCardAction>
export type CardContentProps = ComponentProps<typeof HeadlessCardContent>

export function Card(props: CardProps) {
  return <HeadlessCard {...props} />
}

export function CardHeader(props: CardHeaderProps) {
  return <HeadlessCardHeader {...props} />
}

export function CardFooter(props: CardFooterProps) {
  return <HeadlessCardFooter {...props} />
}

export function CardTitle(props: CardTitleProps) {
  return <HeadlessCardTitle {...props} />
}

export function CardDescription(props: CardDescriptionProps) {
  return <HeadlessCardDescription {...props} />
}

export function CardAction(props: CardActionProps) {
  return <HeadlessCardAction {...props} />
}

export function CardContent(props: CardContentProps) {
  return <HeadlessCardContent {...props} />
}
