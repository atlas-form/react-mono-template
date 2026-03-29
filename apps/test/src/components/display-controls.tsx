import { Select } from "@workspace/ui-components/stable/select"

import { useTheme } from "@/components/theme-provider"

export type AppLanguage = "en" | "zh-CN"

type DisplayControlsProps = {
  language: AppLanguage
  onLanguageChange: (language: AppLanguage) => void
}

const languageOptions = [
  { value: "en", label: "English" },
  { value: "zh-CN", label: "简体中文" },
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

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-[180px]">
        <Select
          value={language}
          onValueChange={(value) => onLanguageChange(value as AppLanguage)}
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
