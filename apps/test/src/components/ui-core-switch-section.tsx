import { Switch } from "@workspace/ui-core/components/switch"

type UiCoreSwitchSectionProps = {
  checked: boolean
  onChange: (next: boolean) => void
}

export function UiCoreSwitchSection({ checked, onChange }: UiCoreSwitchSectionProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">Default Switch (ui-core)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-core 的默认 styled 模式。
      </p>
      <div className="flex items-center gap-3">
        <Switch checked={checked} onCheckedChange={onChange} />
        <span className="text-sm text-muted-foreground">
          state: {checked ? "on" : "off"}
        </span>
      </div>
    </section>
  )
}
