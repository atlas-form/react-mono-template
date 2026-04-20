# apps/admin 协议

`apps/admin` 是商用后台应用，不是组件实验场。

它的目标是复用框架层能力，稳定地搭建后台页面，而不是在页面里重新发明一套后台 UI 系统。

## 1. 宪章

- `admin` 是真实商用 app。
- `admin` 负责后台路由、页面、布局、状态编排与业务流程。
- `admin` 不是共享 UI 沉淀层。

## 2. 默认消费顺序

AI 在 `admin` 中写页面时，默认顺序必须是：

1. 先找 `@workspace/app-components`
2. 再找 `@workspace/ui-components`
3. 最后才写 `admin` 本地组件

不得默认从 `ui-core` 直接起手写页面。

## 3. 适合放在 admin 本地的内容

- 只服务于 `admin` 的页面组件
- 只服务于 `admin` 的局部布局
- 与后台业务流程强绑定的页面逻辑

若某个能力已经明显可被第二个 app 复用，应上移到 `packages/*`。

## 4. 后台页面默认策略

- 列表页优先使用 `DataTable`
- 后台导航优先使用已有 sidebar / top bar 体系
- 简单表单与交互优先使用 `ui-components`
- 不允许为了单页面便利直接复制共享组件内部结构

## 5. 禁止事项

- 禁止引入第二套第三方 UI 设计系统作为主组件层
- 禁止在页面里直接散落 primitive 写法
- 禁止把共享问题留在 `admin` 本地临时修补后不回收
- 禁止把 demo 风格代码整块搬进生产后台

## 6. admin 对整个框架的意义

- `admin` 是商用主战场
- `admin` 中沉淀出来的稳定后台模式，应优先回收到 `app-components`
- `admin` 页面写法本身也应成为 AI 的参考样例

## 7. 门禁

涉及 `apps/admin` 的改动至少通过：

- `pnpm -C apps/admin lint`
- `pnpm -C apps/admin test`
- `pnpm -C apps/admin build`
