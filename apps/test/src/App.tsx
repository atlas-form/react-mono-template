import { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui-components/stable/accordion"
import { AlertDialog } from "@workspace/ui-components/stable/alert-dialog"
import { AvatarStack } from "@workspace/ui-components/stable/avatar"
import { Breadcrumb } from "@workspace/ui-components/stable/breadcrumb"
import { ButtonGroup } from "@workspace/ui-components/stable/button-group"
import { Calendar } from "@workspace/ui-components/stable/calendar"
import { Combobox } from "@workspace/ui-components/stable/combobox"
import { Command } from "@workspace/ui-components/stable/command"
import { ContextMenu } from "@workspace/ui-components/stable/context-menu"
import { Drawer } from "@workspace/ui-components/stable/drawer"
import { InputGroup } from "@workspace/ui-components/stable/input-group"
import { InputOTP } from "@workspace/ui-components/stable/input-otp"
import { Menubar } from "@workspace/ui-components/stable/menubar"
import { NavigationMenu } from "@workspace/ui-components/stable/navigation-menu"
import { Pagination } from "@workspace/ui-components/stable/pagination"
import { Sheet } from "@workspace/ui-components/stable/sheet"
import { Toggle } from "@workspace/ui-components/stable/toggle"
import { ToggleGroup } from "@workspace/ui-components/stable/toggle-group"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border p-4">
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
]

export function App() {
  const [accordionValue, setAccordionValue] = useState("item-1")
  const [comboboxValue, setComboboxValue] = useState<string | null>("react")
  const [selectedCommand, setSelectedCommand] = useState("")

  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())
  const [page, setPage] = useState(1)

  const [inputGroupValue, setInputGroupValue] = useState("")
  const [otpValue, setOtpValue] = useState("")

  const [togglePressed, setTogglePressed] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState("center")

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-4 p-6" lang="zh-CN">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">UI Components P1 Test</h1>
        <p className="text-sm text-muted-foreground">
          本页验证 P1 组件的 ui-components 封装行为（非 ui-core 直出）。
        </p>
      </header>

      <Section title="Accordion">
        <Accordion
          type="single"
          value={accordionValue}
          onValueChange={setAccordionValue}
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is ui-components stable API?</AccordionTrigger>
            <AccordionContent>
              Stable components expose fixed, explicit props with predictable behavior.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does it relate to ui-core?</AccordionTrigger>
            <AccordionContent>
              ui-components builds product-level wrappers on top of ui-core primitives.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" disabled>
            <AccordionTrigger>Disabled item</AccordionTrigger>
            <AccordionContent>This item should not be interactive.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Combobox / Command">
        <div className="grid gap-4 md:grid-cols-2">
          <Combobox
            value={comboboxValue}
            onValueChange={setComboboxValue}
            options={FRAMEWORKS}
            placeholder="Choose framework"
          />

          <div className="space-y-2">
            <Command
              sections={[
                {
                  heading: "Suggestions",
                  items: [
                    { label: "Profile", value: "profile", shortcut: "⌘P" },
                    { label: "Billing", value: "billing", shortcut: "⌘B" },
                  ],
                },
                {
                  heading: "Settings",
                  items: [
                    { label: "Theme", value: "theme" },
                    { label: "Language", value: "language" },
                  ],
                },
              ]}
              onSelect={setSelectedCommand}
            />
            <p className="text-xs text-muted-foreground">
              selected command: {selectedCommand || "none"}
            </p>
          </div>
        </div>
      </Section>

      <Section title="Navigation Menu / Menubar / Context Menu">
        <div className="grid gap-4 md:grid-cols-3">
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

          <Menubar
            menus={[
              {
                label: "File",
                items: [{ label: "New Tab" }, { label: "Save" }],
              },
              {
                label: "Edit",
                items: [{ label: "Copy" }, { label: "Paste" }],
              },
            ]}
          />

          <ContextMenu
            trigger="Right click here"
            items={[{ label: "Back" }, { label: "Forward" }, { label: "Reload" }]}
          />
        </div>
      </Section>

      <Section title="Sheet / Drawer / Alert Dialog">
        <div className="grid gap-4 md:grid-cols-3">
          <Sheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            triggerLabel="Open Sheet"
            title="Sheet Title"
            description="Slide panel behavior test."
          />

          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            triggerLabel="Open Drawer"
            title="Drawer Title"
            description="Bottom drawer behavior test."
          />

          <AlertDialog
            open={alertOpen}
            onOpenChange={setAlertOpen}
            triggerLabel="Open Alert"
            title="Confirm action"
            description="This action cannot be undone."
          />
        </div>
      </Section>

      <Section title="Calendar / Pagination / Breadcrumb">
        <div className="grid gap-4 md:grid-cols-3">
          <Calendar value={calendarDate} onValueChange={setCalendarDate} />

          <div className="space-y-2">
            <Pagination page={page} totalPages={5} onPageChange={setPage} />
            <p className="text-xs text-muted-foreground">current page: {page}</p>
          </div>

          <Breadcrumb
            items={[
              { label: "Home", href: "#" },
              { label: "Library", href: "#" },
              { label: "Data" },
            ]}
          />
        </div>
      </Section>

      <Section title="Avatar / Input Group / Input OTP">
        <div className="grid gap-4 md:grid-cols-3">
          <AvatarStack
            users={[
              { src: "https://i.pravatar.cc/48?img=1", alt: "A", fallback: "A" },
              { src: "https://i.pravatar.cc/48?img=2", alt: "B", fallback: "B" },
            ]}
            overflowCount={3}
          />

          <InputGroup
            value={inputGroupValue}
            onValueChange={setInputGroupValue}
            placeholder="username"
            prefix="@"
            actionLabel="Check"
          />

          <InputOTP value={otpValue} onValueChange={setOtpValue} length={6} />
        </div>
      </Section>

      <Section title="Toggle / Toggle Group / Button Group">
        <div className="grid gap-4 md:grid-cols-3">
          <Toggle
            pressed={togglePressed}
            onPressedChange={setTogglePressed}
            label="Bold"
          />

          <ToggleGroup
            value={toggleGroupValue}
            onValueChange={setToggleGroupValue}
            options={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
          />

          <ButtonGroup items={["View", "List", "Grid"]} />
        </div>
      </Section>
    </main>
  )
}
