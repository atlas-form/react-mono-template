import { useState, type ReactNode } from "react"
import {
  AvatarDropdown,
  AvatarDropdownItem,
  type AvatarDropdownAction,
} from "../avatar-dropdown"
import {
  SidebarFooter,
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
  SidebarRail,
  SidebarSeparator,
} from "@workspace/ui-components"
import { TooltipProvider } from "../tooltip"

export interface SidebarShellSubEntry {
  label: ReactNode
  href: string
  active?: boolean
  onSelect?: () => void
}

export interface SidebarShellNavEntry {
  label: ReactNode
  href?: string
  active?: boolean
  icon?: ReactNode
  onSelect?: () => void
  subItems?: SidebarShellSubEntry[]
}

export interface SidebarShellSection {
  label: ReactNode
  items: SidebarShellNavEntry[]
}

export interface SidebarShellProps {
  brandEyebrow?: ReactNode
  brandTitle: ReactNode
  brandDescription?: ReactNode
  sections: SidebarShellSection[]
  footerAccount?: {
    avatarSrc?: string
    avatarAlt: string
    avatarFallback: ReactNode
    displayName: ReactNode
    displayId: ReactNode
    actions?: Array<{
      icon?: ReactNode
      label: ReactNode
      onSelect?: () => void
      href?: string
      disabled?: boolean
    }>
    logout?: AvatarDropdownAction
  }
  children: ReactNode
}

export function SidebarShell({
  brandEyebrow,
  brandTitle,
  brandDescription,
  sections,
  footerAccount,
  children,
}: SidebarShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                {typeof brandTitle === "string" ? brandTitle.charAt(0).toUpperCase() : "W"}
              </div>
              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <div>{brandTitle}</div>
                {(brandDescription ?? brandEyebrow) ? (
                  <div>{brandDescription ?? brandEyebrow}</div>
                ) : null}
              </div>
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

          {footerAccount ? (
            <>
              <SidebarSeparator />
              <SidebarFooter>
                <AvatarDropdown
                  triggerVariant="sidebar"
                  avatarAlt={footerAccount.avatarAlt}
                  avatarSrc={footerAccount.avatarSrc}
                  avatarFallback={footerAccount.avatarFallback}
                  displayName={footerAccount.displayName}
                  displayId={footerAccount.displayId}
                  logout={footerAccount.logout}
                >
                  {footerAccount.actions?.map((action, index) => (
                    <AvatarDropdownItem
                      key={index}
                      icon={action.icon}
                      label={action.label}
                      onSelect={action.onSelect}
                      href={action.href}
                      disabled={action.disabled}
                    />
                  ))}
                </AvatarDropdown>
              </SidebarFooter>
            </>
          ) : null}

          <SidebarRail />
        </Sidebar>

        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

function SidebarNavRow({ item }: { item: SidebarShellNavEntry }) {
  const hasSubItems = Boolean(item.subItems?.length)

  if (!hasSubItems) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          active={item.active}
          variant="primary"
          tooltip={typeof item.label === "string" ? item.label : undefined}
          onClick={item.onSelect}
        >
          {item.icon}
          <span className="truncate group-data-[collapsible=icon]:hidden">
            {item.label}
          </span>
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
        variant="primary"
        disclosure
        disclosureOpen={open}
        tooltip={typeof item.label === "string" ? item.label : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        {item.icon}
        <span className="truncate group-data-[collapsible=icon]:hidden">
          {item.label}
        </span>
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
