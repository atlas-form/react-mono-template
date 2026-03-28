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
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">Default Select (ui-core)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-core/components/select（headless 导出）直接验证 hover 状态。
      </p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="grayscale">Grayscale</SelectItem>
          <SelectItem value="vivid">Vivid</SelectItem>
          <SelectItem value="natural">Natural</SelectItem>
        </SelectContent>
      </Select>
    </section>
  )
}
