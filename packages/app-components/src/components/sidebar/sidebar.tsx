import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui-core/components/collapsible"
import {
  Sidebar as CoreSidebar,
  SidebarContent,
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
  href?: string
  active?: boolean
  icon?: ReactNode
  onSelect?: () => void
  subItems?: SidebarSubEntry[]
}

export interface SidebarSection {
  label: ReactNode
  items: SidebarNavEntry[]
}

export interface SidebarProps {
  brandEyebrow?: ReactNode
  brandTitle: ReactNode
  brandDescription?: ReactNode
  sections: SidebarSection[]
  children: ReactNode
}

export function Sidebar({
  brandEyebrow,
  brandTitle,
  brandDescription,
  sections,
  children,
}: SidebarProps) {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width-icon": "2.25rem",
          } as React.CSSProperties
        }
      >
        <CoreSidebar
          collapsible="icon"
          variant="sidebar"
          className="[--sidebar:var(--surface)] [--sidebar-accent:var(--surface-hover)] [--sidebar-accent-foreground:var(--foreground)] [--sidebar-border:var(--border)] [--sidebar-foreground:var(--foreground)] bg-[var(--surface)]"
        >
          <SidebarHeader className="p-2">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                {typeof brandTitle === "string" ? brandTitle.charAt(0).toUpperCase() : "W"}
              </div>
              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-semibold text-sidebar-foreground">
                  {brandTitle}
                </p>
                {(brandDescription ?? brandEyebrow) ? (
                  <p className="truncate text-xs text-sidebar-foreground/70">
                    {brandDescription ?? brandEyebrow}
                  </p>
                ) : null}
              </div>
            </div>
          </SidebarHeader>

          <SidebarSeparator className="mx-0" />

          <SidebarContent className="px-0 pb-2 group-data-[collapsible=icon]:px-0.5 group-data-[collapsible=icon]:pb-0.5">
            {sections.map((section) => (
              <SidebarGroup key={String(section.label)} className="py-1.5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0.5">
                <SidebarGroupLabel className="px-2 text-[11px] font-medium tracking-[0.08em] text-sidebar-foreground/60 uppercase group-data-[collapsible=icon]:hidden">
                  {section.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {section.items.map((item) => (
                      <SidebarNavRow key={item.href ?? String(item.label)} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

        </CoreSidebar>

        <SidebarInset className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-transparent">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-2 pb-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

function SidebarNavRow({ item }: { item: SidebarNavEntry }) {
  const hasSubItems = Boolean(item.subItems?.length)

  if (!hasSubItems) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.active}
          tooltip={typeof item.label === "string" ? item.label : undefined}
          className="h-8 gap-2 px-1.5 text-sm hover:bg-[var(--surface-hover)] data-[active=true]:bg-[var(--surface-hover)] group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-6! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
          onClick={item.onSelect}
        >
          {item.icon ? (
            <span className="flex size-4 shrink-0 items-center justify-center text-sidebar-foreground/80 group-data-[collapsible=icon]:mx-auto [&_svg]:size-4 [&_svg]:shrink-0">
              {item.icon}
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">
            {item.label}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  const hasActiveChild = item.subItems?.some((subItem) => subItem.active) ?? false

  return (
    <Collapsible defaultOpen={hasActiveChild} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={item.active || hasActiveChild}
            tooltip={typeof item.label === "string" ? item.label : undefined}
            className="h-8 gap-2 px-1.5 text-sm hover:bg-[var(--surface-hover)] data-[active=true]:bg-[var(--surface-hover)] group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-6! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
          >
            {item.icon ? (
              <span className="flex size-4 shrink-0 items-center justify-center text-sidebar-foreground/80 group-data-[collapsible=icon]:mx-auto [&_svg]:size-4 [&_svg]:shrink-0">
                {item.icon}
              </span>
            ) : null}
            <span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">
              {item.label}
            </span>
            <ChevronRight className="size-4 shrink-0 text-sidebar-foreground/60 transition-transform duration-200 ease-out group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent className="grid overflow-hidden transition-all duration-200 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100">
          <div className="min-h-0 overflow-hidden">
            <SidebarMenuSub className="mt-1">
              {item.subItems?.map((subItem) => (
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
          </div>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
