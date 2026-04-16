import type { SupportedLanguage } from "./index"

export interface MultipleDatePickerCopy {
  placeholder: string
  selectedDays: (count: number) => string
}

const MULTIPLE_DATE_PICKER_COPY: Record<
  SupportedLanguage,
  MultipleDatePickerCopy
> = {
  en: {
    placeholder: "Select multiple dates",
    selectedDays: (count: number) => `${count} days selected`,
  },
  zhCN: {
    placeholder: "选择多个日期",
    selectedDays: (count: number) => `已选择 ${count} 天`,
  },
}

export function getMultipleDatePickerCopy(language: SupportedLanguage) {
  return MULTIPLE_DATE_PICKER_COPY[language]
}
