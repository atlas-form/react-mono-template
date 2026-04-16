import type { SupportedLanguage } from "./index"

export interface DatePickerCopy {
  placeholder: string
  clearLabel: string
}

export interface DateRangePickerCopy {
  placeholder: string
  endDate: string
  clearLabel: string
}

export interface TimePickerCopy {
  placeholder: string
  clearLabel: string
  ariaLabel: string
}

export interface MultipleDatePickerCopy {
  placeholder: string
  selectedDays: (count: number) => string
}

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

export interface CalendarCopy {
  previousYearLabel: string
  previousMonthLabel: string
  nextMonthLabel: string
  nextYearLabel: string
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

export function getDatePickerCopy(language: SupportedLanguage) {
  return DATE_PICKER_COPY[language]
}

export function getDateRangePickerCopy(language: SupportedLanguage) {
  return DATE_RANGE_PICKER_COPY[language]
}

export function getTimePickerCopy(language: SupportedLanguage) {
  return TIME_PICKER_COPY[language]
}

export function getMultipleDatePickerCopy(language: SupportedLanguage) {
  return MULTIPLE_DATE_PICKER_COPY[language]
}

export function getDateTimePickerCopy(language: SupportedLanguage) {
  return DATE_TIME_PICKER_COPY[language]
}

export function getCalendarCopy(language: SupportedLanguage) {
  return CALENDAR_COPY[language]
}
