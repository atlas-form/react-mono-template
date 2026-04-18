import type { ReactNode } from "react"
import {
  Sidebar as CoreSidebar,
  SidebarContent as CoreSidebarContent,
  SidebarFooter as CoreSidebarFooter,
  SidebarGroup as CoreSidebarGroup,
  SidebarGroupContent as CoreSidebarGroupContent,
  SidebarGroupLabel as CoreSidebarGroupLabel,
  SidebarHeader as CoreSidebarHeader,
  SidebarInset as CoreSidebarInset,
  SidebarMenu as CoreSidebarMenu,
  SidebarMenuButton as CoreSidebarMenuButton,
  SidebarMenuItem as CoreSidebarMenuItem,
  SidebarMenuSub as CoreSidebarMenuSub,
  SidebarMenuSubButton as CoreSidebarMenuSubButton,
  SidebarMenuSubItem as CoreSidebarMenuSubItem,
  SidebarProvider as CoreSidebarProvider,
  SidebarSeparator as CoreSidebarSeparator,
  SidebarTrigger as CoreSidebarTrigger,
} from "@workspace/ui-core/components/sidebar"

export type SidebarSide = "left" | "right"
export type SidebarVariant = "sidebar" | "floating" | "inset"
export type SidebarCollapsible = "offcanvas" | "icon" | "none"
export type SidebarMenuButtonVariant = "default" | "outline"
export type SidebarMenuButtonSize = "default" | "sm" | "lg"
export type SidebarMenuSubButtonSize = "sm" | "md"

export interface SidebarProviderProps {
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface SidebarProps {
  children: ReactNode
  side?: SidebarSide
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
}

export interface SidebarTriggerProps {
  ariaLabel?: string
}

export interface SidebarInsetProps {
  children: ReactNode
}

export interface SidebarHeaderProps {
  children: ReactNode
}

export interface SidebarFooterProps {
  children: ReactNode
}

export interface SidebarContentProps {
  children: ReactNode
}

export interface SidebarGroupProps {
  children: ReactNode
}

export interface SidebarGroupLabelProps {
  children: ReactNode
}

export interface SidebarGroupContentProps {
  children: ReactNode
}

export interface SidebarMenuProps {
  children: ReactNode
}

export interface SidebarMenuItemProps {
  children: ReactNode
}

export interface SidebarMenuButtonProps {
  children: ReactNode
  active?: boolean
  disabled?: boolean
  tooltip?: string
  variant?: SidebarMenuButtonVariant
  size?: SidebarMenuButtonSize
  onClick?: () => void
}

export interface SidebarMenuSubProps {
  children: ReactNode
}

export interface SidebarMenuSubItemProps {
  children: ReactNode
}

export interface SidebarMenuSubButtonProps {
  children: ReactNode
  href: string
  active?: boolean
  size?: SidebarMenuSubButtonSize
  onClick?: () => void
}

export function SidebarProvider({
  children,
  defaultOpen,
  open,
  onOpenChange,
}: SidebarProviderProps) {
  return (
    <CoreSidebarProvider
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </CoreSidebarProvider>
  )
}

export function Sidebar({
  children,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
}: SidebarProps) {
  return (
    <CoreSidebar side={side} variant={variant} collapsible={collapsible}>
      {children}
    </CoreSidebar>
  )
}

export function SidebarTrigger({
  ariaLabel = "Toggle sidebar",
}: SidebarTriggerProps) {
  return <CoreSidebarTrigger aria-label={ariaLabel} />
}

export function SidebarInset({ children }: SidebarInsetProps) {
  return <CoreSidebarInset>{children}</CoreSidebarInset>
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <CoreSidebarHeader>{children}</CoreSidebarHeader>
}

export function SidebarFooter({ children }: SidebarFooterProps) {
  return <CoreSidebarFooter>{children}</CoreSidebarFooter>
}

export function SidebarContent({ children }: SidebarContentProps) {
  return <CoreSidebarContent>{children}</CoreSidebarContent>
}

export function SidebarSeparator() {
  return <CoreSidebarSeparator />
}

export function SidebarGroup({ children }: SidebarGroupProps) {
  return <CoreSidebarGroup>{children}</CoreSidebarGroup>
}

export function SidebarGroupLabel({ children }: SidebarGroupLabelProps) {
  return <CoreSidebarGroupLabel>{children}</CoreSidebarGroupLabel>
}

export function SidebarGroupContent({ children }: SidebarGroupContentProps) {
  return <CoreSidebarGroupContent>{children}</CoreSidebarGroupContent>
}

export function SidebarMenu({ children }: SidebarMenuProps) {
  return <CoreSidebarMenu>{children}</CoreSidebarMenu>
}

export function SidebarMenuItem({ children }: SidebarMenuItemProps) {
  return <CoreSidebarMenuItem>{children}</CoreSidebarMenuItem>
}

export function SidebarMenuButton({
  children,
  active = false,
  disabled = false,
  tooltip,
  variant = "default",
  size = "default",
  onClick,
}: SidebarMenuButtonProps) {
  return (
    <CoreSidebarMenuButton
      isActive={active}
      disabled={disabled}
      tooltip={tooltip}
      variant={variant}
      size={size}
      onClick={onClick}
    >
      {children}
    </CoreSidebarMenuButton>
  )
}

export function SidebarMenuSub({ children }: SidebarMenuSubProps) {
  return <CoreSidebarMenuSub>{children}</CoreSidebarMenuSub>
}

export function SidebarMenuSubItem({ children }: SidebarMenuSubItemProps) {
  return <CoreSidebarMenuSubItem>{children}</CoreSidebarMenuSubItem>
}

export function SidebarMenuSubButton({
  children,
  href,
  active = false,
  size = "md",
  onClick,
}: SidebarMenuSubButtonProps) {
  return (
    <CoreSidebarMenuSubButton
      href={href}
      isActive={active}
      size={size}
      onClick={onClick}
    >
      {children}
    </CoreSidebarMenuSubButton>
  )
}
