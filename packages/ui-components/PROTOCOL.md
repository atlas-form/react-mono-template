# @workspace/ui-components 协议

## 宪章定位

`@workspace/ui-components` 是构建在 `@workspace/ui-core` 之上的、面向产品的样式化 UI 层。

这个包是所有应用包默认的 UI 入口。

## 强制组件分组

`src/components` 下的所有组件必须且只能归入以下一个分组：

- `src/components/stable/*`：标准化、可复用、面向应用的组件。
- `src/components/labs/*`：探索性或特殊场景组件，尚未标准化。

不要把组件实现直接放在 `src/components/*` 根目录。

## 分组语义

### stable

当组件已可跨应用复用时，使用 `stable`。

要求：

- API 稳定且已文档化。
- 命名已最终确定。
- 应用包可以安全导入使用。

### labs

`labs` 用于临时、实验性或领域特定组件。

规则：

- 当最终命名尚不明确时，名称可带场景前缀（例如：`payment-*`、`table-*`、`campaign-*`）。
- Labs 组件允许快速演进。
- 一旦使用方式与 API 稳定，应将组件迁移到 `stable`，并重命名为最终规范名称。

## 分层契约

- `@workspace/ui-core`：headless 原语、结构与行为契约。
- `@workspace/ui-components`：视觉语言、产品默认值、可供应用消费的封装层。

任何产品视觉决策都不应放在 `ui-core`。

## 组件编写规范（强制）

- `ui-components` 新增组件时，默认遵循并复用 `ui-core` 的默认 style 体系，不额外定义与 `ui-core` 相冲突的默认视觉基线。
- `ui-components` 对外只暴露面向应用的组件 props，不得向外暴露 headless 选择或 headless 组合入口。
- 应用包消费的组件必须始终是非 headless 的产品组件；应用不得直接基于 headless 原语拼装业务通用组件。
- 若需要支持自定义风格，应在 `ui-components` 内部通过分层封装实现，不把 headless 能力直接下放到应用层。
- 同一类型组件允许在 `ui-components` 内存在多个风格实现（例如多个 `button` 风格版本）。
- 同一类型组件在 `stable` 中只能有一个默认实现；其它风格实现必须放在 `labs`。

## 应用使用策略（严格）

- 应用包必须从 `@workspace/ui-components` 消费产品组件。
- 应用包不得在本地自行实现产品级可复用 UI 组件。
- 新增共享 UI 需求应优先落在 `@workspace/ui-components`。

例外策略：

- 若应用存在一次性需求，可仅在该应用内以页面级组合方式实现。
- 未迁移到 `ui-components` 前，不得将一次性应用代码提升为共享组件。

## 公共导出策略

- 根导出（`@workspace/ui-components`）应暴露 `stable` 组件。
- 默认不从根导出 `labs` 组件。
- 若某个 labs 组件必须临时被消费，应通过显式的 labs 子路径导出，并标注其临时性质。

## 新组件构建规则

每个新共享组件都必须遵循以下顺序：

1. 从 `ui-core` 原语与契约出发。
2. 在 `ui-components` 中实现视觉与产品行为。
3. 选择初始分组：`labs` 或 `stable`。
4. 在 `apps/test` 中新增或更新验证。
5. 通过以下闸门：
   - `pnpm --filter @workspace/ui-components typecheck`
   - `pnpm --filter test lint`
   - `pnpm --filter test build`
6. 只有在 API 与行为验证稳定后，才能从 `labs` 晋升到 `stable`。

## AI 执行规则

对于任何修改该包的 AI 代理：

1. 将本协议视为强制约束。
2. 不要把产品样式迁移到 `ui-core`。
3. 不要绕过 `ui-components` 这个默认应用入口。
4. 对所有组件改动强制执行 `stable/labs` 分组。
5. 若协议与便利性冲突，以协议为准。
