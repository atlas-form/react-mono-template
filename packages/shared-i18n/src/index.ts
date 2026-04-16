export type SupportedLanguage = "en" | "zhCN"

export function normalizeLanguage(
  language: string | undefined
): SupportedLanguage {
  const normalized = language?.toLowerCase()

  if (normalized === "zhcn" || normalized === "zh-cn" || normalized === "zh") {
    return "zhCN"
  }

  return "en"
}

export { getDataTableCopy } from "./data-table"
export type { DataTableCopy } from "./data-table"
export {
  getCalendarCopy,
  getDatePickerCopy,
  getDateRangePickerCopy,
  getDateTimePickerCopy,
  getMultipleDatePickerCopy,
  getTimePickerCopy,
} from "./date-time-picker"
export type {
  CalendarCopy,
  DatePickerCopy,
  DateRangePickerCopy,
  DateTimePickerCopy,
  MultipleDatePickerCopy,
  TimePickerCopy,
} from "./date-time-picker"
