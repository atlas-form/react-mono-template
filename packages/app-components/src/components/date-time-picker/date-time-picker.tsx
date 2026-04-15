import { useId, useMemo, useState } from "react"
import { CalendarDays, Clock3, X } from "lucide-react"
import { Button } from "@workspace/ui-core/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils.js"
import { Calendar, type CalendarProps } from "@workspace/ui-components/stable/calendar"
import { Time, type TimeValue } from "@workspace/ui-components/stable/time"
import { pad } from "./shared"

export interface DateTimePickerProps {
  value?: Date | null
  onValueChange?: (value: Date | null) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  calendarProps?: Omit<CalendarProps, "mode" | "value" | "onValueChange">
}

const DEFAULT_TIME_VALUE: TimeValue = {
  hour: "00",
  minute: "00",
  second: "00",
}

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value) + ` ${pad(value.getHours())}:${pad(value.getMinutes())}:${pad(value.getSeconds())}`
}

export function DateTimePicker({
  value,
  onValueChange,
  placeholder = "选择日期时间",
  disabled = false,
  className,
  calendarProps,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false)
  const triggerId = useId()
  const hasValue = Boolean(value)
  const displayValue = hasValue && value ? formatDateTime(value) : placeholder
  const timeValue = useMemo(
    () => (value ? toTimeValue(value) : DEFAULT_TIME_VALUE),
    [value]
  )

  const handleDateChange = (nextValue: CalendarProps["value"] | undefined) => {
    if (!(nextValue instanceof Date)) {
      onValueChange?.(null)
      return
    }

    const nextDate = new Date(nextValue)
    const mergedTime = value ? toTimeValue(value) : DEFAULT_TIME_VALUE
    nextDate.setHours(
      Number(mergedTime.hour),
      Number(mergedTime.minute),
      Number(mergedTime.second ?? "00"),
      0
    )
    onValueChange?.(nextDate)
  }

  const handleTimeChange = (nextValue: TimeValue) => {
    const baseDate = value ? new Date(value) : new Date()
    baseDate.setHours(
      Number(nextValue.hour),
      Number(nextValue.minute),
      Number(nextValue.second ?? "00"),
      0
    )
    onValueChange?.(baseDate)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "min-w-[220px] w-fit justify-between gap-2 text-left font-normal",
            !hasValue && "text-muted-foreground",
            className
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={triggerId}
          disabled={disabled}
        >
          <span>{displayValue}</span>
          {hasValue ? (
            <span
              role="button"
              aria-label="Clear date time"
              tabIndex={-1}
              className="inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground"
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onValueChange?.(null)
                setOpen(false)
              }}
            >
              <X className="size-4" />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <CalendarDays className="size-4 shrink-0" />
              <Clock3 className="size-4 shrink-0" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={triggerId}
        align="start"
        className="w-auto p-0"
      >
        <div className="flex flex-col">
          <Calendar
            mode="single"
            value={value ?? undefined}
            onValueChange={handleDateChange}
            captionMode={calendarProps?.captionMode ?? "dropdown"}
            {...calendarProps}
          />
          <div className="border-t p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Clock3 className="size-4" />
              <span>Time</span>
            </div>
            <div className="overflow-hidden rounded-[10px] border bg-background">
              <Time
                value={timeValue}
                onValueChange={handleTimeChange}
                showSeconds={true}
                ariaLabel="Date time picker time"
                size="md"
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function toTimeValue(value: Date): TimeValue {
  return {
    hour: pad(value.getHours()),
    minute: pad(value.getMinutes()),
    second: pad(value.getSeconds()),
  }
}
