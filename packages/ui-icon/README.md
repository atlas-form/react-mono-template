# @workspace/ui-icon

`ui-icon` 是一个面向 `ui-core / ui-components / app` 的图标抽象层，不是具体图标库本身。

## 设计初衷

- 用**语义化图标名**（如 `add`、`delete`）替代业务代码里直接写 `lucide` / `heroicons` 组件名。
- 通过 provider 映射解耦图标来源，后续可切换或并存多个图标库。
- 给 AI 和开发者一个稳定接口：业务侧只用 `Icon` + `IconName`，不关心底层图标实现。

## 核心原则

- `ui-icon` 只做图标选择与映射，不做业务样式。
- 图标颜色、尺寸、状态由外部通过 `className` 和样式系统控制。
- 统一使用语义 key，避免在业务代码出现第三方图标库耦合。

## 当前 API

- `Icon`
- `setIconProvider`
- `getIconProvider`
- `IconName`
- `IconProvider`

## 使用建议

- 业务侧统一传 `name` 字符串，不直接使用 `lucide-react` 组件。
- 优先使用语义名（如 `add`、`delete`），便于跨图标库迁移。
- 在 `lucide` provider 下，`Icon` 也支持直接传 lucide 名称（如 `square-pen`、`panel-left`），无需一一手写映射。

## 给 AI 的工作约束

当你在这个包新增或修改图标时，遵循以下流程：

1. 先确认是否已有可复用的 `IconName`，优先复用语义名。
2. 若必须新增，先在 `src/types.ts` 扩展 `IconName`。
3. 在 provider 文件中补齐映射：
   - `src/providers/lucide.ts`
   - `src/providers/heroicons.ts`
4. 不要在业务组件里直接引入第三方图标组件，统一从 `@workspace/ui-icon` 导入。
5. 不要在 `ui-icon` 内写业务视觉规范（颜色 token、交互态等）。

## 目录说明

- `src/icon.tsx`: provider 选择与 `Icon` 渲染入口
- `src/types.ts`: 语义图标名与公共类型
- `src/providers/*`: 各图标库到语义名的映射表
- `src/index.ts`: 包导出

## 示例

```tsx
import { Icon } from "@workspace/ui-icon"

export function DeleteButtonIcon() {
  return <Icon name="delete" className="size-4" />
}
```

```tsx
import { Icon } from "@workspace/ui-icon"

export function EditButtonIcon() {
  return (
    <>
      <Icon name="edit" className="size-4" />
      <Icon name="square-pen" className="size-4" />
      <Icon name="SquarePen" className="size-4" />
    </>
  )
}
```

## 问题

是否需要这个库
