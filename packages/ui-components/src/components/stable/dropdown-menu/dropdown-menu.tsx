import type { ComponentProps } from "react"
import {
  DropdownMenu as HeadlessDropdownMenu,
  DropdownMenuCheckboxItem as HeadlessDropdownMenuCheckboxItem,
  DropdownMenuContent as HeadlessDropdownMenuContent,
  DropdownMenuGroup as HeadlessDropdownMenuGroup,
  DropdownMenuItem as HeadlessDropdownMenuItem,
  DropdownMenuLabel as HeadlessDropdownMenuLabel,
  DropdownMenuPortal as HeadlessDropdownMenuPortal,
  DropdownMenuRadioGroup as HeadlessDropdownMenuRadioGroup,
  DropdownMenuRadioItem as HeadlessDropdownMenuRadioItem,
  DropdownMenuSeparator as HeadlessDropdownMenuSeparator,
  DropdownMenuShortcut as HeadlessDropdownMenuShortcut,
  DropdownMenuSub as HeadlessDropdownMenuSub,
  DropdownMenuSubContent as HeadlessDropdownMenuSubContent,
  DropdownMenuSubTrigger as HeadlessDropdownMenuSubTrigger,
  DropdownMenuTrigger as HeadlessDropdownMenuTrigger,
} from "@workspace/ui-core/components/dropdown-menu"

export type DropdownMenuProps = ComponentProps<typeof HeadlessDropdownMenu>
export type DropdownMenuTriggerProps = ComponentProps<typeof HeadlessDropdownMenuTrigger>
export type DropdownMenuPortalProps = ComponentProps<typeof HeadlessDropdownMenuPortal>
export type DropdownMenuContentProps = ComponentProps<typeof HeadlessDropdownMenuContent>
export type DropdownMenuGroupProps = ComponentProps<typeof HeadlessDropdownMenuGroup>
export type DropdownMenuLabelProps = ComponentProps<typeof HeadlessDropdownMenuLabel>
export type DropdownMenuItemProps = ComponentProps<typeof HeadlessDropdownMenuItem>
export type DropdownMenuCheckboxItemProps = ComponentProps<typeof HeadlessDropdownMenuCheckboxItem>
export type DropdownMenuRadioGroupProps = ComponentProps<typeof HeadlessDropdownMenuRadioGroup>
export type DropdownMenuRadioItemProps = ComponentProps<typeof HeadlessDropdownMenuRadioItem>
export type DropdownMenuSeparatorProps = ComponentProps<typeof HeadlessDropdownMenuSeparator>
export type DropdownMenuShortcutProps = ComponentProps<typeof HeadlessDropdownMenuShortcut>
export type DropdownMenuSubProps = ComponentProps<typeof HeadlessDropdownMenuSub>
export type DropdownMenuSubTriggerProps = ComponentProps<typeof HeadlessDropdownMenuSubTrigger>
export type DropdownMenuSubContentProps = ComponentProps<typeof HeadlessDropdownMenuSubContent>

export function DropdownMenu(props: DropdownMenuProps) {
  return <HeadlessDropdownMenu {...props} />
}

export function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <HeadlessDropdownMenuTrigger {...props} />
}

export function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <HeadlessDropdownMenuPortal {...props} />
}

export function DropdownMenuContent(props: DropdownMenuContentProps) {
  return <HeadlessDropdownMenuContent {...props} />
}

export function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <HeadlessDropdownMenuGroup {...props} />
}

export function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  return <HeadlessDropdownMenuLabel {...props} />
}

export function DropdownMenuItem(props: DropdownMenuItemProps) {
  return <HeadlessDropdownMenuItem {...props} />
}

export function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps) {
  return <HeadlessDropdownMenuCheckboxItem {...props} />
}

export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  return <HeadlessDropdownMenuRadioGroup {...props} />
}

export function DropdownMenuRadioItem(props: DropdownMenuRadioItemProps) {
  return <HeadlessDropdownMenuRadioItem {...props} />
}

export function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  return <HeadlessDropdownMenuSeparator {...props} />
}

export function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  return <HeadlessDropdownMenuShortcut {...props} />
}

export function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <HeadlessDropdownMenuSub {...props} />
}

export function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps) {
  return <HeadlessDropdownMenuSubTrigger {...props} />
}

export function DropdownMenuSubContent(props: DropdownMenuSubContentProps) {
  return <HeadlessDropdownMenuSubContent {...props} />
}
