import type { CSSProperties, ReactNode } from "react"
import {
  Select as HeadlessSelect,
  SelectContent as HeadlessSelectContent,
  SelectGroup as HeadlessSelectGroup,
  SelectItem as HeadlessSelectItem,
  SelectLabel as HeadlessSelectLabel,
  SelectScrollDownButton as HeadlessSelectScrollDownButton,
  SelectScrollUpButton as HeadlessSelectScrollUpButton,
  SelectSeparator as HeadlessSelectSeparator,
  SelectTrigger as HeadlessSelectTrigger,
  SelectValue as HeadlessSelectValue,
  type SelectContentProps as HeadlessSelectContentProps,
  type SelectGroupProps as HeadlessSelectGroupProps,
  type SelectItemProps as HeadlessSelectItemProps,
  type SelectLabelProps as HeadlessSelectLabelProps,
  type SelectProps as HeadlessSelectProps,
  type SelectScrollDownButtonProps as HeadlessSelectScrollDownButtonProps,
  type SelectScrollUpButtonProps as HeadlessSelectScrollUpButtonProps,
  type SelectSeparatorProps as HeadlessSelectSeparatorProps,
  type SelectTriggerProps as HeadlessSelectTriggerProps,
  type SelectValueProps as HeadlessSelectValueProps,
} from "@workspace/ui-core/components/select"

const toneToVariant = {
  default: "default",
  primary: "primary",
  destructive: "destructive",
} as const

export type SelectTone = keyof typeof toneToVariant
export type SelectProps = HeadlessSelectProps
export type SelectGroupProps = HeadlessSelectGroupProps
export type SelectValueProps = HeadlessSelectValueProps
export type SelectTriggerProps = Omit<HeadlessSelectTriggerProps, "variant"> & {
  tone?: SelectTone
}
export type SelectContentProps = Omit<HeadlessSelectContentProps, "variant"> & {
  tone?: SelectTone
}
export type SelectLabelProps = HeadlessSelectLabelProps
export type SelectItemProps = Omit<HeadlessSelectItemProps, "variant"> & {
  tone?: SelectTone
}
export type SelectSeparatorProps = HeadlessSelectSeparatorProps
export type SelectScrollUpButtonProps = HeadlessSelectScrollUpButtonProps
export type SelectScrollDownButtonProps = HeadlessSelectScrollDownButtonProps

export type AppSelectOption = {
  label: ReactNode
  value: string
  disabled?: boolean
}

export type AppSelectStyles = {
  content?: CSSProperties
  item?: CSSProperties
}

export type AppSelectAppearance = "default" | "apple"

function mergeClassName(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ")
}

export type AppSelectProps = Omit<SelectProps, "children"> & {
  list: AppSelectOption[]
  placeholder?: ReactNode
  tone?: SelectTone
  appearance?: AppSelectAppearance
  className?: string
  contentClassName?: string
  itemClassName?: string
  style?: CSSProperties
  styles?: AppSelectStyles
}

function AppleSelectIndicator() {
  return (
    <svg
      viewBox="0 0 12 16"
      aria-hidden="true"
      className="size-4 text-zinc-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6l3-3 3 3" />
      <path d="M3 10l3 3 3-3" />
    </svg>
  )
}

export function Select(props: SelectProps) {
  return <HeadlessSelect {...props} />
}

export function SelectGroup(props: SelectGroupProps) {
  return <HeadlessSelectGroup {...props} />
}

export function SelectValue(props: SelectValueProps) {
  return <HeadlessSelectValue {...props} />
}

export function SelectTrigger({
  tone = "default",
  ...props
}: SelectTriggerProps) {
  return <HeadlessSelectTrigger variant={toneToVariant[tone]} {...props} />
}

export function SelectContent({
  tone = "default",
  ...props
}: SelectContentProps) {
  return <HeadlessSelectContent variant={toneToVariant[tone]} {...props} />
}

export function SelectLabel(props: SelectLabelProps) {
  return <HeadlessSelectLabel {...props} />
}

export function SelectItem({ tone = "default", ...props }: SelectItemProps) {
  return <HeadlessSelectItem variant={toneToVariant[tone]} {...props} />
}

export function SelectSeparator(props: SelectSeparatorProps) {
  return <HeadlessSelectSeparator {...props} />
}

export function SelectScrollUpButton(props: SelectScrollUpButtonProps) {
  return <HeadlessSelectScrollUpButton {...props} />
}

export function SelectScrollDownButton(props: SelectScrollDownButtonProps) {
  return <HeadlessSelectScrollDownButton {...props} />
}

export function AppSelect({
  list,
  placeholder,
  tone = "default",
  appearance = "default",
  className,
  contentClassName,
  itemClassName,
  style,
  styles,
  ...props
}: AppSelectProps) {
  const isApple = appearance === "apple"
  const appleContentStyle: CSSProperties | undefined = isApple
    ? {
        backgroundColor: "rgb(10 10 10 / 1)",
        opacity: 1,
        backdropFilter: "none",
        ...styles?.content,
      }
    : styles?.content

  return (
    <Select {...props}>
      <SelectTrigger
        tone={tone}
        className={mergeClassName(
          isApple &&
            "h-11 min-w-[12rem] rounded-xl border border-zinc-500 bg-zinc-800 py-2 pr-3 pl-4 text-2xl leading-none font-medium tracking-tight text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] data-[placeholder]:text-zinc-300",
          className
        )}
        indicator={isApple ? <AppleSelectIndicator /> : undefined}
        indicatorClassName={mergeClassName(isApple && "size-4 opacity-95")}
        style={style}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        tone={tone}
        className={mergeClassName(
          isApple &&
            "rounded-3xl border border-zinc-200 bg-zinc-950 p-1 text-zinc-100 shadow-xl",
          contentClassName
        )}
        style={appleContentStyle}
      >
        {list.map((item) => (
          <SelectItem
            key={item.value}
            tone={tone}
            value={item.value}
            disabled={item.disabled}
            className={mergeClassName(
              isApple &&
                "rounded-xl px-3 py-2 text-2xl leading-none text-zinc-100 focus:bg-zinc-800 data-[highlighted]:bg-zinc-800 data-[state=checked]:bg-zinc-800",
              itemClassName
            )}
            style={styles?.item}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
