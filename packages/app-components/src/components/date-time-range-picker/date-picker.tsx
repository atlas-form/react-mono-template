import type { ComponentProps } from "react"
import { useTranslation } from "react-i18next"
import { Calendar } from "@workspace/ui-components/stable/calendar"
import {
  getDefaultYearRange,
  normalizeLanguage,
  type YearRange,
} from "./shared"

type CalendarProps = ComponentProps<typeof Calendar>

export interface DatePickerProps {
  mode?: "single" | "multiple" | "range"
  required?: boolean
  selected?: unknown
  onSelect?: (...args: any[]) => void
  numberOfMonths?: number
  showOutsideDays?: boolean
  disabled?: CalendarProps["disabled"]
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  yearRange?: YearRange
  [key: string]: unknown
}

export function DatePicker({
  yearRange,
  ...props
}: DatePickerProps) {
  const { i18n } = useTranslation()
  const locale = normalizeLanguage(i18n.language)
  const resolvedYearRange = yearRange ?? getDefaultYearRange()

  return (
    <Calendar
      {...(props as CalendarProps)}
      locale={locale}
      weekStartsOn={0}
      startMonth={new Date(resolvedYearRange.from, 0, 1)}
      endMonth={new Date(resolvedYearRange.to, 11, 1)}
    />
  )
}
