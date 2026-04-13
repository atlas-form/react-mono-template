import { useTranslation } from "react-i18next"
import { Select } from "@workspace/ui-components/stable/select"

const options = [
  { value: "en", label: "English" },
  { value: "zhCN", label: "简体中文" },
]

export default function LanguageControl() {
  const { i18n } = useTranslation()
  const current =
    options.find((item) => item.value === i18n.language) ??
    options.find((item) => i18n.language.startsWith(item.value)) ??
    options[0]

  return (
    <Select
      value={current.value}
      onValueChange={(value) => {
        void i18n.changeLanguage(value)
      }}
      list={options}
    />
  )
}
