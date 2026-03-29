import type { ComponentProps } from "react"
import {
  DropdownMenu as CoreDropdownMenu,
  DropdownMenuCheckboxItem as CoreDropdownMenuCheckboxItem,
  DropdownMenuContent as CoreDropdownMenuContent,
  DropdownMenuGroup as CoreDropdownMenuGroup,
  DropdownMenuItem as CoreDropdownMenuItem,
  DropdownMenuLabel as CoreDropdownMenuLabel,
  DropdownMenuPortal as CoreDropdownMenuPortal,
  DropdownMenuRadioGroup as CoreDropdownMenuRadioGroup,
  DropdownMenuRadioItem as CoreDropdownMenuRadioItem,
  DropdownMenuSeparator as CoreDropdownMenuSeparator,
  DropdownMenuShortcut as CoreDropdownMenuShortcut,
  DropdownMenuSub as CoreDropdownMenuSub,
  DropdownMenuSubContent as CoreDropdownMenuSubContent,
  DropdownMenuSubTrigger as CoreDropdownMenuSubTrigger,
  DropdownMenuTrigger as CoreDropdownMenuTrigger,
} from "@workspace/ui-core/components/dropdown-menu"

export type DropdownMenuProps = ComponentProps<typeof CoreDropdownMenu>
export type DropdownMenuTriggerProps = ComponentProps<typeof CoreDropdownMenuTrigger>
export type DropdownMenuPortalProps = ComponentProps<typeof CoreDropdownMenuPortal>
export type DropdownMenuContentProps = ComponentProps<typeof CoreDropdownMenuContent>
export type DropdownMenuGroupProps = ComponentProps<typeof CoreDropdownMenuGroup>
export type DropdownMenuLabelProps = ComponentProps<typeof CoreDropdownMenuLabel>
export type DropdownMenuItemProps = ComponentProps<typeof CoreDropdownMenuItem>
export type DropdownMenuCheckboxItemProps = ComponentProps<typeof CoreDropdownMenuCheckboxItem>
export type DropdownMenuRadioGroupProps = ComponentProps<typeof CoreDropdownMenuRadioGroup>
export type DropdownMenuRadioItemProps = ComponentProps<typeof CoreDropdownMenuRadioItem>
export type DropdownMenuSeparatorProps = ComponentProps<typeof CoreDropdownMenuSeparator>
export type DropdownMenuShortcutProps = ComponentProps<typeof CoreDropdownMenuShortcut>
export type DropdownMenuSubProps = ComponentProps<typeof CoreDropdownMenuSub>
export type DropdownMenuSubTriggerProps = ComponentProps<typeof CoreDropdownMenuSubTrigger>
export type DropdownMenuSubContentProps = ComponentProps<typeof CoreDropdownMenuSubContent>

export function DropdownMenu(props: DropdownMenuProps) {
  return <CoreDropdownMenu {...props} />
}

export function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <CoreDropdownMenuTrigger {...props} />
}

export function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <CoreDropdownMenuPortal {...props} />
}

export function DropdownMenuContent(props: DropdownMenuContentProps) {
  return <CoreDropdownMenuContent {...props} />
}

export function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <CoreDropdownMenuGroup {...props} />
}

export function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  return <CoreDropdownMenuLabel {...props} />
}

export function DropdownMenuItem(props: DropdownMenuItemProps) {
  return <CoreDropdownMenuItem {...props} />
}

export function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps) {
  return <CoreDropdownMenuCheckboxItem {...props} />
}

export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  return <CoreDropdownMenuRadioGroup {...props} />
}

export function DropdownMenuRadioItem(props: DropdownMenuRadioItemProps) {
  return <CoreDropdownMenuRadioItem {...props} />
}

export function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  return <CoreDropdownMenuSeparator {...props} />
}

export function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  return <CoreDropdownMenuShortcut {...props} />
}

export function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <CoreDropdownMenuSub {...props} />
}

export function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps) {
  return <CoreDropdownMenuSubTrigger {...props} />
}

export function DropdownMenuSubContent(props: DropdownMenuSubContentProps) {
  return <CoreDropdownMenuSubContent {...props} />
}
