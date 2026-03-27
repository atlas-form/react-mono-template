# apps/test PROTOCOL (AI Required)

本协议是 `apps/test` 的最高优先级执行规则，面向所有 AI 开发助手。

## 1. 目的

`apps/test` 是组件验证环境（Component Test Lab），用于在不同语言、主题和交互状态下验证组件。

任何组件改动必须先在这里验证通过，才允许进入业务页面。

## 2. 强制修改边界（核心约束）

- 所有组件的样式化改动、包装改动、对外组件 API 改动，必须在 `packages/ui-components` 内完成。
- 禁止在 `apps/test`、`apps/web`、`apps/admin` 直接实现或修改“产品级组件实现”。
- `@workspace/ui-core` 只作为底层 headless 基础层，不承载产品视觉决策。

说明：如果需求里提到 `ui-component`，统一解释为仓库中的 `packages/ui-components`（包名 `@workspace/ui-components`）。

## 3. AI 执行流程（必须按顺序）

1. 在 `packages/ui-components` 完成组件新增或修改。
2. 在 `apps/test` 新增/更新对应测试用例页面（至少覆盖默认态、禁用态、交互态、语言切换、主题切换）。
3. 通过门禁命令：
   - `pnpm --filter @workspace/ui-components typecheck`
   - `pnpm --filter test lint`
   - `pnpm --filter test build`
4. 门禁任一失败，禁止宣称完成。

## 4. 测试页面最低覆盖要求

每个被改动组件在 `apps/test` 必须可见并可操作，至少包含：

- 主题覆盖：`light` / `dark` / `system`
- 语言覆盖：`zh-CN` / `en-US`
- 状态覆盖：default / disabled / loading(如适用) / error(如适用)
- 交互覆盖：点击、输入、展开、切换等关键交互

## 5. 禁止事项

- 禁止只改业务页而不更新 `apps/test`。
- 禁止绕过 `packages/ui-components` 直接在 app 层复制组件实现。
- 禁止跳过构建与检查命令。

## 6. 完成定义（Definition of Done）

仅当以下条件同时满足时，组件改动才算完成：

- 改动发生在 `packages/ui-components`
- `apps/test` 已有对应验证入口
- 第 3 节门禁全部通过

若与其他说明冲突，以本协议为准。
