import { useState } from "react"

import { AspectRatio } from "@workspace/ui-components/stable/aspect-ratio"
import { Carousel } from "@workspace/ui-components/stable/carousel"
import { Collapsible } from "@workspace/ui-components/stable/collapsible"
import { HoverCard } from "@workspace/ui-components/stable/hover-card"
import { Item } from "@workspace/ui-components/stable/item"
import { Kbd } from "@workspace/ui-components/stable/kbd"
import { NativeSelect } from "@workspace/ui-components/stable/native-select"
import { Resizable } from "@workspace/ui-components/stable/resizable"
import { ScrollArea } from "@workspace/ui-components/stable/scroll-area"
import { Sidebar } from "@workspace/ui-components/stable/sidebar"

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

export function App() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [selectedFramework, setSelectedFramework] = useState("react")

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-4 p-6" lang="zh-CN">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">UI Components P2 Test</h1>
        <p className="text-sm text-muted-foreground">
          本页仅验证 P2 组件封装：Collapsible / HoverCard / ScrollArea / Carousel / Sidebar /
          Resizable / AspectRatio / NativeSelect / Item / Kbd。
        </p>
      </header>

      <Section title="Collapsible + Hover Card">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Collapsible
              open={collapsibleOpen}
              onOpenChange={setCollapsibleOpen}
              triggerLabel={collapsibleOpen ? "Hide Details" : "Show Details"}
            >
              <div className="rounded border p-3 text-sm text-muted-foreground">
                Collapsible content is visible and controlled by ui-components fixed API.
              </div>
            </Collapsible>
          </div>

          <div className="flex items-center">
            <HoverCard
              triggerLabel={<span className="text-sm underline">Hover to preview</span>}
              title="P2 Hover Card"
              description="This content is rendered by the ui-components hover-card wrapper."
            />
          </div>
        </div>
      </Section>

      <Section title="Scroll Area + Carousel">
        <div className="grid gap-8 md:grid-cols-2">
          <ScrollArea
            height={180}
            items={[
              "Design token sync",
              "A11y checklist",
              "Cross-browser verification",
              "Release note drafting",
              "QA handoff",
              "Monitoring setup",
            ]}
          />

          <div className="px-12">
            <Carousel slides={["Slide 1", "Slide 2", "Slide 3"]} />
          </div>
        </div>
      </Section>

      <Section title="Sidebar + Resizable">
        <div className="grid gap-4 md:grid-cols-2">
          <Sidebar
            title="Workspace"
            menu={[
              { label: "Overview", href: "#", active: true },
              { label: "Components", href: "#" },
              { label: "Releases", href: "#" },
            ]}
          >
            <div className="text-sm text-muted-foreground">
              Sidebar wrapper provides a fixed navigation shell for product screens.
            </div>
          </Sidebar>

          <div className="h-[320px] rounded-xl border p-2">
            <Resizable
              left={<div className="text-sm">Left panel</div>}
              right={<div className="text-sm">Right panel</div>}
            />
          </div>
        </div>
      </Section>

      <Section title="Aspect Ratio + Native Select">
        <div className="grid gap-4 md:grid-cols-2">
          <AspectRatio
            ratio={16 / 9}
            src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80"
            alt="Desk setup"
          />

          <div className="space-y-2">
            <NativeSelect
              value={selectedFramework}
              onValueChange={setSelectedFramework}
              options={[
                { label: "React", value: "react" },
                { label: "Vue", value: "vue" },
                { label: "Svelte", value: "svelte" },
              ]}
              placeholder="Select framework"
            />
            <p className="text-xs text-muted-foreground">selected: {selectedFramework}</p>
          </div>
        </div>
      </Section>

      <Section title="Item + Kbd">
        <div className="grid gap-4 md:grid-cols-2">
          <Item
            title="Save Changes"
            description="Persist current form state to the server"
            leading={<span>SV</span>}
            trailing={<Kbd keys={["Ctrl", "S"]} />}
            footer={<span className="text-xs text-muted-foreground">Last updated 2m ago</span>}
            variant="outline"
          />

          <div className="flex items-center gap-3 rounded border p-3 text-sm">
            Quick command:
            <Kbd keys={["Ctrl", "K"]} />
          </div>
        </div>
      </Section>
    </main>
  )
}
