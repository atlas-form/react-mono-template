import { useId, useMemo, useState } from "react"
import { Button } from "@workspace/ui-core/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils.js"
import { Calendar, type CalendarProps } from "@workspace/ui-components/stable/calendar"

export interface DateRangeValue {
  from: Date | undefined
  to?: Date | undefined
}

function isDateRangeValue(
  value: unknown
): value is DateRangeValue {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export interface DateRangePickerProps {
  value?: DateRangeValue
  onValueChange?: (value: DateRangeValue | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "value" | "onValueChange" | "numberOfMonths"
  >
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
  }).format(value)
}

export function DateRangePicker({
  value,
  onValueChange,
  placeholder = "选择日期范围",
  disabled = false,
  className,
  calendarProps,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const triggerId = useId()

  const label = useMemo(() => {
    if (!value?.from) {
      return placeholder
    }

    if (!value.to) {
      return `${formatDate(value.from)} - 结束日期`
    }

    return `${formatDate(value.from)} - ${formatDate(value.to)}`
  }, [placeholder, value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !value?.from && "text-muted-foreground",
            className
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={triggerId}
          disabled={disabled}
        >
          <span>{label}</span>
          <span className="text-xs text-muted-foreground">Range</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={triggerId}
        align="start"
        className="w-auto p-0"
      >
        <Calendar
          mode="range"
          numberOfMonths={2}
          value={value}
          onValueChange={(nextValue) => {
            const resolvedValue = isDateRangeValue(nextValue)
              ? nextValue
              : undefined

            onValueChange?.(resolvedValue)
            if (resolvedValue?.from && resolvedValue.to) {
              setOpen(false)
            }
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}
