import { Calendar as CoreCalendar } from "@workspace/ui-core/components/calendar"

export interface CalendarProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
}

export function Calendar({ value, onValueChange }: CalendarProps) {
  return <CoreCalendar mode="single" selected={value} onSelect={onValueChange} />
}
