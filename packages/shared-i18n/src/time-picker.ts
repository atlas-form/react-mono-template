import type { SupportedLanguage } from "./index"

export interface TimePickerCopy {
  placeholder: string
  clearLabel: string
  ariaLabel: string
}

const TIME_PICKER_COPY: Record<SupportedLanguage, TimePickerCopy> = {
  en: {
    placeholder: "Select time",
    clearLabel: "Clear time",
    ariaLabel: "Time",
  },
  zhCN: {
    placeholder: "选择时间",
    clearLabel: "清除时间",
    ariaLabel: "时间",
  },
}

export function getTimePickerCopy(language: SupportedLanguage) {
  return TIME_PICKER_COPY[language]
}
