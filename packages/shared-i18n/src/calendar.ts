import type { SupportedLanguage } from "./index"

export interface CalendarCopy {
  previousYearLabel: string
  previousMonthLabel: string
  nextMonthLabel: string
  nextYearLabel: string
}

const CALENDAR_COPY: Record<SupportedLanguage, CalendarCopy> = {
  en: {
    previousYearLabel: "Go to previous year",
    previousMonthLabel: "Go to previous month",
    nextMonthLabel: "Go to next month",
    nextYearLabel: "Go to next year",
  },
  zhCN: {
    previousYearLabel: "前往上一年",
    previousMonthLabel: "前往上个月",
    nextMonthLabel: "前往下个月",
    nextYearLabel: "前往下一年",
  },
}

export function getCalendarCopy(language: SupportedLanguage) {
  return CALENDAR_COPY[language]
}
