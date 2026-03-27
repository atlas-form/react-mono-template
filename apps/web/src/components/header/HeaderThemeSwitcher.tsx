import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  getStoredThemeMode,
  setThemeMode,
  type ThemeMode,
} from "@workspace/ui-theme"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui-core/components/select"

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
    >
      <SelectTrigger className="ui-header-trigger">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="ui-header-menu ui-header-menu-sm">
        {THEME_OPTIONS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {t(item.key)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
