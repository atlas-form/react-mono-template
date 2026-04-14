import { useTranslation } from "react-i18next"
import { Select } from "@workspace/ui-components/stable/select"

import { useTheme } from "@/components/theme-provider"

export type AppLanguage = "en" | "zhCN"

type DisplayControlsProps = {
  language: AppLanguage
  onLanguageChange: (language: AppLanguage) => void
}

const languageOptions = [
  { value: "en", label: "English" },
  { value: "zhCN", label: "简体中文" },
] as const

const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const

export function DisplayControls({
  language,
  onLanguageChange,
}: DisplayControlsProps) {
  const { theme, setTheme } = useTheme()
  const { i18n } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-[180px]">
        <Select
          value={language}
          onValueChange={(value) => {
            const nextLanguage = value as AppLanguage
            onLanguageChange(nextLanguage)
            void i18n.changeLanguage(nextLanguage)
          }}
          placeholder="Language"
          list={languageOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
      </div>

      <div className="w-[180px]">
        <Select
          value={theme}
          onValueChange={(value) => setTheme(value as "system" | "light" | "dark")}
          placeholder="Theme"
          list={themeOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
      </div>
    </div>
  )
}
