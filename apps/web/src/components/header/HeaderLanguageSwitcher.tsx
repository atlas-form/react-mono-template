import { useTranslation } from "react-i18next"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui-core/components/select"

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "zhCN", label: "简体中文" },
]

export default function HeaderLanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || "en"
  const currentValue =
    LANGUAGE_OPTIONS.find((item) => item.value === currentLang) ??
    LANGUAGE_OPTIONS.find((item) => currentLang.startsWith(item.value)) ??
    LANGUAGE_OPTIONS[0]

  return (
    <Select
      value={currentValue.value}
      onValueChange={(value) => {
        void i18n.changeLanguage(value)
      }}
    >
      <SelectTrigger className="ui-header-trigger">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="ui-header-menu ui-header-menu-sm">
        {LANGUAGE_OPTIONS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
