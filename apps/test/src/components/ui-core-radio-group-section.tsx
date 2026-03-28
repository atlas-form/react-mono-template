import { RadioGroup, RadioGroupItem } from "@workspace/ui-core/components/radio-group"

type UiCoreRadioGroupSectionProps = {
  value: string
  onChange: (next: string) => void
}

const options = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
]

export function UiCoreRadioGroupSection({
  value,
  onChange,
}: UiCoreRadioGroupSectionProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">Default Radio Group (ui-core)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-core 的默认 styled 模式。
      </p>
      <RadioGroup value={value} onValueChange={onChange} className="gap-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-3 text-sm">
            <RadioGroupItem value={option.value} />
            {option.label}
          </label>
        ))}
      </RadioGroup>
    </section>
  )
}
