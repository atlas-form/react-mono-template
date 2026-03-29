import { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui-components/stable/accordion"
import { Avatar, AvatarStack } from "@workspace/ui-components/stable/avatar"
import { Breadcrumb } from "@workspace/ui-components/stable/breadcrumb"
import { ButtonGroup } from "@workspace/ui-components/stable/button-group"
import { Combobox } from "@workspace/ui-components/stable/combobox"
import { Command } from "@workspace/ui-components/stable/command"
import { ContextMenu } from "@workspace/ui-components/stable/context-menu"
import { InputGroup } from "@workspace/ui-components/stable/input-group"
import { InputOTP } from "@workspace/ui-components/stable/input-otp"
import { Item } from "@workspace/ui-components/stable/item"
import { Kbd } from "@workspace/ui-components/stable/kbd"
import { Pagination } from "@workspace/ui-components/stable/pagination"
import { Slider } from "@workspace/ui-components/stable/slider"
import { Toggle } from "@workspace/ui-components/stable/toggle"
import { ToggleGroup } from "@workspace/ui-components/stable/toggle-group"

import { DemoSection } from "./shared"

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid", disabled: true },
]

export function InteractionDemo() {
  const [accordionValue, setAccordionValue] = useState("item-1")
  const [comboboxValue, setComboboxValue] = useState<string | null>("react")
  const [selectedCommand, setSelectedCommand] = useState("")
  const [page, setPage] = useState(2)
  const [inputGroupValue, setInputGroupValue] = useState("alice")
  const [otpValue, setOtpValue] = useState("")
  const [togglePressed, setTogglePressed] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState("center")
  const [sliderValue, setSliderValue] = useState<number[]>([35])

  return (
    <>
      <DemoSection title="Accordion / Slider / Pagination">
        <div className="space-y-4">
          <Accordion
            type="single"
            value={accordionValue}
            onValueChange={setAccordionValue}
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>What is stable API?</AccordionTrigger>
              <AccordionContent>Fixed and explicit props are exposed.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How to test interaction?</AccordionTrigger>
              <AccordionContent>Use controlled state and disabled variations.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" disabled>
              <AccordionTrigger>Disabled Item</AccordionTrigger>
              <AccordionContent>Should not open.</AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-2">
            <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={5} />
            <Slider value={[60]} onValueChange={() => {}} disabled />
            <div className="text-xs text-muted-foreground">slider value: {sliderValue[0]}</div>
          </div>

          <Pagination page={page} totalPages={6} onPageChange={setPage} />
        </div>
      </DemoSection>

      <DemoSection title="Combobox / Command / Context Menu">
        <div className="grid gap-4 md:grid-cols-3">
          <Combobox
            value={comboboxValue}
            onValueChange={setComboboxValue}
            options={FRAMEWORKS}
            placeholder="Pick framework"
            allowClear
          />

          <div className="space-y-2">
            <Command
              sections={[
                {
                  heading: "General",
                  items: [
                    { label: "Profile", value: "profile", shortcut: "P" },
                    { label: "Billing", value: "billing", shortcut: "B" },
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
            <div className="text-xs text-muted-foreground">selected: {selectedCommand || "none"}</div>
          </div>

          <ContextMenu
            trigger="Right click here"
            items={[
              { label: "Back" },
              { label: "Forward" },
              { label: "Delete", variant: "destructive" },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection title="Avatar / Breadcrumb / Input Group / Input OTP">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar alt="Alice" fallback="AL" />
              <Avatar src="https://i.pravatar.cc/48?img=8" alt="Bob" fallback="BO" />
            </div>

            <AvatarStack
              users={[
                { src: "https://i.pravatar.cc/48?img=1", alt: "A", fallback: "A" },
                { src: "https://i.pravatar.cc/48?img=2", alt: "B", fallback: "B" },
              ]}
              overflowCount={2}
            />

            <Breadcrumb
              items={[
                { label: "Home", href: "#" },
                { label: "Library", href: "#" },
                { label: "Data" },
              ]}
            />
          </div>

          <div className="space-y-4">
            <InputGroup
              value={inputGroupValue}
              onValueChange={setInputGroupValue}
              prefix="@"
              actionLabel="Check"
            />
            <InputGroup
              value={inputGroupValue}
              onValueChange={setInputGroupValue}
              placeholder="without prefix"
            />

            <InputOTP value={otpValue} onValueChange={setOtpValue} length={6} />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Toggle / Toggle Group / Button Group / Item / Kbd">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Toggle pressed={togglePressed} onPressedChange={setTogglePressed} label="Bold" />
            <Toggle
              pressed={false}
              onPressedChange={() => {}}
              label="Disabled"
              disabled
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
            <ButtonGroup items={["A", "B", "C"]} orientation="vertical" />
          </div>

          <div className="space-y-3">
            <Item
              title="Deploy Service"
              description="Starts rollout for selected environment"
              leading={<span>DS</span>}
              trailing={<Kbd keys={["Ctrl", "D"]} />}
              variant="outline"
            />
            <Item
              title="Background Sync"
              description="Automatically refreshes every 5 minutes"
              leading={<span>BG</span>}
              variant="muted"
              size="sm"
            />
          </div>
        </div>
      </DemoSection>
    </>
  )
}
