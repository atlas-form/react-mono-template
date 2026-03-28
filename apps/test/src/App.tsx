import { useState } from "react"
import { Button } from "@workspace/ui-components"
import { useTheme } from "@/components/theme-provider"
import { copy, type Locale } from "@/copy"
import { InputSection } from "@/components/input-section"
import { TestHeader } from "@/components/test-header"
import { UiCoreSelectSection } from "@/components/ui-core-select-section"

export function App() {
  const { theme, setTheme } = useTheme()
  const [locale, setLocale] = useState<Locale>("zh-CN")
  const [page, setPage] = useState<"select" | "input">("select")
  const [inputValue, setInputValue] = useState("")
  const [selectValue, setSelectValue] = useState("option-1")
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
      <section className="flex items-center gap-2">
        <Button
          variant={page === "select" ? "primary" : "outline"}
          onClick={() => setPage("select")}
        >
          Select
        </Button>
        <Button
          variant={page === "input" ? "primary" : "outline"}
          onClick={() => setPage("input")}
        >
          Input
        </Button>
      </section>
      {page === "select" ? (
        <UiCoreSelectSection value={selectValue} onChange={setSelectValue} />
      ) : (
        <InputSection t={t} value={inputValue} onChange={setInputValue} />
      )}

      <footer className="text-xs text-muted-foreground">{t.footerHint}</footer>
    </main>
  )
}
