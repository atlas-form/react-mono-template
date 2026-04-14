import type { ChangeEvent, ChangeEventHandler } from "react"
import { Input } from "@workspace/ui-core/components/input"
import { cn } from "@workspace/ui-core/lib/utils.js"

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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value)
    onChange?.(event)
  }

  const input = (
    <Input
      type="time"
      step={1}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      className={cn("w-full", disabled && "cursor-not-allowed opacity-60")}
    />
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
