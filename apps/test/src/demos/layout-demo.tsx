import { useState } from "react"

import { DateTimeRangePicker } from "@workspace/app-components"
import { AspectRatio } from "@workspace/ui-components/stable/aspect-ratio"
import { Calendar } from "@workspace/ui-components/stable/calendar"
import { Carousel } from "@workspace/ui-components/stable/carousel"
import { Collapsible } from "@workspace/ui-components/stable/collapsible"
import { Resizable } from "@workspace/ui-components/stable/resizable"
import { ScrollArea } from "@workspace/ui-components/stable/scroll-area"

import { DemoSection } from "./shared"

export function LayoutDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState({
    from: new Date(new Date().setHours(9, 0, 0, 0)),
    to: new Date(new Date().setHours(18, 30, 45, 0)),
  })

  return (
    <>
      <DemoSection title="Collapsible / Calendar / Scroll Area / Date Time Range">
        <div className="grid gap-4 md:grid-cols-3">
          <Collapsible
            open={open}
            onOpenChange={setOpen}
            triggerLabel={open ? "Hide details" : "Show details"}
          >
            <div className="rounded border p-3 text-sm text-muted-foreground">
              This block demonstrates collapsible controlled mode.
            </div>
          </Collapsible>

          <Calendar value={date} onValueChange={setDate} />

          <ScrollArea
            height={220}
            items={Array.from({ length: 12 }, (_, i) => `Log event #${i + 1}`)}
          />
        </div>

        <div className="mt-4 max-w-xl">
          <DateTimeRangePicker value={range} onValueChange={(next) => setRange(next ?? {})} />
        </div>
      </DemoSection>

      <DemoSection title="Aspect Ratio / Carousel / Resizable">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <AspectRatio
              ratio={16 / 9}
              src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80"
              alt="Demo image"
            />
            <AspectRatio
              ratio={4 / 3}
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80"
              alt="Demo image two"
            />
          </div>

          <div className="space-y-6">
            <div className="px-10">
              <Carousel slides={["Slide A", "Slide B", "Slide C"]} />
            </div>

            <div className="h-[220px] rounded border p-2">
              <Resizable
                left={<div className="text-sm">Left panel</div>}
                right={<div className="text-sm">Right panel</div>}
                direction="horizontal"
              />
            </div>
          </div>
        </div>
      </DemoSection>
    </>
  )
}
