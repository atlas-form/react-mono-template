import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui-core/components/select"

type UiCoreSelectSectionProps = {
  value: string
  onChange: (next: string) => void
}

export function UiCoreSelectSection({ value, onChange }: UiCoreSelectSectionProps) {
  const items = Array.from({ length: 40 }, (_, index) => ({
    value: `option-${index + 1}`,
    label: `Option ${index + 1}`,
  }))

  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">Default Select (ui-core)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-core 的默认 styled 模式。
      </p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  )
}
