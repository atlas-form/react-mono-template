import type { ReactNode } from "react"
import {
  Sidebar as CoreSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@workspace/ui-core/components/sidebar"
import { TooltipProvider } from "@workspace/ui-core/components/tooltip"

export interface SidebarSubEntry {
  label: ReactNode
  href: string
  active?: boolean
  onSelect?: () => void
}

export interface SidebarNavEntry {
  label: ReactNode
  description?: ReactNode
  href: string
  active?: boolean
  prefix?: ReactNode
  onSelect?: () => void
  subItems?: SidebarSubEntry[]
}

export interface SidebarSection {
  label: ReactNode
  items: SidebarNavEntry[]
}

export interface SidebarUserCard {
  name: ReactNode
  email?: ReactNode
  avatar?: ReactNode
}

export interface SidebarProps {
  brandEyebrow?: ReactNode
  brandTitle: ReactNode
  brandDescription?: ReactNode
  sections: SidebarSection[]
  user?: SidebarUserCard
  footerAction?: ReactNode
  children: ReactNode
}

export function Sidebar({
  brandEyebrow,
  brandTitle,
  brandDescription,
  sections,
  user,
  footerAction,
  children,
}: SidebarProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <CoreSidebar collapsible="icon" variant="inset">
          <SidebarHeader className="gap-3 p-4">
            <div className="rounded-[calc(var(--ui-radius-xl)+2px)] border border-sidebar-border/70 bg-sidebar px-3 py-3 shadow-[var(--ui-shadow-soft)]">
              {brandEyebrow ? (
                <p className="text-[11px] tracking-[0.24em] text-sidebar-foreground/55 uppercase">
                  {brandEyebrow}
                </p>
              ) : null}
              <h2 className="mt-2 text-2xl font-semibold text-sidebar-foreground">
                {brandTitle}
              </h2>
              {brandDescription ? (
                <p className="mt-2 text-sm leading-6 text-sidebar-foreground/70">
                  {brandDescription}
                </p>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent className="px-2 pb-2">
            {sections.map((section) => (
              <SidebarGroup key={String(section.label)} className="py-2">
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1.5">
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          isActive={item.active}
                          tooltip={typeof item.label === "string" ? item.label : undefined}
                          className="h-auto min-h-12 items-start gap-3 px-3 py-3"
                          onClick={item.onSelect}
                        >
                          <span>
                            {item.prefix ? (
                              <span className="inline-flex min-w-9 justify-center rounded-md bg-sidebar-accent px-2 py-1 text-xs font-semibold text-sidebar-foreground/70">
                                {item.prefix}
                              </span>
                            ) : null}
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold">
                                {item.label}
                              </span>
                              {item.description ? (
                                <span className="block truncate text-xs text-sidebar-foreground/65">
                                  {item.description}
                                </span>
                              ) : null}
                            </span>
                          </span>
                        </SidebarMenuButton>
                        {item.subItems?.length ? (
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.href}>
                                <SidebarMenuSubButton
                                  isActive={subItem.active}
                                  href={subItem.href}
                                  onClick={subItem.onSelect}
                                >
                                  <span>{subItem.label}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        ) : null}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          {user || footerAction ? <SidebarSeparator /> : null}

          {user || footerAction ? (
            <SidebarFooter className="gap-3 p-4">
              {user ? (
                <div className="rounded-[var(--ui-radius-xl)] border border-sidebar-border/70 bg-sidebar px-3 py-3">
                  <div className="flex items-center gap-3">
                    {user.avatar ? <div className="shrink-0">{user.avatar}</div> : null}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-sidebar-foreground">
                        {user.name}
                      </p>
                      {user.email ? (
                        <p className="truncate text-xs text-sidebar-foreground/65">
                          {user.email}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
              {footerAction}
            </SidebarFooter>
          ) : null}
        </CoreSidebar>

        <SidebarInset className="min-h-svh bg-transparent">
          <div className="px-1 pb-4 sm:px-2">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
