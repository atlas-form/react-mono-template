import type { SupportedLanguage } from "./index"

export interface DateTimePickerCopy {
  placeholder: string
  clearLabel: string
  timeTitle: string
  timeAria: string
  now: string
  today: string
  yesterday: string
  weekStart: string
  monthStart: string
  yearStart: string
}

const DATE_TIME_PICKER_COPY: Record<SupportedLanguage, DateTimePickerCopy> = {
  en: {
    placeholder: "Select date time",
    clearLabel: "Clear date time",
    timeTitle: "Time",
    timeAria: "Date time picker time",
    now: "Now",
    today: "Today",
    yesterday: "Yesterday",
    weekStart: "Week Start",
    monthStart: "Month Start",
    yearStart: "Year Start",
  },
  zhCN: {
    placeholder: "选择日期时间",
    clearLabel: "清除日期时间",
    timeTitle: "时间",
    timeAria: "日期时间选择器时间",
    now: "此刻",
    today: "今天",
    yesterday: "昨天",
    weekStart: "本周",
    monthStart: "月初",
    yearStart: "年初",
  },
}

export function getDateTimePickerCopy(language: SupportedLanguage) {
  return DATE_TIME_PICKER_COPY[language]
}
