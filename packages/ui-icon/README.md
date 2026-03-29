# @workspace/ui-icon

`ui-icon` 是一个面向 `ui-core / ui-components / app` 的图标入口。
当前只支持 `lucide`，对外只提供一个 `Icon` 组件。

## 设计初衷

- 业务侧统一用 `Icon name="..."`，不直接依赖第三方图标组件。
- 保留语义名（如 `add`、`delete`）的稳定调用方式。
- 对接未来图标库时，优先走自动化映射，不做大规模手写一对一映射。

## 核心原则

- `ui-icon` 只做图标名解析与渲染，不做业务样式。
- 图标颜色、尺寸、状态由外部通过 `className` 和样式系统控制。
- 优先直接匹配库原生图标名；语义名通过别名候选自动解析。

## 当前 API

- `Icon`
- `IconName`
- `SemanticIconName`

## 使用建议

- 业务侧统一传 `name` 字符串，不直接使用 `lucide-react` 组件。
- 语义名和已登记的 lucide 名都可用：
  - 语义名：`add`、`delete`、`edit`
  - lucide 名：`square-pen`、`plus`、`trash-2`

## 给 AI 的工作约束

当你在这个包新增或修改图标时，遵循以下流程：

1. 先确认是否已有可复用的 `IconName`，优先复用语义名。
2. 若必须新增，先在 `src/types.ts` 扩展 `IconName`。
3. 在 `src/providers/lucide.ts` 中补充语义候选名（数组），不要手写全量映射。
4. 让候选名通过 `src/auto-map.ts` 自动解析为当前版本可用图标名。
5. 不要在业务组件里直接引入第三方图标组件，统一从 `@workspace/ui-icon` 导入。
6. 不要在 `ui-icon` 内写业务视觉规范（颜色 token、交互态等）。

## 目录说明

- `src/icon.tsx`: `Icon` 渲染入口（仅 lucide）
- `src/auto-map.ts`: 语义候选名自动解析工具
- `src/types.ts`: 语义图标名与公共类型
- `src/providers/lucide.ts`: 语义名候选配置（非全量映射）
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
      <Icon name="plus" className="size-4" />
    </>
  )
}
```
