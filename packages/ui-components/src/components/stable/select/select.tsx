import type { ReactNode } from "react"
import {
  Select as HeadlessSelect,
  SelectContent as HeadlessSelectContent,
  SelectItem as HeadlessSelectItem,
  SelectTrigger as HeadlessSelectTrigger,
  SelectValue as HeadlessSelectValue,
  type SelectProps as HeadlessSelectProps,
} from "@workspace/ui-core/components/select"

export type SelectOption = {
  label: ReactNode
  value: string
  disabled?: boolean
}

export type SelectProps = Omit<HeadlessSelectProps, "children"> & {
  list: SelectOption[]
  placeholder?: ReactNode

  // ✅ 唯一扩展点（结构逃逸）
  renderItem?: (item: SelectOption) => ReactNode
  renderTrigger?: (value?: string, item?: SelectOption) => ReactNode
}

export function Select({
  list,
  placeholder,
  renderItem,
  renderTrigger,
  value,
  ...props
}: SelectProps) {
  const selected = list.find((i) => i.value === value)

  return (
    <HeadlessSelect value={value} {...props}>
      <HeadlessSelectTrigger>
        {renderTrigger ? (
          renderTrigger(value as string | undefined, selected)
        ) : (
          <HeadlessSelectValue placeholder={placeholder} />
        )}
      </HeadlessSelectTrigger>

      <HeadlessSelectContent>
        {list.map((item) => {
          if (renderItem) {
            return renderItem(item)
          }
          return (
            <HeadlessSelectItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </HeadlessSelectItem>
          )
        })}
      </HeadlessSelectContent>
    </HeadlessSelect>
  )
}
