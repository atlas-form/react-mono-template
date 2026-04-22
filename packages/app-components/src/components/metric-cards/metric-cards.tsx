import type { ReactNode } from "react"
import { Card, CardContent } from "@workspace/ui-components/stable/card"

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
    container: string
    value: string
  }
> = {
  default: {
    container: "border-transparent bg-(--app-panel)",
    value: "text-(--app-text)",
  },
  accent: {
    container: "border-transparent bg-(--app-active-bg)",
    value: "text-(--app-text)",
  },
  success: {
    container:
      "border-[color:color-mix(in_oklab,var(--success)_40%,var(--app-border))] bg-[color:color-mix(in_oklab,var(--success)_10%,var(--app-panel))]",
    value: "text-[var(--success)]",
  },
  warning: {
    container:
      "border-[color:color-mix(in_oklab,var(--warning,#d97706)_40%,var(--app-border))] bg-[color:color-mix(in_oklab,var(--warning,#d97706)_10%,var(--app-panel))]",
    value: "text-[var(--warning,#b45309)]",
  },
  danger: {
    container:
      "border-[color:color-mix(in_oklab,var(--destructive)_40%,var(--app-border))] bg-[color:color-mix(in_oklab,var(--destructive)_10%,var(--app-panel))]",
    value: "text-destructive",
  },
}

export function MetricCards({
  items,
  variant = "default",
}: MetricCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const resolvedVariant = item.variant ?? variant
        const classNames = metricCardVariantClassNames[resolvedVariant]

        return (
          <div
            key={item.key ?? (typeof item.label === "string" ? item.label : index)}
            className={`rounded-[var(--ui-radius-lg)] border ${classNames.container}`}
          >
            <Card>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-(--app-muted-text)">{item.label}</p>
                  <p className={`text-3xl font-semibold ${classNames.value}`}>
                    {item.value}
                  </p>
                  {item.description ? (
                    <p className="text-sm text-(--app-muted-text)">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
