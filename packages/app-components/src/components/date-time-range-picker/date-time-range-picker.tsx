import { useMemo, useState, type ChangeEvent } from "react"
import { CalendarDays, Clock3 } from "lucide-react"
import { Button } from "@workspace/ui-core/components/button"
import { Calendar } from "@workspace/ui-core/components/calendar"
import { Input } from "@workspace/ui-core/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils.js"

export interface DateTimeRangeValue {
  from?: Date
  to?: Date
}

export interface DateTimeRangePickerProps {
  value?: DateTimeRangeValue
  onValueChange?: (value: DateTimeRangeValue | undefined) => void
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  className?: string
  triggerClassName?: string
  popoverContentClassName?: string
}

interface CalendarRangeSelection {
  from: Date | undefined
  to?: Date
}

const DEFAULT_START_TIME = "00:00:00"
const DEFAULT_END_TIME = "23:59:59"

export function DateTimeRangePicker({
  value,
  onValueChange,
  placeholder = "Select date range",
  disabled = false,
  clearable = true,
  className,
  triggerClassName,
  popoverContentClassName,
}: DateTimeRangePickerProps) {
  const [open, setOpen] = useState(false)

  const displayValue = useMemo(() => formatRangeLabel(value, placeholder), [value, placeholder])
  const hasValue = Boolean(value?.from || value?.to)

  const handleCalendarSelect = (nextRange: DateTimeRangeValue | undefined) => {
    if (!nextRange?.from && !nextRange?.to) {
      onValueChange?.(undefined)
      return
    }

    onValueChange?.({
      from: nextRange.from
        ? mergeDateWithTime(nextRange.from, getTimeValue(value?.from, DEFAULT_START_TIME))
        : undefined,
      to: nextRange.to
        ? mergeDateWithTime(nextRange.to, getTimeValue(value?.to, DEFAULT_END_TIME))
        : undefined,
    })
  }

  const handleTimeChange =
    (key: "from" | "to") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextTime = normalizeTimeValue(event.target.value)
      const currentDate = key === "from" ? value?.from : value?.to

      if (!nextTime || !currentDate) {
        return
      }

      onValueChange?.({
        from:
          key === "from"
            ? mergeDateWithTime(currentDate, nextTime)
            : value?.from,
        to:
          key === "to"
            ? mergeDateWithTime(currentDate, nextTime)
            : value?.to,
      })
    }

  const handleClear = () => {
    onValueChange?.(undefined)
    setOpen(false)
  }

  return (
    <div className={cn("flex w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between gap-3 text-left font-normal",
              !hasValue && "text-muted-foreground",
              triggerClassName
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <CalendarDays className="size-4 shrink-0" />
              <span className="truncate">{displayValue}</span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {hasValue ? "Range" : "Empty"}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className={cn("w-auto p-0", popoverContentClassName)}
        >
          <div className="flex flex-col md:flex-row">
            <Calendar
              mode="range"
              selected={toCalendarRange(value)}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              showOutsideDays={false}
            />

            <div className="border-t p-4 md:w-72 md:border-t-0 md:border-l">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Clock3 className="size-4" />
                <span>Time Range</span>
              </div>

              <div className="space-y-3">
                <TimeField
                  label="Start"
                  value={getTimeValue(value?.from, DEFAULT_START_TIME)}
                  disabled={!value?.from}
                  onChange={handleTimeChange("from")}
                />
                <TimeField
                  label="End"
                  value={getTimeValue(value?.to, DEFAULT_END_TIME)}
                  disabled={!value?.to}
                  onChange={handleTimeChange("to")}
                />
              </div>

              <div className="mt-4 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">
                Precision is set to seconds.
              </div>

              {clearable ? (
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={!hasValue}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface TimeFieldProps {
  label: string
  value: string
  disabled: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function TimeField({ label, value, disabled, onChange }: TimeFieldProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <Input
        type="time"
        step={1}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={cn(
          "w-full",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />
    </label>
  )
}

function formatRangeLabel(value: DateTimeRangeValue | undefined, placeholder: string) {
  if (!value?.from && !value?.to) {
    return placeholder
  }

  if (value?.from && value?.to) {
    return `${formatDateTime(value.from)} ~ ${formatDateTime(value.to)}`
  }

  if (value?.from) {
    return `${formatDateTime(value.from)} ~`
  }

  return `~ ${formatDateTime(value!.to!)}`
}

function formatDateTime(date: Date) {
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
  ].join(" ")
}

function getTimeValue(date: Date | undefined, fallback: string) {
  if (!date) {
    return fallback
  }

  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function mergeDateWithTime(date: Date, time: string) {
  const [hours, minutes, seconds] = time.split(":").map(Number)
  const nextDate = new Date(date)
  nextDate.setHours(hours, minutes, seconds, 0)
  return nextDate
}

function normalizeTimeValue(value: string) {
  const parts = value.split(":")
  if (parts.length !== 3) {
    return undefined
  }

  const [hours, minutes, seconds] = parts.map(Number)
  if ([hours, minutes, seconds].some((part) => Number.isNaN(part))) {
    return undefined
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

function toCalendarRange(value: DateTimeRangeValue | undefined): CalendarRangeSelection | undefined {
  if (!value?.from && !value?.to) {
    return undefined
  }

  return {
    from: value?.from,
    to: value?.to,
  }
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}
