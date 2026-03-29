import { useState } from "react"

import { AlertDialog } from "@workspace/ui-components/stable/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui-components/stable/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui-components/stable/dropdown-menu"
import { Drawer } from "@workspace/ui-components/stable/drawer"
import { HoverCard } from "@workspace/ui-components/stable/hover-card"
import { Menubar } from "@workspace/ui-components/stable/menubar"
import { NavigationMenu } from "@workspace/ui-components/stable/navigation-menu"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui-components/stable/popover"
import { Sheet } from "@workspace/ui-components/stable/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui-components/stable/tooltip"

import { DemoSection } from "./shared"

export function OverlayDemo() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [dropdownChecked, setDropdownChecked] = useState(true)
  const [dropdownRole, setDropdownRole] = useState("member")

  return (
    <>
      <DemoSection title="Dialog / Popover / Tooltip">
        <div className="flex flex-wrap items-center gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>Open Dialog</DialogTrigger>
            <DialogPortal>
              <DialogOverlay />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>Dialog description text.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </DialogPortal>
          </Dialog>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverAnchor>
              <span className="inline-block" />
            </PopoverAnchor>
            <PopoverTrigger>Open Popover</PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Popover Title</PopoverTitle>
                <PopoverDescription>Popover description.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Hover Top</TooltipTrigger>
              <TooltipContent side="top">Top tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>Hover Right</TooltipTrigger>
              <TooltipContent side="right">Right tooltip</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DemoSection>

      <DemoSection title="Dropdown Menu / Menubar / Navigation Menu">
        <div className="grid gap-4 md:grid-cols-3">
          <DropdownMenu>
            <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent>
                <DropdownMenuLabel inset>Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                  <DropdownMenuCheckboxItem
                    checked={dropdownChecked}
                    onCheckedChange={setDropdownChecked}
                  >
                    Notifications
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={dropdownRole} onValueChange={setDropdownRole}>
                  <DropdownMenuRadioItem value="member">Member</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuShortcut>Ctrl+K</DropdownMenuShortcut>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>

          <Menubar
            menus={[
              {
                label: "File",
                items: [{ label: "New" }, { label: "Save" }, { label: "Delete", variant: "destructive" }],
              },
              {
                label: "Edit",
                items: [{ label: "Copy" }, { label: "Paste", disabled: true }],
              },
            ]}
          />

          <NavigationMenu
            items={[
              {
                type: "group",
                label: "Docs",
                links: [
                  { label: "Getting Started", href: "#" },
                  { label: "Components", href: "#" },
                ],
              },
              { type: "link", label: "API", href: "#" },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection title="Sheet / Drawer / Alert Dialog / Hover Card">
        <div className="grid gap-3 md:grid-cols-4">
          <Sheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            triggerLabel="Open Sheet"
            title="Sheet Title"
            description="Panel from right side"
            side="right"
          />

          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            triggerLabel="Open Drawer"
            title="Drawer Title"
            description="Bottom drawer example"
            closeLabel="Dismiss"
          />

          <AlertDialog
            open={alertOpen}
            onOpenChange={setAlertOpen}
            triggerLabel="Open Alert"
            title="Confirm Action"
            description="This operation cannot be undone."
            confirmLabel="Proceed"
          />

          <div className="flex items-center">
            <HoverCard
              triggerLabel={<span className="underline">Hover Preview</span>}
              title="Hover Card"
              description="Open delay and close delay are configured in wrapper props."
              openDelay={100}
              closeDelay={100}
            />
          </div>
        </div>
      </DemoSection>
    </>
  )
}
