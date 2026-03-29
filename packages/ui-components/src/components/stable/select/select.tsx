import type { ReactNode } from "react"
import {
  Select as CoreSelect,
  SelectContent as CoreSelectContent,
  SelectItem as CoreSelectItem,
  SelectTrigger as CoreSelectTrigger,
  SelectValue as CoreSelectValue,
  type SelectProps as CoreSelectProps,
} from "@workspace/ui-core/components/select"

export type SelectOption = {
  label: ReactNode
  value: string
  disabled?: boolean
}

export type SelectProps = Omit<CoreSelectProps, "children"> & {
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
    <CoreSelect value={value} {...props}>
      <CoreSelectTrigger>
        {renderTrigger ? (
          renderTrigger(value as string | undefined, selected)
        ) : (
          <CoreSelectValue placeholder={placeholder} />
        )}
      </CoreSelectTrigger>

      <CoreSelectContent>
        {list.map((item) => {
          if (renderItem) {
            return renderItem(item)
          }
          return (
            <CoreSelectItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </CoreSelectItem>
          )
        })}
      </CoreSelectContent>
    </CoreSelect>
  )
}
