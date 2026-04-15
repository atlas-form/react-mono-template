import type { ChangeEventHandler } from "react"
import { cn } from "@workspace/ui-core/lib/utils.js"
import { Time, type TimeValue } from "@workspace/ui-components/stable/time"

export interface TimePickerProps {
  label?: string
  value: string
  disabled?: boolean
  className?: string
  onValueChange?: (value: string) => void
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function TimePicker({
  label,
  value,
  disabled = false,
  className,
  onValueChange,
  onChange,
}: TimePickerProps) {
  const handleValueChange = (nextValue: TimeValue) => {
    const normalizedValue = formatTimeValue(nextValue)

    onValueChange?.(normalizedValue)
    onChange?.({
      target: { value: normalizedValue },
      currentTarget: { value: normalizedValue },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  const input = value ? (
    <div className={cn("w-full overflow-hidden rounded-[10px] border")}>
      <Time
        value={parseTimeValue(value)}
        onValueChange={handleValueChange}
        showSeconds={true}
        ariaLabel={label ?? "Time"}
        size="md"
        disabled={disabled}
      />
    </div>
  ) : (
    <div className="w-full" />
  )

  if (!label) {
    return <div className={className}>{input}</div>
  }

  return (
    <label className={cn("grid gap-1.5", className)}>
      <span className="text-sm font-medium">{label}</span>
      {input}
    </label>
  )
}

function parseTimeValue(value: string): TimeValue {
  const [hour = "00", minute = "00", second = "00"] = value.split(":")

  return {
    hour,
    minute,
    second,
  }
}

function formatTimeValue(value: TimeValue) {
  return [value.hour, value.minute, value.second ?? "00"].join(":")
}
