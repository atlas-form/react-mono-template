import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  getStoredThemeMode,
  setThemeMode,
  type ThemeMode,
} from "@workspace/ui-theme"
import { Select } from "@workspace/ui-components/select"

const THEME_OPTIONS: Array<{ value: ThemeMode; key: string }> = [
  { value: "system", key: "header.theme.system" },
  { value: "light", key: "header.theme.light" },
  { value: "dark", key: "header.theme.dark" },
]

export default function HeaderThemeSwitcher() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<ThemeMode>(getStoredThemeMode())

  return (
    <Select
      value={theme}
      onValueChange={(value) => {
        const next = value as ThemeMode
        setTheme(next)
        setThemeMode(next)
      }}
      list={THEME_OPTIONS.map((item) => ({
        value: item.value,
        label: t(item.key),
      }))}
    />
  )
}
