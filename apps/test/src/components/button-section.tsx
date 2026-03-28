import { Button } from "@workspace/ui-components"
import type { Copy } from "@/copy"

type ButtonSectionProps = {
  t: Copy
}

export function ButtonSection({ t }: ButtonSectionProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">{t.basicTitle}</h2>
      <p className="text-sm text-muted-foreground">{t.basicDesc}</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">{t.buttonPrimary}</Button>
        <Button variant="secondary">{t.buttonSecondary}</Button>
        <Button variant="outline">{t.buttonSubtle}</Button>
        <Button>{t.buttonDefault}</Button>
        <Button variant="ghost">{t.buttonGhost}</Button>
        <Button variant="link">{t.buttonLink}</Button>
        <Button variant="primary" disabled>
          {t.buttonDisabled}
        </Button>
      </div>
    </section>
  )
}
