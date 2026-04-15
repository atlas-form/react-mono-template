import { useId, useMemo, useState } from "react"
import { CalendarRange, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@workspace/ui-core/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils.js"
import { Calendar, type CalendarProps } from "@workspace/ui-components/stable/calendar"
import { normalizeLanguage } from "./shared"

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

const DATE_RANGE_PICKER_COPY = {
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
} as const

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value)
}

export function DateRangePicker({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  className,
  calendarProps,
}: DateRangePickerProps) {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.language)
  const copy = DATE_RANGE_PICKER_COPY[language]
  const [open, setOpen] = useState(false)
  const triggerId = useId()
  const hasValue = Boolean(value?.from || value?.to)
  const resolvedPlaceholder = placeholder ?? copy.placeholder

  const label = useMemo(() => {
    if (!value?.from) {
      return resolvedPlaceholder
    }

    if (!value.to) {
      return `${formatDate(value.from)} - ${copy.endDate}`
    }

    return `${formatDate(value.from)} - ${formatDate(value.to)}`
  }, [copy.endDate, resolvedPlaceholder, value])

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
          <span>{label}</span>
          {hasValue ? (
            <span
              role="button"
              aria-label={copy.clearLabel}
              tabIndex={-1}
              className="inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground"
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onValueChange?.(undefined)
                setOpen(false)
              }}
            >
              <X className="size-4" />
            </span>
          ) : (
            <CalendarRange className="size-4 shrink-0 text-muted-foreground" />
          )}
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

            const isCompletingExistingRange =
              Boolean(value?.from) &&
              !value?.to &&
              Boolean(resolvedValue?.from) &&
              Boolean(resolvedValue?.to)

            if (isCompletingExistingRange) {
              setOpen(false)
            }
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}
