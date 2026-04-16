import type { MouseEvent, PointerEvent, ReactNode } from "react"
import {
  Select as CoreSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui-core/components/select"

export type AdvancedSelectOption = {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface AdvancedSelectProps {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  list: AdvancedSelectOption[]
  placeholder?: string
  allowClear?: boolean
  clearLabel?: string
  hideIndicator?: boolean
}

export function AdvancedSelect({
  value,
  onValueChange,
  disabled = false,
  list,
  placeholder,
  allowClear = false,
  clearLabel = "Clear selection",
  hideIndicator = true,
}: AdvancedSelectProps) {
  const hasValue = value.length > 0

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onValueChange("")
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <CoreSelect value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger hideIndicator={hideIndicator}>
        <SelectValue placeholder={placeholder} />
        {allowClear && hasValue ? (
          <button
            type="button"
            aria-label={clearLabel}
            className="inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground"
            onPointerDown={handlePointerDown}
            onMouseDown={handleMouseDown}
            onClick={handleClear}
          >
            <ClearIcon className="size-4" />
          </button>
        ) : null}
      </SelectTrigger>

      <SelectContent>
        {list.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </CoreSelect>
  )
}

function ClearIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 4L12 12" />
      <path d="M12 4L4 12" />
    </svg>
  )
}
