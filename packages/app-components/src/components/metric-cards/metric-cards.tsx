import type { ReactNode } from "react"
import { Card, CardContent } from "@workspace/ui-core/components/card"

export type MetricCardsVariant =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "danger"

export interface MetricCardsItem {
  key?: string
  label: ReactNode
  value: ReactNode
  description?: ReactNode
  variant?: MetricCardsVariant
}

export interface MetricCardsProps {
  items: readonly MetricCardsItem[]
  variant?: MetricCardsVariant
}

const metricCardVariantClassNames: Record<
  MetricCardsVariant,
  {
    card: string
    label: string
    value: string
    description: string
  }
> = {
  default: {
    card: "bg-[var(--surface)] ring-0 shadow-none",
    label: "text-[var(--muted-foreground)]",
    value: "text-[var(--foreground)]",
    description: "text-[var(--muted-foreground)]",
  },
  accent: {
    card: "bg-[var(--accent)] ring-0 shadow-none",
    label: "text-[var(--muted-foreground)]",
    value: "text-[var(--foreground)]",
    description: "text-[var(--muted-foreground)]",
  },
  success: {
    card:
      "bg-[color:color-mix(in_oklab,var(--success)_10%,var(--surface))] ring-0 shadow-none",
    label: "text-[var(--muted-foreground)]",
    value: "text-[var(--success)]",
    description: "text-[var(--foreground)]",
  },
  warning: {
    card:
      "bg-[color:color-mix(in_oklab,var(--warning,#d97706)_10%,var(--surface))] ring-0 shadow-none",
    label: "text-[var(--muted-foreground)]",
    value: "text-[var(--warning,#b45309)]",
    description: "text-[var(--foreground)]",
  },
  danger: {
    card:
      "bg-[color:color-mix(in_oklab,var(--destructive)_10%,var(--surface))] ring-0 shadow-none",
    label: "text-[var(--muted-foreground)]",
    value: "text-[var(--destructive)]",
    description: "text-[var(--foreground)]",
  },
}

export function MetricCards({
  items,
  variant = "default",
}: MetricCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 xl:gap-4">
      {items.map((item, index) => {
        const resolvedVariant = item.variant ?? variant
        const classNames = metricCardVariantClassNames[resolvedVariant]

        return (
          <Card
            key={item.key ?? (typeof item.label === "string" ? item.label : index)}
            className={`h-full min-w-0 ${classNames.card}`}
          >
            <CardContent className="px-3 sm:px-4">
              <div className="space-y-1.5 sm:space-y-2">
                <p className={`text-xs leading-tight sm:text-sm ${classNames.label}`}>
                  {item.label}
                </p>
                <p
                  className={`text-2xl leading-none font-semibold sm:text-3xl ${classNames.value}`}
                >
                  {item.value}
                </p>
                {item.description ? (
                  <p
                    className={`line-clamp-3 text-[11px] leading-4 sm:text-sm sm:leading-5 ${classNames.description}`}
                  >
                    {item.description}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
