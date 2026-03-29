# UI Core 组件测试清单（迁移到 ui-components）

> 目标：按“常用优先”逐个验证 `@workspace/ui-core` 组件；验证通过后，再落到 `@workspace/ui-components`（优先 `stable`，不稳定先进 `labs`）。

## 使用方式

每个组件按下面 4 步推进：

1. 在 `apps/test` 建立/完善该组件测试区块（交互、可控性、可访问性）。
2. 勾选“ui-core 测试通过”。
3. 在 `ui-components` 实现产品封装（遵循 `stable/labs` 分组协议）。
4. 勾选“已迁移到 ui-components”。

记录格式：

- `ui-core 测试通过`: `[ ]` / `[x]`
- `ui-components 迁移`: `[ ] stable` / `[ ] labs`

## 统一验收标准（每个 ui-core 组件都要过）

- `mode` 双模式：`styled`（默认）与 `headless` 均可用。
- `headless` 模式不注入设计系统 class/data 属性，仅透传业务 props。
- `styled` 模式支持组件既有样式能力（如 `variant/size/color`、`classNameMode`、`classResolver`）。
- 键盘交互与无障碍语义正常（focus、aria、禁用态、错误态等）。
- 与表单/受控状态协作正常（`value/defaultValue/onChange` 等）。
- 通过闸门：
  - `pnpm -C packages/ui-core lint`
  - `pnpm -C packages/ui-core typecheck`
  - `pnpm --filter @workspace/ui-components typecheck`
  - `pnpm --filter test lint`
  - `pnpm --filter test build`

## P0（最高优先级：最常用基础组件）

- [x] Button (`ui-core/button`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Input (`ui-core/input`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Select (`ui-core/select`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Checkbox (`ui-core/checkbox`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Radio Group (`ui-core/radio-group`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Switch (`ui-core/switch`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Tabs (`ui-core/tabs`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Textarea (`ui-core/textarea`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Label (`ui-core/label`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Field (`ui-core/field`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Dialog (`ui-core/dialog`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Dropdown Menu (`ui-core/dropdown-menu`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Popover (`ui-core/popover`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Tooltip (`ui-core/tooltip`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Card (`ui-core/card`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Table (`ui-core/table`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Badge (`ui-core/badge`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Separator (`ui-core/separator`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Skeleton (`ui-core/skeleton`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Progress (`ui-core/progress`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Alert (`ui-core/alert`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Spinner (`ui-core/spinner`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs

## P1（高优先级：常见业务与导航交互）

- [x] Accordion (`ui-core/accordion`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Combobox (`ui-core/combobox`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Command (`ui-core/command`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Navigation Menu (`ui-core/navigation-menu`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Menubar (`ui-core/menubar`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Context Menu (`ui-core/context-menu`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Sheet (`ui-core/sheet`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Drawer (`ui-core/drawer`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Alert Dialog (`ui-core/alert-dialog`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Calendar (`ui-core/calendar`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Pagination (`ui-core/pagination`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Breadcrumb (`ui-core/breadcrumb`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Avatar (`ui-core/avatar`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Input Group (`ui-core/input-group`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Input OTP (`ui-core/input-otp`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Toggle (`ui-core/toggle`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Toggle Group (`ui-core/toggle-group`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Button Group (`ui-core/button-group`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs
- [x] Slider (`ui-core/slider`) | ui-core 测试通过 | ui-components: [x] stable [ ] labs

## P2（中优先级：布局增强与体验组件）

- [ ] Collapsible (`ui-core/collapsible`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Hover Card (`ui-core/hover-card`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Scroll Area (`ui-core/scroll-area`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Carousel (`ui-core/carousel`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Sidebar (`ui-core/sidebar`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Resizable (`ui-core/resizable`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Aspect Ratio (`ui-core/aspect-ratio`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Native Select (`ui-core/native-select`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Item (`ui-core/item`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Kbd (`ui-core/kbd`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs

## P3（低优先级：特定场景/工具型）

- [ ] Chart (`ui-core/chart`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Sonner (`ui-core/sonner`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Empty (`ui-core/empty`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs
- [ ] Direction (`ui-core/direction`) | ui-core 测试通过 | ui-components: [ ] stable [ ] labs

## 当前已在 ui-components/stable 的组件（建议先做回归确认）

- `button`
- `input`
- `checkbox`
- `switch`
- `slider`
- `radio-group`
- `tabs`
- `select`
