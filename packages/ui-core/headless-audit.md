# Headless 合规评估报告

> 评估基准：`protocol.md`（`src/headless/button` 作为标准模版）
> 最后更新：2026-03-27（R5 核实完毕）

---

## 核心判断标准

根据 `protocol.md`，每个**独立组件**需满足：

| 要求 | 说明 |
|------|------|
| ① `mode: "styled" \| "headless"` | 默认 `styled`，使用 `BaseMode`/`DEFAULT_MODE` |
| ② headless 分支无默认设计样式注入 | 不注入 CVA/默认 class |
| ③ headless 分支不注入 `data-slot/variant/size` 设计标识 | 保持纯逻辑输出 |
| ④ 设计 props 不透传 DOM | `variant/size/classNameMode/classResolver` 等不落到 DOM |
| ⑤ 文件拆分齐全 | `.tsx`、`.styles.ts`、`.types.ts`、`index.ts` |
| ⑥ `index.ts` 显式导出 | 禁止 `export *` |

---

## 组件分类原则

- **独立组件**：必须完整实现 headless 双模式。
- **复合组件**：依赖独立组件时按协议可豁免，其下游独立组件合规即可。

---

## 复合组件（豁免）

| 组件 | 依赖 |
|------|------|
| `button-group` | `Separator` |
| `input-group` | `Input`, `Textarea`, `Button` |
| `toggle-group` | `Toggle` |
| `field` | `Label`, `Separator` |
| `item` | `Separator` |
| `combobox` | `InputGroup`, `Button` |
| `command` | `Dialog`, `InputGroup` |
| `pagination` | `Button` |
| `calendar` | `Button` |
| `dialog` | `Button` |
| `sheet` | `Button`（关闭按钮） |
| `sidebar` | `Button`, `Input`, `Separator`, `Sheet`, `Skeleton`, `Tooltip` |

---

## 独立组件评估

### ✅ 完全合规（42 个）

- `accordion`
- `alert`
- `aspect-ratio`
- `avatar`
- `badge`
- `breadcrumb`
- `button`
- `card`
- `chart`
- `checkbox`
- `collapsible`
- `context-menu`
- `drawer`
- `dropdown-menu`
- `empty`
- `hover-card`
- `input`
- `input-otp`
- `kbd`
- `label`
- `menubar`
- `native-select`
- `navigation-menu`
- `popover`
- `progress`
- `radio-group`
- `resizable`
- `scroll-area`
- `select`
- `separator`
- `skeleton`
- `slider`
- `sonner`
- `spinner`
- `switch`
- `table`
- `tabs`
- `textarea`
- `toggle`
- `tooltip`

### 豁免（context provider）

| 组件 | 说明 |
|------|------|
| `direction` | 纯 context provider，无视觉渲染 |

---

## 合规率统计（当前）

| 分类 | 数量 | 占比（独立组件中） |
|------|------|--------------------|
| ✅ 完全合规 | 40 | 100% |
| ❌ 不合规 | 0 | 0% |
| 豁免（context provider） | 1 | — |
| 复合组件（豁免，含 `sheet`/`sidebar`） | 12 | — |

---

## 修复历史

| 轮次 | 修复组件 | 累计合规数 |
|------|---------|-----------|
| 初始 | `button`, `input`, `alert` | 3 |
| R1 | `label`, `separator` | 5 |
| R2 | `badge`, `checkbox`, `switch`, `skeleton`, `textarea`, `spinner`, `radio-group`, `accordion`, `tabs`, `tooltip`, `card`, `kbd`, `aspect-ratio`, `collapsible`, `popover`, `table` | 21 |
| R3 | `toggle`, `avatar`, `select` | 24 |
| R4 | `progress`, `slider`, `breadcrumb`, `empty`, `hover-card`, `scroll-area`, `resizable`, `native-select`, `input-otp`, `drawer`, `dropdown-menu`, `context-menu`, `menubar` | 37 |
| R5 | `navigation-menu`, `sonner`, `chart` | 40 |
| 备注 | `sheet`、`sidebar` 重新分类为复合组件（豁免），已额外实现 mode 超出要求 | — |

---

## 参考：最小合规模版

```tsx
export function SomeComponent({
  mode = DEFAULT_MODE,
  className,
  variant = "default",
  classNameMode = "merge",
  classResolver,
  ...props
}: SomeComponentProps) {
  if (mode === "headless") {
    return <div className={className} {...props} />
  }

  return (
    <div
      data-slot="some-component"
      data-variant={variant}
      className={resolveStyledClassName({ className, variant, classNameMode, classResolver })}
      {...props}
    />
  )
}
```
