# apps/admin 协议（AI 必读）

本协议用于 `apps/admin`。

## 1. 模板来源

- `apps/admin` 必须继承 `apps/web` 的工程模板。
- 启动方式、env 校验、API 聚合、会话恢复、路由拆分规则默认沿用 `web`。

## 2. app 角色

- `apps/admin` 是管理台应用。
- 负责后台页面、后台布局、后台导航和页面级状态编排。
- 不是共享能力沉淀层。

## 3. 必须复用的部分

- `src/main.tsx` 的启动注入方式
- `src/config/env.ts` 的环境变量读取方式
- `src/api/index.ts` 的服务聚合方式
- `App.tsx` 中的会话恢复模式
- `routes/*`、`layouts/*`、`pages/*` 的分层

## 4. 后台特例

- 后台 UI 必须优先复用 `@workspace/ui-components` 与 `@workspace/ui-theme`。
- 页面私有布局允许在 `apps/admin` 内用局部结构表达，但不能引入第三方 UI 设计系统作为主组件层。
- 服务能力、错误模型、query client、主题模式能力仍必须复用 workspace 现有包。
- 不得把 demo 项目的目录结构直接整套搬入本仓库；只能提取适合 `admin` 的页面和布局思路。

## 5. 共享边界

- 只在 `admin` 内使用的后台布局与页面组件，留在 `apps/admin/src/components`。
- 若未来明确被多个 app 复用，再上移到 `packages/*`。

## 6. 完成门禁

涉及 `apps/admin` 的改动至少通过：

- `pnpm -C apps/admin lint`
- `pnpm -C apps/admin test`
- `pnpm -C apps/admin build`
