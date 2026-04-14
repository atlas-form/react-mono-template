import { useMemo, useState } from "react"
import { CalendarDays, Clock3 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@workspace/ui-core/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils.js"
import { DatePicker } from "./date-picker"
import { normalizeLanguage, pad, type YearRange } from "./shared"
import { TimePicker } from "./time-picker"

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
  yearRange?: YearRange
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

const DATE_TIME_RANGE_COPY = {
  en: {
    placeholder: "Select date range",
    rangeState: "Range",
    emptyState: "Empty",
    timeRangeTitle: "Time Range",
    startLabel: "Start",
    endLabel: "End",
    precisionHint: "Precision is set to seconds.",
    clearLabel: "Clear",
  },
  zhCN: {
    placeholder: "选择日期时间范围",
    rangeState: "已选择",
    emptyState: "未选择",
    timeRangeTitle: "时间范围",
    startLabel: "开始",
    endLabel: "结束",
    precisionHint: "时间精度到秒。",
    clearLabel: "清空",
  },
} as const

export function DateTimeRangePicker({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  clearable = true,
  yearRange,
  className,
  triggerClassName,
  popoverContentClassName,
}: DateTimeRangePickerProps) {
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.language)
  const copy = DATE_TIME_RANGE_COPY[language]
  const resolvedPlaceholder = placeholder ?? copy.placeholder
  const displayValue = useMemo(
    () => formatRangeLabel(value, resolvedPlaceholder),
    [resolvedPlaceholder, value]
  )
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

  const handleTimeChange = (key: "from" | "to") => (nextValue: string) => {
    const nextTime = normalizeTimeValue(nextValue)
    const currentDate = key === "from" ? value?.from : value?.to

    if (!nextTime || !currentDate) {
      return
    }

    onValueChange?.({
      from: key === "from" ? mergeDateWithTime(currentDate, nextTime) : value?.from,
      to: key === "to" ? mergeDateWithTime(currentDate, nextTime) : value?.to,
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
              {hasValue ? copy.rangeState : copy.emptyState}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className={cn("w-auto p-0", popoverContentClassName)}
        >
          <div className="flex flex-col md:flex-row">
            <DatePicker
              mode="range"
              selected={toCalendarRange(value)}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              showOutsideDays={false}
              yearRange={yearRange}
            />

            <div className="border-t p-4 md:w-72 md:border-t-0 md:border-l">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Clock3 className="size-4" />
                <span>{copy.timeRangeTitle}</span>
              </div>

              <div className="space-y-3">
                <TimePicker
                  label={copy.startLabel}
                  value={getTimeValue(value?.from, DEFAULT_START_TIME)}
                  disabled={!value?.from}
                  onValueChange={handleTimeChange("from")}
                />
                <TimePicker
                  label={copy.endLabel}
                  value={getTimeValue(value?.to, DEFAULT_END_TIME)}
                  disabled={!value?.to}
                  onValueChange={handleTimeChange("to")}
                />
              </div>

              <div className="mt-4 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">
                {copy.precisionHint}
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
                    {copy.clearLabel}
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
