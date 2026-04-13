# @workspace/ui-components 协议

## 宪章

`@workspace/ui-components` 是构建在 `@workspace/ui-core` 之上的基础样式化组件层。
所有应用包在需要简单、稳定、可复用的共享 UI 时，应优先从本包消费。

## 作用域

- `@workspace/ui-core`：headless 原语与行为契约。不得因应用需求直接修改。
- `@workspace/ui-components`：简单组件、标准组件、稳定组件。负责固定 API 的基础视觉封装。
- `@workspace/app-components`：面向应用的复合组件。负责页面装配、布局语义与业务场景组合。

## 组件分组（强制）

`src/components` 下所有组件必须且只能归入一个分组：

- `src/components/stable/*`：标准化、可复用、可用于生产的组件。
- `src/components/labs/*`：实验性或领域性组件，尚未标准化。

禁止将组件直接实现到 `src/components/*` 根目录。

## Fixed-Only 原则（强制）

`@workspace/ui-components` 必须实现 fixed-only 设计系统。

- 组件必须暴露确定性、显式的产品 API。
- 组件禁止暴露 free/flex/customization 接口。
- 组件禁止依赖应用层的样式决策。

## API 约束（强制）

对 stable 组件：

- 必须使用显式、受控的 props。
- 禁止暴露 `className`、`style`、自由形态 `...props` 透传。
- 禁止暴露 `mode`、`asChild`、`classResolver`、`classNameMode` 或同类 headless 控制项。
- 禁止向应用层暴露通用 slot/render 注入能力。

## 结构约束（强制）

- 组件在有产品语义时必须通过显式结构化 props 表达（例如 `title`、`description`、`actions`）。
- 禁止将会削弱产品一致性的任意组合能力作为默认应用层 API 暴露。
- 若组件本质是页面装配、业务语义组合、布局壳层或没有稳定统一格式的复合组件，不得放入 `ui-components`，必须进入 `@workspace/app-components`。

## 实现风格规则

### 简单组件（Button 风格）

简单组件（单一职责、低组合复杂度）必须遵循 Button 风格 API：

- 仅允许显式白名单 props。
- 禁止直接重导出 ui-core 全量 props。
- 禁止向应用层开放样式覆盖入口。

### 复杂组件（Select 风格）

复杂组件（多结构/多交互状态）必须遵循 Select 风格封装：

- 在 `ui-components` 内提供仍然具备稳定通用格式的组件封装。
- 对外仅暴露受控、确定性的 API。
- 禁止向应用层暴露结构改写与样式注入能力。

不符合“稳定通用格式”前提的复合组件，不属于本包职责。

## 应用使用规则（强制）

应用必须：

- 从 `@workspace/ui-components` 导入共享基础组件。
- 从 `@workspace/app-components` 导入共享复合组件。

应用禁止：

- 从 `@workspace/ui-core` 导入共享产品 UI。
- 通过包裹共享组件进行样式注入作为 workaround。
- 通过任何扩展点覆盖共享组件样式。

当现有能力不足时：

- 若是简单、稳定组件能力不足，必须扩展或修改 `@workspace/ui-components`。
- 若是复合组件装配能力不足，必须扩展或修改 `@workspace/app-components`。
- 禁止在应用层通过自定义绕过共享包边界实现需求。

## 导出策略

- 根导出（`@workspace/ui-components`）必须导出 stable 组件。
- 根导出默认禁止导出 labs 组件。
- 若 labs 组件需要临时消费，必须使用显式 labs 子路径导出，并按临时能力管理。

## 构建与晋升闸门

每个新增共享组件必须遵循：

1. 从 `ui-core` 原语/契约出发。
2. 判断边界：
   - 简单/稳定组件，进入 `ui-components`
   - 复合/装配组件，进入 `app-components`
3. 在目标包内实现对应能力。
4. 若落在 `ui-components`，选择分组：`labs` 或 `stable`。
5. 在 `apps/test` 增加或更新验证。
6. 通过闸门：
   - `pnpm --filter @workspace/ui-components typecheck`
   - `pnpm --filter test lint`
   - `pnpm --filter test build`
7. 仅在 API 与行为稳定后，方可从 `labs` 晋升到 `stable`。

## AI 执行规则（强制）

任何修改本包的 AI 代理必须遵守：

1. 本协议是硬约束。
2. 禁止将产品样式决策下放到 `ui-core`。
3. 禁止把复合组件错误地塞进 `ui-components`。
4. 必须执行 stable/labs 分组约束。
5. 必须优先 fixed-only 严格 API，而非便利性透传。
6. 禁止新增面向应用层的可定制入口。
7. 协议与便利性冲突时，以协议为准。
