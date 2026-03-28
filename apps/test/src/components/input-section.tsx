import { Input } from "@workspace/ui-components"
import type { Copy } from "@/copy"

type InputSectionProps = {
  t: Copy
  value: string
  onChange: (next: string) => void
}

export function InputSection({ t, value, onChange }: InputSectionProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">{t.inputTitle}</h2>
      <p className="text-sm text-muted-foreground">{t.inputDesc}</p>
      <div className="grid gap-3">
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t.inputPlaceholder}
        />
        <Input placeholder={t.searchPlaceholder} />
        <p className="text-xs text-muted-foreground">
          {t.lengthLabel}
          {value.length}
        </p>
      </div>
    </section>
  )
}
