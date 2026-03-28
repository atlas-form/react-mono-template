import { AppSelect } from "@workspace/ui-components"
import type { Copy, Locale } from "@/copy"

type TestHeaderProps = {
  locale: Locale
  setLocale: (next: Locale) => void
  theme: "light" | "dark" | "system"
  setTheme: (next: "light" | "dark" | "system") => void
  t: Copy
}

export function TestHeader({
  locale,
  setLocale,
  theme,
  setTheme,
  t,
}: TestHeaderProps) {
  return (
    <>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{t.pageTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.pageDesc}</p>
      </header>

      <section className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-muted-foreground">{t.languageLabel}</span>
          <AppSelect
            value={locale}
            onValueChange={(next) => setLocale(next as Locale)}
            list={[
              { label: "中文", value: "zh-CN" },
              { label: "English", value: "en-US" },
            ]}
            className="w-full"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-muted-foreground">{t.themeLabel}</span>
          <AppSelect
            value={theme}
            onValueChange={(next) => setTheme(next as "light" | "dark" | "system")}
            list={[
              { label: locale === "zh-CN" ? "浅色" : "Light", value: "light" },
              { label: locale === "zh-CN" ? "深色" : "Dark", value: "dark" },
              { label: locale === "zh-CN" ? "跟随系统" : "System", value: "system" },
            ]}
            className="w-full"
          />
        </label>
      </section>
    </>
  )
}
