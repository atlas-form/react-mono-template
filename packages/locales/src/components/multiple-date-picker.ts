import type { SupportedLanguage } from "../index"
import { localeResources } from "../resources"

export interface MultipleDatePickerCopy {
  placeholder: string
  selectedDays: (count: number) => string
}

export function getMultipleDatePickerCopy(language: SupportedLanguage) {
  const copy = localeResources[language].components.multipleDatePicker

  return {
    placeholder: copy.placeholder,
    selectedDays: (count: number) =>
      language === "zhCN"
        ? `已选择 ${count} ${copy.selectedDaysSuffix}`
        : `${count} ${copy.selectedDaysSuffix}`,
  }
}
