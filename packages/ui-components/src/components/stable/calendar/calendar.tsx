import type { ComponentProps } from "react"
import { Calendar as CoreCalendar } from "@workspace/ui-core/components/calendar"

type CoreCalendarProps = ComponentProps<typeof CoreCalendar>
type CalendarRangeValue = {
  from: Date | undefined
  to?: Date | undefined
}

interface CalendarBaseProps {
  required?: boolean
  defaultMonth?: CoreCalendarProps["defaultMonth"]
  month?: CoreCalendarProps["month"]
  onMonthChange?: CoreCalendarProps["onMonthChange"]
  numberOfMonths?: CoreCalendarProps["numberOfMonths"]
  showOutsideDays?: CoreCalendarProps["showOutsideDays"]
  locale?: CoreCalendarProps["locale"]
  weekStartsOn?: CoreCalendarProps["weekStartsOn"]
  startMonth?: CoreCalendarProps["startMonth"]
  endMonth?: CoreCalendarProps["endMonth"]
  disabled?: CoreCalendarProps["disabled"]
}

export interface CalendarSingleProps extends CalendarBaseProps {
  mode?: "single"
  value?: Date
  onValueChange?: (date: Date | undefined) => void
}

export interface CalendarMultipleProps extends CalendarBaseProps {
  mode: "multiple"
  value?: Date[]
  onValueChange?: (dates: Date[] | undefined) => void
}

export interface CalendarRangeProps extends CalendarBaseProps {
  mode: "range"
  value?: CalendarRangeValue
  onValueChange?: (range: CalendarRangeValue | undefined) => void
}

export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps

export function Calendar({
  mode = "single",
  required,
  value,
  onValueChange,
  ...props
}: CalendarProps) {
  const resolvedSelected = value
  const resolvedOnSelect = onValueChange

  return (
    <CoreCalendar
      mode={mode}
      required={required}
      selected={resolvedSelected as any}
      onSelect={resolvedOnSelect as any}
      {...(props as Omit<
        CoreCalendarProps,
        "mode" | "required" | "selected" | "onSelect" | "renderChevron"
      >)}
    />
  )
}
