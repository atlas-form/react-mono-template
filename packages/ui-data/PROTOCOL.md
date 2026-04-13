# @workspace/ui-data 协议

## 宪章

`@workspace/ui-data` 负责在 `@workspace/ui-components` 之上提供可复用的数据型复合组件。
本包用于组合：

- UI 展示能力
- 远程数据加载状态
- 分页、错误、空态等数据交互流程

## 作用域

- `@workspace/ui-components`：基础与产品级 UI 组件，不负责 HTTP 或远程数据。
- `@workspace/services`：请求、查询、缓存、错误模型。
- `@workspace/ui-data`：将外部数据接入能力与共享 UI 组合成通用数据组件。

## 规则

- 组件禁止写死具体接口地址或业务资源名。
- 组件必须通过显式 props 接收 `fetchData`、query hook 或等价外部数据能力。
- 组件必须处理最小完备的数据状态：`loading`、`error`、`empty`、`success`。
- 组件应优先复用 `@workspace/ui-components`，而不是重复实现基础 UI。
