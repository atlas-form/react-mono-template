import { useId, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  getMultipleDatePickerCopy,
  normalizeLanguage,
} from "@workspace/shared-i18n"
import { Button } from "@workspace/ui-core/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils.js"
import { Calendar, type CalendarProps } from "@workspace/ui-components/stable/calendar"

type CalendarMultipleValue = Date[] | undefined

export interface MultipleDatePickerProps {
  value?: CalendarMultipleValue
  onValueChange?: (value: CalendarMultipleValue) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "value" | "onValueChange" | "numberOfMonths"
  >
}

function formatDateList(values: Date[]) {
  return values
    .map((value) =>
      new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
      }).format(value)
    )
    .join(", ")
}

export function MultipleDatePicker({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  className,
  calendarProps,
}: MultipleDatePickerProps) {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.language)
  const copy = getMultipleDatePickerCopy(language)
  const [open, setOpen] = useState(false)
  const triggerId = useId()
  const resolvedPlaceholder = placeholder ?? copy.placeholder

  const label = useMemo(() => {
    if (!value?.length) {
      return resolvedPlaceholder
    }

    if (value.length <= 3) {
      return formatDateList(value)
    }

    return copy.selectedDays(value.length)
  }, [copy, resolvedPlaceholder, value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !value?.length && "text-muted-foreground",
            className
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={triggerId}
          disabled={disabled}
        >
          <span>{label}</span>
          <span className="text-xs text-muted-foreground">Multi</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={triggerId}
        align="start"
        className="w-auto p-0"
      >
        <Calendar
          mode="multiple"
          locale={language}
          value={value}
          onValueChange={(nextValue) => {
            onValueChange?.(Array.isArray(nextValue) ? nextValue : undefined)
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}
