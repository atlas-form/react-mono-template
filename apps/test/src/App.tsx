import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { copy, type Locale } from "@/copy"
import { TestHeader } from "@/components/test-header"
import { UiCoreSelectSection } from "@/components/ui-core-select-section"
import { UiCoreSwitchSection } from "@/components/ui-core-switch-section"
import { UiCoreSliderSection } from "@/components/ui-core-slider-section"
import { UiCoreTabsSection } from "@/components/ui-core-tabs-section"
import { UiCoreCheckboxSection } from "@/components/ui-core-checkbox-section"
import { UiCoreRadioGroupSection } from "@/components/ui-core-radio-group-section"

export function App() {
  const { theme, setTheme } = useTheme()
  const [locale, setLocale] = useState<Locale>("zh-CN")
  const [selectValue, setSelectValue] = useState("option-1")
  const [switchChecked, setSwitchChecked] = useState(true)
  const [sliderValue, setSliderValue] = useState([40])
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [radioValue, setRadioValue] = useState("system")
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
      <UiCoreSwitchSection checked={switchChecked} onChange={setSwitchChecked} />
      <UiCoreSliderSection value={sliderValue} onChange={setSliderValue} />
      <UiCoreTabsSection />
      <UiCoreCheckboxSection checked={checkboxChecked} onChange={setCheckboxChecked} />
      <UiCoreRadioGroupSection value={radioValue} onChange={setRadioValue} />
      <footer className="text-xs text-muted-foreground">{t.footerHint}</footer>
    </main>
  )
}
