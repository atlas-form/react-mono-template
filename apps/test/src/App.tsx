import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { copy, type Locale } from "@/copy"
import { TestHeader } from "@/components/test-header"
import { UiCoreSelectSection } from "@/components/ui-core-select-section"

export function App() {
  const { theme, setTheme } = useTheme()
  const [locale, setLocale] = useState<Locale>("zh-CN")
  const [selectValue, setSelectValue] = useState("grayscale")
  const t = copy[locale]

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-6 p-6" lang={locale}>
      <TestHeader
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        setTheme={setTheme}
        t={t}
      />
      <UiCoreSelectSection value={selectValue} onChange={setSelectValue} />

      <footer className="text-xs text-muted-foreground">{t.footerHint}</footer>
    </main>
  )
}
