import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@workspace/ui-core/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import { cn } from "@workspace/ui-core/lib/utils"

export interface YearPickerOption {
  value: string
  label: string
  disabled?: boolean
}

export interface YearPickerProps {
  value: string
  options: YearPickerOption[]
  disabled?: boolean
  className?: string
  onValueChange?: (value: string) => void
}

export function YearPicker({
  value,
  options,
  disabled = false,
  className,
  onValueChange,
}: YearPickerProps) {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-8 min-w-16 justify-between gap-1 rounded-md px-2 text-sm font-semibold hover:bg-[var(--surface-component)] focus-visible:ring-0",
            className
          )}
        >
          <span>{selectedOption?.label ?? value}</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-24 p-1" align="start">
        <div className="flex max-h-64 flex-col gap-0.5 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                className={cn(
                  "flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40",
                  isSelected && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  onValueChange?.(option.value)
                  setOpen(false)
                }}
              >
                <span>{option.label}</span>
                {isSelected ? <Check className="size-3.5" /> : null}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
