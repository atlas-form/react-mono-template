import { lazy, Suspense, useEffect, useState } from "react"

import {
  DisplayControls,
  type AppLanguage,
} from "@/components/display-controls"

const FoundationDemo = lazy(async () => {
  const mod = await import("./demos/foundation-demo")
  return { default: mod.FoundationDemo }
})

const InteractionDemo = lazy(async () => {
  const mod = await import("./demos/interaction-demo")
  return { default: mod.InteractionDemo }
})

const OverlayDemo = lazy(async () => {
  const mod = await import("./demos/overlay-demo")
  return { default: mod.OverlayDemo }
})

const LayoutDemo = lazy(async () => {
  const mod = await import("./demos/layout-demo")
  return { default: mod.LayoutDemo }
})

const DataDemo = lazy(async () => {
  const mod = await import("./demos/data-demo")
  return { default: mod.DataDemo }
})

const LANGUAGE_STORAGE_KEY = "test-language"

function getInitialLanguage(): AppLanguage {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored === "en" || stored === "zh-CN") {
    return stored
  }

  const docLang = document.documentElement.lang
  if (docLang === "zh-CN") {
    return "zh-CN"
  }

  return "en"
}

export function App() {
  const [language, setLanguage] = useState<AppLanguage>(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  const title =
    language === "zh-CN"
      ? "UI Components Stable 组件测试页"
      : "UI Components Stable Test Page"
  const subtitle =
    language === "zh-CN"
      ? "顶部可切换语言与主题。已接入所有 stable 组件（排除 Sidebar）。"
      : "Language and theme selectors are available above. All stable components are included except Sidebar."

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-4 p-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <DisplayControls language={language} onLanguageChange={setLanguage} />
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </header>

      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading demos...</p>
        }
      >
        <FoundationDemo />
        <InteractionDemo />
        <OverlayDemo />
        <LayoutDemo />
        <DataDemo />
      </Suspense>
    </main>
  )
}
