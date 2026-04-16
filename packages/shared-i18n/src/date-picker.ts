import type { SupportedLanguage } from "./index"

export interface DatePickerCopy {
  placeholder: string
  clearLabel: string
}

const DATE_PICKER_COPY: Record<SupportedLanguage, DatePickerCopy> = {
  en: {
    placeholder: "Select date",
    clearLabel: "Clear date",
  },
  zhCN: {
    placeholder: "选择日期",
    clearLabel: "清除日期",
  },
}

export function getDatePickerCopy(language: SupportedLanguage) {
  return DATE_PICKER_COPY[language]
}
