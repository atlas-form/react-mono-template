# @workspace/ui-core 协议（宪章）

这是 `@workspace/ui-core` 的最高优先级规则集。

## 不可协商原则

Headless（无样式内核）是唯一原则。任何与 headless 冲突的实现都不被允许。

## 强制执行

- AI 必须严格遵循本协议。
- 任何冲突都必须以本协议为准。
- `src/headless/*` 是 `ui-core` 唯一的公共接口。
- `src/components/*` 仅用于原始生成空间，不是最终 API。
- `ui-core` 内禁止依赖上层 UI 库。
- 视觉或特定库相关的关注点必须放在 `ui-core` 之外。

## 目的

`ui-core` 定义行为契约、无障碍接线（accessibility wiring）、组合 API 与 token 钩子。

这个包**不是**做产品视觉设计决策的地方。

## 真正的事实来源（重要）

- `src/components/*`：由 shadcn CLI 生成的**原始源码**。
- `src/headless/*`：手工重构后的**headless 层**，这是应用使用的**公共接口**。

不要把 `src/components/*` 当作最终 API。

## 强制工作流（面向 AI）

在 `ui-core` 中创建新组件时，必须严格按以下顺序执行：

1. 先用 shadcn CLI 生成基础代码。
2. 将生成的原始文件保留在 `src/components/<component>.tsx`（或 CLI 生成的对应布局）中。
3. 先把原始文件移动到 headless 工作区：`src/headless/<component>/<component>.tsx`（`src/components/*` 中可保留原始文件作参考）。
4. 将 headless 实现拆分为 `*.tsx`、`*.styles.ts`、`*.types.ts`。
5. 实现 headless 组件时遵循现有 `src/headless/button` 模式。
6. 实现完整可控 API（`mode`、`classNameMode`、`classResolver`），`mode` 必须默认 `styled`。
7. 先执行 lint 闸门：`pnpm -C packages/ui-core lint`。若失败，不得继续。
8. 执行类型闸门：`pnpm -C packages/ui-core typecheck`。
9. 强制 `index.ts` 显式导出风格与 `button` 一致（公共 headless 入口中禁止 `export *` 通配导出）。
10. 通过包 `exports` 与 `index.ts` 导出 headless 组件。

对于 shadcn 已存在的标准组件，**不要**从零开始手写。

### CLI 命令

在当前工作区运行：

```bash
pnpm -C packages/ui-core exec shadcn add <component-name>
```

示例：

```bash
pnpm -C packages/ui-core exec shadcn add button
pnpm -C packages/ui-core exec shadcn add input
pnpm -C packages/ui-core exec shadcn add select
```

## Headless 组件约定

Headless 组件文件必须遵循：

```text
src/headless/component-name/
  component-name.tsx
  component-name.styles.ts
  component-name.types.ts
  index.ts
```

以 `src/headless/button` 作为编码风格与可控 API 设计的参考样例。

## 组件模式规范（强制）

所有 `ui-core` 组件都必须遵循“控制权切换组件”标准，支持两种模式：

- `mode: "styled" | "headless"`。
- 默认 `mode` 必须是 `styled`。
- 通用 `mode` 类型必须复用 `src/lib/component-mode.ts`（至少复用 `BaseMode` / `DEFAULT_MODE`），禁止在各组件重复定义字面量类型或组件私有 mode 别名（例如 `ButtonMode`）。

### styled 模式（强制）

- 使用组件自己的 variants（如 `cva`）。
- 保留组件级 `variant`/`color`/`size`（如该组件存在这些维度）。
- 支持 `classNameMode` 的 `merge` / `replace`。
- 保留并支持 `classResolver` 能力。

### headless 模式（强制）

- 不使用 variants（不依赖 `cva` 产出的样式组合结果）。
- 不注入任何设计系统 class。
- 不添加任何设计系统状态 data 属性（例如 `data-variant`、`data-color`、`data-size` 等）。
- 完全由外部 `className` 控制。
- 不添加 `data-slot` 等设计系统标识属性。
- 必须在组件分支中显式剔除设计系统 props（如 `variant`/`color`/`size`/`classNameMode`/`classResolver`），且只向 DOM 透传业务 props。
- headless 返回结构必须为“`className + rest`”模式，避免 `className` 重复透传。

### 实现约束（强制）

- `resolve*ClassName`（或同类函数）只负责 styled 模式，不允许混入 headless 分支逻辑。
- `mode` 分支必须在组件主体中显式处理，不允许把 styled/headless 混在同一个解析函数里。
- 分支结构必须清晰，避免深层嵌套条件。
- 不再使用 `unstyled` 作为控制入口；统一使用 `mode="headless"`。

## 公共导出规则（严格）

每个 `src/headless/<component>/index.ts` 必须像 `button` 一样使用显式导出：

```ts
export { Component } from "./component"
export { componentStylesOrVariants } from "./component.styles"
export type { ComponentProps, ComponentTypes } from "./component.types"
```

公共 headless `index.ts` 禁止使用通配导出（`export *`）。

## 设计边界

- 逻辑和基础构建块放在 `ui-core`。
- 组件必须对调用方保持完全可控。
- 默认类名保持最小化且易于覆盖。
- 不要在这里加入产品特定品牌样式。
- 不要在这里放置产品品牌或业务视觉决策。

## 样式化组件应放在哪里

预设计（有明确视觉主张）的组件应放在 `@workspace/ui-components`。

- `ui-core`：headless 原语。
- `ui-components`：基于 `ui-core` 构建的样式化封装。

## 应用消费策略（重要）

- 默认情况下，应用包应消费 `@workspace/ui-components`。
- `@workspace/ui-core` 不是默认的应用直连层。
- 例外：只有在特殊需求下才允许应用直接使用 `ui-core`。
- 在该例外场景中，应封装在应用本地组件中，而不是在业务代码中到处散落原始 headless 用法。

## 输出检查清单

- 已先通过 shadcn CLI 生成。
- 原始文件保留在 `src/components/*`。
- 在重构前，原始文件已移动/复制到 `src/headless/<component>/<component>.tsx`。
- 已按样例模式在 `src/headless/*` 实现 headless 版本。
- 在适用场景下支持外部完整样式控制。
- 组件已实现通用 `mode` 双模式规范（`styled` + `headless`），且默认 `styled`。
- 使用来自 `globals.css` 与 `state.css` 的 tokens。
- 组件内未自定义任何颜色规则，所有颜色均来自 `globals.css`/`state.css` 变量；缺失变量已先补齐再写样式。
- 通过 `index.ts` 与包 `exports` 保持 API 稳定且显式。
- `pnpm -C packages/ui-core lint` 通过。
- `pnpm -C packages/ui-core typecheck` 通过。
- `index.ts` 仅使用 `button` 风格的显式导出。

## 样式输入

- 基础主题 token 来自 `globals.css`。
- 交互状态 token 来自 `state.css`。
- 组件应消费 token，而非硬编码产品颜色。

## 颜色规则（强制）

- 不允许在组件（`*.tsx`、`*.styles.ts`）里自行定义颜色规则（包括但不限于硬编码颜色值、临时色值、绕过 token 的颜色表达式）。
- 每一个颜色都必须使用 `globals.css` 与 `state.css` 提供的变量。
- 如果外部还没有对应变量，必须先在 `globals.css` 或 `state.css` 中补齐变量定义，再编写组件样式。
- 任何违反上述规则的实现都视为不合规，必须回退并按变量化方式重写。
