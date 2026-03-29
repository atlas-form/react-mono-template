import type { ReactNode } from "react"
import {
  Sidebar as CoreSidebar,
  SidebarContent as CoreSidebarContent,
  SidebarGroup as CoreSidebarGroup,
  SidebarGroupContent as CoreSidebarGroupContent,
  SidebarGroupLabel as CoreSidebarGroupLabel,
  SidebarHeader as CoreSidebarHeader,
  SidebarInset as CoreSidebarInset,
  SidebarMenu as CoreSidebarMenu,
  SidebarMenuButton as CoreSidebarMenuButton,
  SidebarMenuItem as CoreSidebarMenuItem,
  SidebarProvider as CoreSidebarProvider,
  SidebarTrigger as CoreSidebarTrigger,
} from "@workspace/ui-core/components/sidebar"

export interface SidebarMenuEntry {
  label: ReactNode
  href: string
  active?: boolean
}

export interface SidebarProps {
  title: ReactNode
  menu: SidebarMenuEntry[]
  children: ReactNode
}

export function Sidebar({ title, menu, children }: SidebarProps) {
  return (
    <CoreSidebarProvider>
      {" "}
      <div className="dmin-h-80 flex w-full overflow-hidden rounded-xl border">
        <CoreSidebar collapsible="icon" variant="inset">
          <CoreSidebarHeader>
            <div className="px-2 text-sm font-semibold">{title}</div>
          </CoreSidebarHeader>

          <CoreSidebarContent>
            <CoreSidebarGroup>
              <CoreSidebarGroupLabel>Navigation</CoreSidebarGroupLabel>
              <CoreSidebarGroupContent>
                <CoreSidebarMenu>
                  {menu.map((entry) => (
                    <CoreSidebarMenuItem key={entry.href}>
                      <CoreSidebarMenuButton isActive={entry.active} asChild>
                        <a href={entry.href}>{entry.label}</a>
                      </CoreSidebarMenuButton>
                    </CoreSidebarMenuItem>
                  ))}
                </CoreSidebarMenu>
              </CoreSidebarGroupContent>
            </CoreSidebarGroup>
          </CoreSidebarContent>
        </CoreSidebar>

        <CoreSidebarInset>
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <CoreSidebarTrigger />
            <span className="text-sm text-muted-foreground">Content</span>
          </div>
          <div className="p-4">{children}</div>
        </CoreSidebarInset>
      </div>
    </CoreSidebarProvider>
  )
}
