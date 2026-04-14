import type { ComponentProps } from "react"
import type { MonthCaptionProps } from "react-day-picker"
import { useDayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Calendar } from "@workspace/ui-core/components/calendar"
import { cn } from "@workspace/ui-core/lib/utils"
import {
  getCalendarLocale,
  getDefaultYearRange,
  normalizeLanguage,
  type YearRange,
} from "./shared"
import { MonthPicker } from "./month-picker"
import { YearPicker } from "./year-picker"

type CalendarProps = ComponentProps<typeof Calendar>

export interface DatePickerProps {
  mode?: "single" | "multiple" | "range"
  selected?: unknown
  onSelect?: (...args: any[]) => void
  numberOfMonths?: number
  showOutsideDays?: boolean
  disabled?: CalendarProps["disabled"]
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  yearRange?: YearRange
  className?: CalendarProps["className"]
  classNames?: CalendarProps["classNames"]
  [key: string]: unknown
}

export function DatePicker({
  yearRange,
  className,
  classNames,
  ...props
}: DatePickerProps) {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.language)
  const locale = getCalendarLocale(language)
  const resolvedYearRange = yearRange ?? getDefaultYearRange()

  return (
    <Calendar
      {...(props as CalendarProps)}
      className={cn(
        "[--cell-size:1.35rem] [&_[data-slot=button][data-size=icon]]:rounded-md [&_[data-slot=button][data-size=icon]]:font-medium [&_[data-slot=button][data-size=icon][data-range-end=true]]:ring-0 [&_[data-slot=button][data-size=icon][data-range-end=true]]:ring-offset-0 [&_[data-slot=button][data-size=icon][data-range-start=true]]:ring-0 [&_[data-slot=button][data-size=icon][data-range-start=true]]:ring-offset-0 [&_[data-slot=button][data-size=icon][data-selected-single=true]]:ring-0 [&_[data-slot=button][data-size=icon][data-selected-single=true]]:ring-offset-0",
        className
      )}
      classNames={{
        nav: "pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
        button_previous:
          "pointer-events-auto inline-flex size-(--cell-size) items-center justify-center rounded-md p-0 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground aria-disabled:opacity-50",
        button_next:
          "pointer-events-auto inline-flex size-(--cell-size) items-center justify-center rounded-md p-0 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground aria-disabled:opacity-50",
        weekdays: "flex gap-0.5",
        week: "mt-0.5 flex w-full gap-0.5",
        ...classNames,
      }}
      captionLayout="label"
      locale={locale}
      weekStartsOn={0}
      startMonth={new Date(resolvedYearRange.from, 0, 1)}
      endMonth={new Date(resolvedYearRange.to, 11, 1)}
      renderChevron={({ orientation, className }) =>
        orientation === "left" ? (
          <ChevronLeft className={className} />
        ) : orientation === "right" ? (
          <ChevronRight className={className} />
        ) : (
          <ChevronRight className={className} />
        )
      }
      components={{
        MonthCaption: DatePickerMonthCaption,
      }}
    />
  )
}

function DatePickerMonthCaption({
  calendarMonth,
  displayIndex,
  className,
}: MonthCaptionProps) {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.language)
  const { dayPickerProps, goToMonth } = useDayPicker()
  const currentMonth = calendarMonth.date
  const startMonth = dayPickerProps.startMonth
  const endMonth = dayPickerProps.endMonth
  const fallbackYearRange = getDefaultYearRange()
  const yearRange = {
    from: startMonth?.getFullYear() ?? fallbackYearRange.from,
    to: endMonth?.getFullYear() ?? fallbackYearRange.to,
  }

  const monthOptions = Array.from({ length: 12 }, (_, monthIndex) => {
    const optionDate = new Date(currentMonth.getFullYear(), monthIndex, 1)
    return {
      value: String(monthIndex),
      label: formatMonthLabel(optionDate, language),
      disabled:
        (startMonth
          ? optionDate < new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)
          : false) ||
        (endMonth
          ? optionDate > new Date(endMonth.getFullYear(), endMonth.getMonth(), 1)
          : false),
    }
  })

  const yearOptions = Array.from(
    { length: yearRange.to - yearRange.from + 1 },
    (_, index) => {
      const year = yearRange.from + index
      return {
        value: String(year),
        label: String(year),
      }
    }
  )

  const goToDisplayedMonth = (year: number, month: number) => {
    goToMonth(addMonths(new Date(year, month, 1), -displayIndex))
  }

  return (
    <div className={cn("flex h-8 items-center justify-center gap-1.5", className)}>
      <MonthPicker
        value={String(currentMonth.getMonth())}
        options={monthOptions}
        onValueChange={(nextValue) => {
          goToDisplayedMonth(currentMonth.getFullYear(), Number(nextValue))
        }}
      />
      <YearPicker
        value={String(currentMonth.getFullYear())}
        options={yearOptions}
        onValueChange={(nextValue) => {
          goToDisplayedMonth(Number(nextValue), currentMonth.getMonth())
        }}
      />
    </div>
  )
}

function addMonths(date: Date, amount: number) {
  const nextDate = new Date(date)
  nextDate.setMonth(nextDate.getMonth() + amount)
  return nextDate
}

function formatMonthLabel(date: Date, language: "en" | "zhCN") {
  return new Intl.DateTimeFormat(language === "zhCN" ? "zh-CN" : "en-US", {
    month: language === "zhCN" ? "numeric" : "short",
  }).format(date)
}
