import type { SupportedLanguage } from "../index"

export interface DateRangePickerCopy {
  placeholder: string
  endDate: string
  clearLabel: string
}

const DATE_RANGE_PICKER_COPY: Record<SupportedLanguage, DateRangePickerCopy> = {
  en: {
    placeholder: "Select date range",
    endDate: "End date",
    clearLabel: "Clear date range",
  },
  zhCN: {
    placeholder: "选择日期范围",
    endDate: "结束日期",
    clearLabel: "清除日期范围",
  },
}

export function getDateRangePickerCopy(language: SupportedLanguage) {
  return DATE_RANGE_PICKER_COPY[language]
}
