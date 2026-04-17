import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { Input as CoreInput } from "@workspace/ui-core/components/input"
import { cn } from "@workspace/ui-core/lib/utils.js"

export interface SearchInputProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  updateStrategy?: "immediate" | "blur-enter" | "enter"
  inputClassName?: string
  trailingContent?: ReactNode
  trailingContentClassName?: string
}

export function SearchInput({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  updateStrategy = "immediate",
  inputClassName,
  trailingContent,
  trailingContentClassName,
}: SearchInputProps) {
  const [draftValue, setDraftValue] = useState(value)

  useEffect(() => {
    setDraftValue(value)
  }, [value])

  const commitValue = (nextValue: string) => {
    if (nextValue !== value) {
      onValueChange(nextValue)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value

    if (updateStrategy === "immediate") {
      onValueChange(nextValue)
      return
    }

    setDraftValue(nextValue)
  }

  const handleBlur = () => {
    if (updateStrategy === "blur-enter") {
      commitValue(draftValue)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (updateStrategy !== "blur-enter" && updateStrategy !== "enter") return

    if (event.key === "Enter") {
      event.preventDefault()
      commitValue(draftValue)
      return
    }

    if (event.key === "Escape") {
      setDraftValue(value)
    }
  }

  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
        <SearchIcon className="size-4" />
      </span>

      <CoreInput
        value={updateStrategy === "immediate" ? value : draftValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        type="search"
        className={cn("pl-9", trailingContent ? "pr-32" : undefined, inputClassName)}
      />

      {trailingContent ? (
        <div
          className={cn(
            "absolute top-1/2 right-2 flex -translate-y-1/2 items-center",
            trailingContentClassName
          )}
        >
          <span className="mr-2 h-5 w-px bg-border" aria-hidden="true" />
          {trailingContent}
        </div>
      ) : null}
    </div>
  )
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  )
}
