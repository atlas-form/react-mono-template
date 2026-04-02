# AI Protocol Entry

这是给 AI 的统一协议入口。

开始任何分析、实现、重构、生成代码之前，必须先阅读本文件，并继续阅读下面映射到的协议文件。

本文件不是给普通使用者看的，而是给 AI 执行任务时读取的硬规则入口。

## AI 回答规则

AI 不只是改代码时要遵守协议，回答问题、给建议、做方案判断时也必须遵守。

强制要求：

- 所有判断、建议、方案、目录落点、组件归属，都必须基于当前仓库结构和对应 `PROTOCOL.md`
- 如果仓库已有明确规则，优先按现有规则回答，禁止另起一套说法
- 信息不足时，可以说明缺少什么上下文，但不能为了回答而瞎编
- 如果用户想法与当前协议冲突，必须明确指出冲突点，并按协议给出建议
- 优先引用当前项目中的目录、包职责、已有约定和已有实现方式

简化原则：

- 先读协议，再回答
- 先看现有结构，再建议
- 不要脱离仓库乱编方案
- 不要直接套用别的项目做法

## 环境准备规则

如果任务开始时仓库环境尚未准备完成，AI 应先完成环境检查，再进入代码修改。

至少检查：

- Node.js 版本是否满足 `>=20`
- `pnpm` 是否可用
- 根目录依赖是否已经安装
- 是否存在运行所需的环境变量文件
- 当前仓库是否已有未提交改动需要避让

基础命令：

```bash
pnpm install
pnpm dev
pnpm mock
pnpm build
pnpm lint
pnpm typecheck
```

## mock 环境规则

当需求不依赖真实后端时，AI 应优先评估是否可以直接使用 mock 环境完成开发和验证。

优先使用 mock 的典型场景：

- 页面开发
- 设计稿还原
- 交互开发
- 表单开发
- 没有真实后端时的前端联调

需要谨慎说明 mock 边界的场景：

- 真实接口契约验证
- 真实登录与权限问题
- 文件服务真实行为
- 与后端联调的边界问题

AI 在使用 mock 时必须明确汇报：

- 当前是否处于 mock 模式
- 使用的命令是什么
- 当前 mock 能覆盖哪些请求
- 哪些部分仍需真实后端验证

## 项目 package 设计

这是一个基于 `pnpm workspace` + `turbo` 的 monorepo。

目录分为两层：

- `apps/*`：最终应用
- `packages/*`：共享能力

### apps 层

- `apps/web`
  当前主业务应用。
  负责路由、页面、布局、页面状态编排、应用启动注入。

- `apps/test`
  组件验证应用。
  用于验证共享组件在不同主题、语言和交互状态下的表现。

### packages 层

- `packages/services`
  全局服务层。
  放跨应用复用的 API 基础设施、i18n、query client、错误模型、URL 能力。

- `packages/ui-theme`
  全局主题语义层。
  放 light/dark/system 共用的主题 token 和主题模式能力。

- `packages/ui-core`
  headless 基础组件层。
  放行为契约、无障碍接线、最小样式能力和底层原语。

- `packages/ui-components`
  产品级共享组件层。
  基于 `ui-core` 封装成给应用直接使用的共享组件。

- `packages/mock`
  本地 mock 能力层。
  负责在没有真实后端时模拟接口与外部资源行为。

## AI 必须先判断改动落点

在开始写代码前，AI 必须先判断需求属于哪一层：

- 页面、路由、布局、页面交互流程：`apps/web`
- 组件验证和展示：`apps/test`
- 通用服务能力：`packages/services`
- 主题变量和主题模式：`packages/ui-theme`
- headless 原语和基础行为：`packages/ui-core`
- 共享产品组件：`packages/ui-components`
- 本地 mock 能力：`packages/mock`

如果一个需求会同时影响多层，AI 必须先按分层拆解，再分别实现。

## package 依赖关系

默认依赖方向应保持如下：

