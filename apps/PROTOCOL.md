# apps 协议（AI Required）

本协议是 `apps/*` 目录的最高优先级执行规则，面向所有 AI 开发助手。

## 1. 宪章

`apps/*` 用于承载最终应用。

这里允许创建任意类型的 app，包括但不限于：
- 面向用户的业务应用
- 管理台应用
- 组件验证/测试应用
- 临时实验应用

但新增 app 必须优先复用现有 `apps/web` 的工程模板与分层约定，而不是从零自由发挥。

## 2. 创建新 app 的默认策略（强制）

- 创建新 app 时，默认以 `apps/web` 为模板参考。
- 优先复用 `web` 中已经验证过的工程封装：
  - Vite / TypeScript / ESLint / Vitest 配置
  - `src/main.tsx` 的启动与注入方式
  - `src/config/env.ts` 的环境变量校验方式
  - `src/routes/*`、`src/layouts/*`、`src/pages/*` 的路由分层方式
  - `src/api/index.ts` 的 API 聚合方式
  - `src/styles/*` 的 token / recipe 组织方式
- 除非有明确理由，禁止新 app 自行设计一套新的目录规范或启动方式。

## 3. 共享与复用边界（强制）

- `apps/*` 只放应用壳层代码，禁止把共享能力沉淀在某个 app 内部。
- 可复用服务必须进入 `@workspace/services`。
- 可复用 UI 必须进入 `@workspace/ui-components`。
- 可复用主题 token 必须进入 `@workspace/ui-theme`。
- 如果某段逻辑未来可能被第二个 app 复用，就不应先写死在某个 app 内。

## 4. app 分类约定

- 业务 app：如 `web`，负责真实业务页面、鉴权、状态与交互编排。
- 测试 app：如 `test`，负责组件验证、视觉验证、交互验证，不承载真实业务实现。
- 新增 app 时必须先明确其角色，禁止把业务 app 和测试 app 的职责混在一起。

## 5. 目录与协议要求

- 每个 app 都应该有自己的 `PROTOCOL.md`，用于定义该 app 的本地规则。
- 若新 app 明显继承 `web` 的工程结构，也必须在其协议中明确哪些规则继承自 `web`，哪些规则是该 app 的特例。
- app 的 `README.md` 用于说明用途与运行方式；`PROTOCOL.md` 用于约束 AI 和工程规则，二者不能互相替代。

## 6. 对 web 模板的特别要求

- `apps/web` 是当前默认模板来源。
- 任何打算推广到多个 app 的工程改进，应优先先在 `web` 落地，再决定是否抽象成更上层模板规则。
- 新 app 若偏离 `web` 模板，必须有清晰理由，例如：
  - 运行时目标不同
  - 不需要鉴权/路由
  - 明确是 test/lab 场景

## 7. 禁止事项

- 禁止为了赶进度在新 app 中复制 `packages/*` 的实现。
- 禁止绕过共享包直接在多个 app 中复制同一段服务逻辑或 UI 实现。
- 禁止在没有协议说明的情况下创建结构明显不同的新 app。

## 8. 完成定义（Definition of Done）

只有同时满足以下条件，新增或修改 app 才算完成：
- 符合本协议的 app 创建与分层规则；
- 共享能力没有错误地下沉到单一 app；
- 对应 app 已有清晰的本地 `PROTOCOL.md`；
- 相关构建、测试、lint 门禁通过。

若与下级 app 协议冲突，以更具体的 app 协议为准；若无特例说明，以本协议为准。
