import { Icon } from "@workspace/ui-icon"

import { DemoSection } from "./shared"

const semanticIcons = [
  "add",
  "edit",
  "delete",
  "check",
  "search",
  "triangle-alert",
  "circle-check",
  "octagon-x",
] as const

const lucideNameIcons = ["SquarePen", "panel-left", "chevrons-up-down"] as const
const sizeSamples = [14, 20, 28] as const
const strokeWidthSamples = [1, 2, 3] as const
const semanticColorSamples = [
  { token: "primary", className: "text-primary", icon: "check" as const },
  { token: "success", className: "text-[var(--success)]", icon: "circle-check" as const },
  { token: "warning", className: "text-[var(--warning)]", icon: "triangle-alert" as const },
  { token: "destructive", className: "text-destructive", icon: "octagon-x" as const },
  { token: "info", className: "text-[var(--info)]", icon: "info" as const },
] as const

export function IconDemo() {
  return (
    <DemoSection title="ui-icon">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Semantic names</p>
          <div className="flex flex-wrap gap-3">
            {semanticIcons.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
              >
                <Icon name={name} className="size-4" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Lucide names (dynamic fallback)</p>
          <div className="flex flex-wrap gap-3">
            {lucideNameIcons.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
              >
                <Icon name={name} className="size-4" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Lucide props: color / size / strokeWidth</p>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2 rounded-md border p-3 text-xs">
              <p className="text-muted-foreground">color</p>
              <div className="flex items-center gap-3">
                <Icon name="search" className="size-5" color="var(--primary)" />
                <Icon name="search" className="size-5" color="var(--success)" />
                <Icon name="search" className="size-5" color="var(--warning)" />
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-3 text-xs">
              <p className="text-muted-foreground">size (sizing)</p>
              <div className="flex items-center gap-3">
                {sizeSamples.map((size) => (
                  <Icon key={size} name="search" size={size} />
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-3 text-xs">
              <p className="text-muted-foreground">strokeWidth</p>
              <div className="flex items-center gap-3">
                {strokeWidthSamples.map((strokeWidth) => (
                  <Icon key={strokeWidth} name="search" className="size-5" strokeWidth={strokeWidth} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Semantic colors: primary / success / warning / destructive / info</p>
          <div className="flex flex-wrap gap-3">
            {semanticColorSamples.map(({ token, className, icon }) => (
              <div
                key={token}
                className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
              >
                <Icon name={icon} className={`size-4 ${className}`} />
                <span>{token}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  )
}