```text
apps/*
  -> @workspace/ui-components
  -> @workspace/services
  -> @workspace/ui-theme

@workspace/ui-components
  -> @workspace/ui-core
  -> @workspace/ui-theme

@workspace/ui-core
  -> 不依赖 apps，不依赖 ui-components

@workspace/services
  -> 不依赖 UI 层

@workspace/mock
  -> 可以模拟服务行为
  -> 不承载页面和 UI 实现
```

这意味着：

- app 不应复制共享组件实现
- app 不应直接承接本应进入共享层的服务逻辑
- `ui-components` 是 app 使用共享 UI 的默认入口
- `ui-core` 不是业务页面默认直连层
- `services` 不能依赖 UI
- `mock` 只负责模拟，不替代真实服务分层

## 读取顺序

1. 先读本文件
2. 再根据任务范围读取对应 `PROTOCOL.md`
3. 如果多个协议同时适用，遵循“越具体越优先”

规则优先级：

- 更接近实际改动目录的协议，优先级更高
- 下级协议覆盖上级协议
- 如果没有更具体规则，按上级协议执行

## 协议映射

### apps 层

- `apps/*` 通用规则：
  [apps/PROTOCOL.md](../apps/PROTOCOL.md)

- `apps/web` 业务应用规则：
  [apps/web/PROTOCOL.md](../apps/web/PROTOCOL.md)

- `apps/test` 组件验证应用规则：
  [apps/test/PROTOCOL.md](../apps/test/PROTOCOL.md)

### packages 层

- 通用服务层：
  [packages/services/PROTOCOL.md](../packages/services/PROTOCOL.md)

- 主题 token 层：
  [packages/ui-theme/PROTOCOL.md](../packages/ui-theme/PROTOCOL.md)

- headless 基础组件层：
  [packages/ui-core/PROTOCOL.md](../packages/ui-core/PROTOCOL.md)

- 产品级共享组件层：
  [packages/ui-components/PROTOCOL.md](../packages/ui-components/PROTOCOL.md)

- 本地 mock 能力层：
  [packages/mock/PROTOCOL.md](../packages/mock/PROTOCOL.md)

## 按任务类型选择协议

- 新增或修改业务页面：
  先读 `apps/PROTOCOL.md`，再读 `apps/web/PROTOCOL.md`

- 新增 app 或调整 app 分层：
  必读 `apps/PROTOCOL.md`，再读目标 app 的本地协议

- 修改共享服务、API 基础设施、query、i18n、url：
  必读 `packages/services/PROTOCOL.md`

- 修改主题变量、light/dark token、主题模式：
  必读 `packages/ui-theme/PROTOCOL.md`

- 新增或改造 headless 原语组件：
  必读 `packages/ui-core/PROTOCOL.md`

- 新增或改造共享产品组件：
  必读 `packages/ui-components/PROTOCOL.md`
  同时必读 `apps/test/PROTOCOL.md`

- 新增或改造本地 mock 能力：
  必读 `packages/mock/PROTOCOL.md`

## 强制判断规则

AI 在动手前必须先判断改动属于哪一层：

- 页面编排、路由、布局、页面状态：放 `apps/web`
- 可复用服务能力：放 `packages/services`
- 共享主题 token：放 `packages/ui-theme`
- headless 原语能力：放 `packages/ui-core`
- 共享产品组件：放 `packages/ui-components`
- mock 接口与本地模拟能力：放 `packages/mock`
- 组件验证：放 `apps/test`

禁止跳过分层判断直接写代码。

## 完成前检查

AI 宣称完成前，必须按对应协议执行门禁命令。

最少要求不是固定一套，而是取决于改动落点：

- `apps/web` 改动：按 `apps/web/PROTOCOL.md` 执行
- `ui-components` 改动：按 `packages/ui-components/PROTOCOL.md` 和 `apps/test/PROTOCOL.md` 执行
- `ui-core` 改动：按 `packages/ui-core/PROTOCOL.md` 执行
- `services` / `ui-theme` 改动：按各自协议执行

如果协议要求的检查没有通过，禁止宣称任务完成。
