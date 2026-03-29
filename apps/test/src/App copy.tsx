import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui-core/components/accordion"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui-core/components/combobox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui-core/components/command"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui-core/components/navigation-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@workspace/ui-core/components/menubar"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@workspace/ui-core/components/context-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui-core/components/sheet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui-core/components/drawer"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui-core/components/alert-dialog"
import { Calendar } from "@workspace/ui-core/components/calendar"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui-core/components/pagination"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui-core/components/breadcrumb"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@workspace/ui-core/components/avatar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui-core/components/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui-core/components/input-otp"
import { Toggle } from "@workspace/ui-core/components/toggle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui-core/components/toggle-group"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@workspace/ui-core/components/button-group"

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
]

export function App() {
  const [comboboxValue, setComboboxValue] = useState<string | null>("react")
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())
  const [otpValue, setOtpValue] = useState("")

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 p-6" lang="zh-CN">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">UI Core P1 Test Page</h1>
        <p className="text-sm text-muted-foreground">
          仅保留 P1 待测试组件；已完成组件不再出现在 test 页面。
        </p>
      </header>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">测试组件：Accordion</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is ui-core?</AccordionTrigger>
            <AccordionContent>Headless primitives with composable API.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Why P1 test?</AccordionTrigger>
            <AccordionContent>Validate interaction and accessibility behavior.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Combobox</h2>
          <Combobox value={comboboxValue} onValueChange={setComboboxValue} items={FRAMEWORKS}>
            <ComboboxInput placeholder="Choose framework..." />
            <ComboboxContent>
              <ComboboxEmpty>No result.</ComboboxEmpty>
              <ComboboxList>
                {FRAMEWORKS.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Command</h2>
          <Command>
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem value="profile">Profile</CommandItem>
                <CommandItem value="billing">Billing</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem value="theme">Theme</CommandItem>
                <CommandItem value="language">Language</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">测试组件：Navigation Menu</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-1 p-2 md:w-[260px]">
                  <li>
                    <NavigationMenuLink href="#">Getting Started</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#">Components</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">API</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Menubar</h2>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>Save</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Context Menu</h2>
          <ContextMenu>
            <ContextMenuTrigger className="rounded-lg border px-4 py-8 text-center text-sm text-muted-foreground">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Sheet</h2>
          <Sheet>
            <SheetTrigger asChild>
              <button className="rounded-md border px-3 py-2 text-sm">Open Sheet</button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>Slide panel behavior test.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Drawer</h2>
          <Drawer>
            <DrawerTrigger asChild>
              <button className="rounded-md border px-3 py-2 text-sm">Open Drawer</button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
                <DrawerDescription>Bottom drawer behavior test.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <button className="rounded-md border px-3 py-2 text-sm">Close</button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Alert Dialog</h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="rounded-md border px-3 py-2 text-sm">Open Alert</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm action</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Calendar</h2>
          <Calendar mode="single" selected={calendarDate} onSelect={setCalendarDate} />
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Pagination</h2>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Breadcrumb</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Library</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Data</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Avatar</h2>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/48?img=1" alt="A" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/48?img=2" alt="B" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Input Group</h2>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="username" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="xs">Check</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Input OTP</h2>
          <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Toggle</h2>
          <Toggle>Bold</Toggle>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Toggle Group</h2>
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Button Group</h2>
          <ButtonGroup>
            <ButtonGroupText>View</ButtonGroupText>
            <ButtonGroupSeparator />
            <ButtonGroupText>List</ButtonGroupText>
            <ButtonGroupSeparator />
            <ButtonGroupText>Grid</ButtonGroupText>
          </ButtonGroup>
        </div>
      </section>

      <footer className="text-xs text-muted-foreground">
        当前阶段：P1 组件测试中（slider 已完成，不在此页重复展示）。
      </footer>
    </main>
  )
}
