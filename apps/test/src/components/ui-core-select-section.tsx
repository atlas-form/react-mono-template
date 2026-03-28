import { AppSelect } from "@workspace/ui-components"

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
      <h2 className="text-base font-medium">Default Select (ui-components)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-components 的 AppSelect 验证与 headless 是否一致。
      </p>
      <AppSelect
        value={value}
        onValueChange={onChange}
        className="w-[220px]"
        list={items}
      />
    </section>
  )
}
