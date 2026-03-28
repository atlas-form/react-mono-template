import { Slider } from "@workspace/ui-core/components/slider"

type UiCoreSliderSectionProps = {
  value: number[]
  onChange: (next: number[]) => void
}

export function UiCoreSliderSection({ value, onChange }: UiCoreSliderSectionProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">Default Slider (ui-core)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-core 的默认 styled 模式。
      </p>
      <div className="space-y-2">
        <Slider
          value={value}
          onValueChange={onChange}
          min={0}
          max={100}
          step={1}
          className="w-[260px]"
        />
        <p className="text-sm text-muted-foreground">value: {value[0] ?? 0}</p>
      </div>
    </section>
  )
}
