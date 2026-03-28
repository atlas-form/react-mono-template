import { Checkbox } from "@workspace/ui-core/components/checkbox"

type UiCoreCheckboxSectionProps = {
  checked: boolean
  onChange: (next: boolean) => void
}

export function UiCoreCheckboxSection({
  checked,
  onChange,
}: UiCoreCheckboxSectionProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">Default Checkbox (ui-core)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-core 的默认 styled 模式。
      </p>
      <label className="flex items-center gap-3 text-sm">
        <Checkbox checked={checked} onCheckedChange={(next) => onChange(next === true)} />
        Receive email updates
      </label>
    </section>
  )
}
