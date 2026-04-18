import { useState, type ReactNode } from "react"
import {
  Sidebar,
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
  TooltipProvider,
} from "@workspace/ui-components"

export interface AdminSidebarSubEntry {
  label: ReactNode
  href: string
  active?: boolean
  onSelect?: () => void
}

export interface AdminSidebarNavEntry {
  label: ReactNode
  href?: string
  active?: boolean
  icon?: ReactNode
  onSelect?: () => void
  subItems?: AdminSidebarSubEntry[]
}

export interface AdminSidebarSection {
  label: ReactNode
  items: AdminSidebarNavEntry[]
}

export interface AdminSidebarProps {
  brandEyebrow?: ReactNode
  brandTitle: ReactNode
  brandDescription?: ReactNode
  sections: AdminSidebarSection[]
  children: ReactNode
}

export function AdminSidebar({
  brandEyebrow,
  brandTitle,
  brandDescription,
  sections,
  children,
}: AdminSidebarProps) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div>
              <div>{brandTitle}</div>
              {(brandDescription ?? brandEyebrow) ? (
                <div>{brandDescription ?? brandEyebrow}</div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent>
            {sections.map((section) => (
              <SidebarGroup key={String(section.label)}>
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarNavRow key={item.href ?? String(item.label)} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

function SidebarNavRow({ item }: { item: AdminSidebarNavEntry }) {
  const hasSubItems = Boolean(item.subItems?.length)

  if (!hasSubItems) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          active={item.active}
          tooltip={typeof item.label === "string" ? item.label : undefined}
          onClick={item.onSelect}
        >
          {item.icon}
          {item.label}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  const hasActiveChild = item.subItems?.some((subItem) => subItem.active) ?? false
  const [open, setOpen] = useState(hasActiveChild)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        active={item.active || hasActiveChild}
        tooltip={typeof item.label === "string" ? item.label : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        {item.icon}
        {item.label}
        {open ? "收起" : "展开"}
      </SidebarMenuButton>

      {open ? (
        <SidebarMenuSub>
          {item.subItems?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.href}>
              <SidebarMenuSubButton
                active={subItem.active}
                href={subItem.href}
                onClick={subItem.onSelect}
              >
                {subItem.label}
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  )
}
