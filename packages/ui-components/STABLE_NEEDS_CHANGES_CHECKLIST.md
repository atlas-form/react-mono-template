# Stable 组件待修改清单

基于当前 `packages/ui-components/PROTOCOL.md`（fixed-only、显式白名单 API）审查结果，以下 `stable` 组件仍需修改。

## 需要修改

- [ ] `card`
原因：当前直接暴露 `ComponentProps<typeof CoreCard*>` 并透传 `...props`。

- [ ] `checkbox`
原因：当前直接暴露 `CoreCheckboxProps` 并透传 `...props`。

- [ ] `dialog`
原因：当前直接暴露 `ComponentProps<typeof CoreDialog*>` 并透传 `...props`。

- [ ] `dropdown-menu`
原因：当前直接暴露 `ComponentProps<typeof CoreDropdownMenu*>` 并透传 `...props`。

- [ ] `field`
原因：当前直接暴露 `ComponentProps<typeof CoreField*>` 并透传 `...props`。

- [ ] `input`
原因：当前直接暴露 `CoreInputProps`，并暴露 `InputClassResolver`/`inputClassName`。

- [ ] `label`
原因：当前直接暴露 `CoreLabelProps` 并透传 `...props`。

- [ ] `popover`
原因：当前直接暴露 `ComponentProps<typeof CorePopover*>` 并透传 `...props`。

- [ ] `progress`
原因：当前直接暴露 `CoreProgressProps` 并透传 `...props`。

- [ ] `radio-group`
原因：当前直接暴露 `CoreRadioGroupProps/CoreRadioGroupItemProps` 并透传 `...props`。

- [ ] `select`
原因：当前 `Omit<CoreSelectProps, "children">` 仍透传大部分 core props，且暴露 `renderItem/renderTrigger` 结构逃逸入口。

- [ ] `separator`
原因：当前直接暴露 `CoreSeparatorProps` 并透传 `...props`。

- [ ] `skeleton`
原因：当前直接暴露 `CoreSkeletonProps` 并透传 `...props`。

- [ ] `slider`
原因：当前直接暴露 `CoreSliderProps` 并透传 `...props`。

- [ ] `spinner`
原因：当前直接暴露 `CoreSpinnerProps` 并透传 `...props`。

- [ ] `switch`
原因：当前直接暴露 `CoreSwitchProps` 并透传 `...props`。

- [ ] `table`
原因：当前直接暴露 `ComponentProps<typeof CoreTable*>` 并透传 `...props`。

- [ ] `tabs`
原因：当前直接暴露 `CoreTabs*Props` 并透传 `...props`。

- [ ] `textarea`
原因：当前直接暴露 `CoreTextareaProps` 并透传 `...props`。

- [ ] `tooltip`
原因：当前直接暴露 `ComponentProps<typeof CoreTooltip*>` 并透传 `...props`。

## 当前可保留（本轮无需修改）

- `alert`
- `badge`
- `button`
