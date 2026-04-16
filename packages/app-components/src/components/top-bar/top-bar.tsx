import type { ReactNode } from "react"
import { SidebarTrigger } from "@workspace/ui-core/components/sidebar"

export interface TopBarProps {
  title?: ReactNode
  meta?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode[]
  showSidebarTrigger?: boolean
}

export function TopBar({
  title,
  meta,
  leading,
  trailing = [],
  showSidebarTrigger = true,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 mb-2 w-full min-w-0 shrink-0 rounded-[var(--ui-radius-xl)] border border-[var(--border)] bg-[color-mix(in_oklab,var(--app-surface)_92%,transparent)] p-0 shadow-[var(--ui-shadow-soft)] backdrop-blur">
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {showSidebarTrigger ? (
            <SidebarTrigger iconClassName="size-4 text-(--app-text)" aria-label="Toggle sidebar" />
          ) : null}
          {leading ? <div className="shrink-0">{leading}</div> : null}
          {title || meta ? (
            <div className="min-w-0">
              {title ? (
                <div className="truncate text-lg font-semibold text-(--app-text)">
                  {title}
                </div>
              ) : null}
              {meta ? (
                <div className="truncate text-sm text-(--app-muted-text)">{meta}</div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-nowrap items-center justify-end gap-3">
          {trailing.map((item, index) => (
            <div key={index} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
