import * as React from "react"
import {
  DayPicker,
  type DayButton,
  type ClassNames,
  type CustomComponents,
  type Locale,
} from "react-day-picker"

import { cn } from "../../lib/utils"
import { Button } from "../button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select"
import {
  calendarClassNames,
  getCalendarClassNames,
  getCalendarRootClassName,
} from "./calendar.styles"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  renderChevron,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  renderChevron?: (params: {
    orientation: "left" | "right" | "down"
    className?: string
    props: Record<string, unknown>
  }) => React.ReactElement
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={getCalendarRootClassName(className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={getCalendarClassNames({
        captionLayout,
        buttonVariant,
        showWeekNumber: props.showWeekNumber,
        classNames,
      })}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          const normalizedOrientation: "left" | "right" | "down" =
            orientation === "left"
              ? "left"
              : orientation === "right"
                ? "right"
                : "down"

          if (renderChevron) {
            return renderChevron({
              orientation: normalizedOrientation,
              className: cn("size-4", className),
              props: props as Record<string, unknown>,
            })
          }

          return (
            <DefaultCalendarChevron
              orientation={normalizedOrientation}
              className={className}
              props={props as Record<string, unknown>}
            />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        Dropdown: (props) => <CalendarDropdown {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className={calendarClassNames.weekNumberContent}>
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

type CalendarDropdownOption = {
  value: number
  label: string
  disabled: boolean
}

type CalendarDropdownProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> & {
  classNames: ClassNames
  components: CustomComponents
  options?: CalendarDropdownOption[]
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

function CalendarDropdown({
  className,
  classNames,
  options,
  value,
  disabled,
  onChange,
  "aria-label": ariaLabel,
}: CalendarDropdownProps) {
  const selectedValue =
    value === undefined ? undefined : String(value)

  const selectedOption = options?.find(
    (option) => String(option.value) === selectedValue
  )

  return (
    <span
      data-disabled={disabled}
      className={classNames.dropdown_root}
    >
      <Select
        value={selectedValue}
        disabled={disabled}
        onValueChange={(nextValue) => {
          onChange?.({
            target: { value: nextValue },
            currentTarget: { value: nextValue },
          } as React.ChangeEvent<HTMLSelectElement>)
        }}
      >
        <SelectTrigger
          aria-label={ariaLabel}
          className={cn(
            calendarClassNames.captionLabelDropdown,
            "h-auto min-w-0 gap-1 border-0 bg-transparent px-2 py-1 shadow-none hover:bg-[var(--surface-hover)] focus-visible:border-ring",
            className
          )}
          indicator={
            <DefaultCalendarChevron
              orientation="down"
              className={classNames.chevron}
              props={{}}
            />
          }
        >
          <SelectValue>{selectedOption?.label}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={String(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </span>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  color: _color,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-outside={modifiers.outside}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        calendarClassNames.dayButton,
        className
      )}
      {...props}
    />
  )
}

function DefaultCalendarChevron({
  orientation,
  className,
  props,
}: {
  orientation: "left" | "right" | "down"
  className?: string
  props: Record<string, unknown>
}) {
  const chevronPath =
    orientation === "left"
      ? "m15 18-6-6 6-6"
      : orientation === "right"
        ? "m9 18 6-6-6-6"
        : "m6 9 6 6 6-6"

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      {...props}
    >
      <path d={chevronPath} />
    </svg>
  )
}

export { Calendar, CalendarDayButton }
