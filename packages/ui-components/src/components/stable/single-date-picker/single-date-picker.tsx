import { useId, useState } from "react"
import { Button } from "@workspace/ui-core/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils.js"
import { Calendar, type CalendarProps } from "../calendar"

type CalendarSingleValue = Date | undefined

export interface SingleDatePickerProps {
  value?: CalendarSingleValue
  onValueChange?: (value: CalendarSingleValue) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  calendarProps?: Omit<CalendarProps, "mode" | "value" | "onValueChange">
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value)
}

export function SingleDatePicker({
  value,
  onValueChange,
  placeholder = "选择日期",
  disabled = false,
  className,
  calendarProps,
}: SingleDatePickerProps) {
  const [open, setOpen] = useState(false)
  const triggerId = useId()

  const label = value ? formatDate(value) : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={triggerId}
          disabled={disabled}
        >
          <span>{label}</span>
          <span className="text-xs text-muted-foreground">Single</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={triggerId}
        align="start"
        className="w-auto p-0"
      >
        <Calendar
          mode="single"
          value={value}
          onValueChange={(nextValue) => {
            onValueChange?.(nextValue instanceof Date ? nextValue : undefined)
            setOpen(false)
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}
