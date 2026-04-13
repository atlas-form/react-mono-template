# @workspace/app-components 协议

## 宪章

`@workspace/app-components` 用于承载共享复合组件。

这里的组件直接服务于应用装配，可以有明确页面语义、布局语义和业务语义，不要求像基础组件那样具备稳定统一格式。

## 作用域

- 负责跨 app 复用的复合组件。
- 负责基于 `ui-components` / `ui-core` 进行页面级装配。
- 允许使用更贴近应用的结构化 API。

## 不属于本包的内容

- 简单、基础、通用、样式固定的组件，不得放入本包，必须进入 `@workspace/ui-components`。
- headless 原语与行为契约，不得放入本包，必须进入 `@workspace/ui-core`。
- 主题 token，不得放入本包，必须进入 `@workspace/ui-theme`。

## API 原则

- 组件 API 以应用可用性优先，不强制 fixed-only。
- 可以暴露合理的组合能力，但仍应避免无边界透传。
- 优先表达页面装配语义，而不是伪装成基础原子组件。

## 目录规则

- 组件实现放在 `src/components/*`。
- 根导出只导出当前明确要给应用消费的组件。
- 允许按组件名提供子路径导出。

## 应用使用规则

- app 需要共享复合组件时，应优先从 `@workspace/app-components` 导入。
- 禁止在多个 app 中复制同一个布局壳层或复合组件实现。
- 若组件已经沉淀为稳定基础模式，应回收至 `@workspace/ui-components`。

## 完成标准

1. 明确判断该组件属于“复合组件”，而不是基础组件。
2. 在 `app-components` 内实现并导出。
3. 至少在一个真实 app 中完成接入验证。
4. 通过 `pnpm --filter @workspace/app-components typecheck`。
