import type { ReactNode } from "react"
import { Card, CardContent, SidebarTrigger } from "@workspace/ui-components"

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
    <Card>
      <CardContent>
        <header>
          <div>
            {showSidebarTrigger ? (
              <SidebarTrigger ariaLabel="Toggle sidebar" />
            ) : null}
            {leading}
            {title ? <div>{title}</div> : null}
            {meta ? <div>{meta}</div> : null}
          </div>

          <div>
            {trailing.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </header>
      </CardContent>
    </Card>
  )
}
