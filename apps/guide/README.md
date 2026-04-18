# admin

后台管理台应用。

## 运行

```bash
pnpm -C apps/admin dev
pnpm -C apps/admin mock
```

## 说明

- 工程模板继承自 `apps/web`
- UI 壳层使用 workspace 自有组件实现 admin dashboard
- 服务、鉴权恢复、mock 接法继续复用 workspace 现有实现
