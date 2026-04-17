import { useTranslation } from "react-i18next"
import { Select } from "@workspace/ui-components/stable/select"

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "zhCN", label: "简体中文" },
]

export interface LanguageSwitchProps {
  className?: string
}

export function LanguageSwitch(_props: LanguageSwitchProps) {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language || "en"
  const currentValue =
    LANGUAGE_OPTIONS.find((item) => item.value === currentLanguage) ??
    LANGUAGE_OPTIONS.find((item) => currentLanguage.startsWith(item.value)) ??
    LANGUAGE_OPTIONS[0]

  return (
    <Select
      value={currentValue.value}
      onValueChange={(value) => {
        void i18n.changeLanguage(value)
      }}
      list={LANGUAGE_OPTIONS}
    />
  )
}
