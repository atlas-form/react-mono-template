# apps/web 协议（AI 必读）

本协议是 `apps/web` 的最高优先级执行规则，面向所有 AI 开发助手。

## 1. 宪章

`apps/web` 是当前唯一上线中的业务应用壳层，负责页面编排、路由装配、状态接线与用户交互。

`apps/web` 不是共享能力沉淀层。所有可复用能力必须优先放入 workspace 包。

## 2. 职责边界（强制）

`apps/web` 负责：
- 路由树与页面入口（`routes/*`, `pages/*`, `layouts/*`）
- 页面级状态编排（Redux/React Query 的使用与组合）
- 业务交互流程与页面级错误展示（例如 toast、boundary）
- 环境变量读取与应用启动注入（`src/config/env.ts`, `src/main.tsx`）

`apps/web` 不负责：
- 通用 API 请求基础设施（归属 `@workspace/services`）
- 通用错误模型与 query client（归属 `@workspace/services`）
- 共享 UI 实现（归属 `@workspace/ui-components`）
- 主题 token 定义（归属 `@workspace/ui-theme`）

## 3. 目录说明（强制）

`apps/web/src` 目录按以下职责划分，新增代码必须优先放到正确目录：

- `api/`：应用侧 API 聚合入口，只做对 `@workspace/services/api/*` 的转发与整合。
- `assets/`：静态资源。
- `components/`：仅放 `web` 本地组件。
- `components/base/`：页面级基础交互组件，不属于共享 UI 包。
- `components/header/`：头部区域专用组件。
- `components/system/`：系统级壳层组件，例如 loading、error boundary。
- `components/ui/`：仅作为本地 UI 试验或过渡目录使用；禁止继续扩张为第二套共享设计系统。
- `config/`：应用启动配置与 env 校验。
- `forms/`：表单 schema 与表单专用转换逻辑。
- `layouts/`：路由布局。
- `models/`：应用侧领域模型类型。
- `pages/`：页面组件；按 `public/` 与 `protected/` 分区。
- `routes/`：路由定义；`routes/lazy/` 负责懒加载出口。
- `store/`：Redux store 与 slice。
- `test/`：应用级测试与 MSW 配置。
- `utils/`：纯工具函数。

保留目录约定：
- `errors/` 与 `query/` 目前应视为保留目录，不应继续新增通用实现。
- 错误模型与 query client 已迁移到 `@workspace/services`，除非出现明确的 app 私有需求，否则禁止重新在 `web` 内落回实现。

## 4. 依赖与导入规则（强制）

- 共享 UI 必须从 `@workspace/ui-components` 导入，禁止从 `@workspace/ui-core` 直接导入业务页面组件。
- API 调用必须通过 `src/api/index.ts` 聚合层转发，禁止页面直接拼接请求 URL。
- 通用错误模型必须使用 `@workspace/services/errors/request-error`。
- 通用 query client 必须使用 `@workspace/services/query/client`。
- 主题与 i18n 初始化统一在应用入口完成（`main.tsx`），禁止分散初始化。

## 5. 配置规则（强制）

- `import.meta.env` 的读取与校验只能放在 `src/config/env.ts`。
- `main.tsx` 只接收已校验 env，并注入到 `@workspace/services/url`。
- 业务代码（页面/组件）禁止直接读取 `import.meta.env`。

## 6. 路由与鉴权规则

- 公有路由与私有路由分离：`publicRoutes` / `protectedRoutes`。
- 页面必须通过 `routes/lazy/*` 做懒加载导出，避免在路由文件内直接堆叠页面实现。
- 会话恢复流程统一在 `App.tsx` 中处理，其他页面禁止重复实现 token 恢复逻辑。
- 路由错误统一落到 `RouteErrorBoundary`，禁止页面内散落重复的 route-error 模板。

## 7. 状态管理规则

- Redux 只存放跨页面会话状态（如 auth/user）；页面临时状态优先本地 state。
- React Query 负责服务端状态，query key 必须语义化且稳定。
- mutation/query 的错误统一转换为 `RequestError` 再做展示或日志。

## 8. UI 与样式规则

- 页面必须优先使用语义组件和语义样式（`ui-*` classes / `ui-components`）。
- Tailwind 原子类仅用于布局；颜色、阴影、圆角等视觉语义必须来自 theme/token。
- `apps/web` 不再维护本地 `src/styles/*` 目录，页面样式应直接消费 `@workspace/ui-theme` 与 `@workspace/ui-components` 提供的语义能力。
- 页面私有样式允许以内联类名或局部组件结构表达，但不得重新引入第二套本地主题 token/recipe 体系。

## 9. 测试与门禁（强制）

涉及 `apps/web` 的改动至少通过：
- `pnpm -C apps/web lint`
- `pnpm -C apps/web test`
- `pnpm -C apps/web build`

如改动影响共享包，还必须补跑对应包的 typecheck/build 门禁。

任一门禁失败，禁止宣称完成。

## 10. 与 apps 模板的关系

- `apps/web` 是当前新增 app 的默认模板来源。
- 若未来新增业务 app，应优先继承 `web` 的启动方式、目录结构和分层思路。
- 对 `web` 的工程级改进，应优先考虑其是否适合作为其他 app 的模板能力。

## 11. 完成定义

仅当以下条件同时满足时，`apps/web` 改动才算完成：
- 符合本协议第 2~10 节约束；
- 未新增跨层耦合（app 反向依赖 packages 内部实现细节）；
- 相关门禁命令全部通过。

若与其他说明冲突，以本协议为准。
