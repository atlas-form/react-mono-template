import { useMemo, useState } from "react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  toast,
} from "@workspace/ui-components"

type ThemeMode = "light" | "dark"

type TokenDefinition = {
  key: string
  label: string
  description: string
}

type ThemeValues = Record<string, string>

type ThemeDraft = Record<ThemeMode, ThemeValues>

const CORE_TOKEN_DEFINITIONS: readonly TokenDefinition[] = [
  { key: "background", label: "Background", description: "页面背景主色。" },
  { key: "foreground", label: "Foreground", description: "全局正文文本颜色。" },
  { key: "surface", label: "Surface", description: "大面积表面层背景。" },
  {
    key: "surface-foreground",
    label: "Surface Foreground",
    description: "表面层上的文本或图标颜色。",
  },
  {
    key: "surface-component",
    label: "Surface Component",
    description: "组件承载层或更高一层的表面底色。",
  },
  { key: "card", label: "Card", description: "Card 组件背景。" },
  {
    key: "card-foreground",
    label: "Card Foreground",
    description: "Card 组件文本颜色。",
  },
  { key: "popover", label: "Popover", description: "浮层背景色。" },
  {
    key: "popover-foreground",
    label: "Popover Foreground",
    description: "浮层文本颜色。",
  },
  { key: "primary", label: "Primary", description: "主按钮、主强调色。" },
  {
    key: "primary-outline",
    label: "Primary Outline",
    description: "主色描边和弱态边框。",
  },
  {
    key: "primary-foreground",
    label: "Primary Foreground",
    description: "主色块上的文本颜色。",
  },
  { key: "secondary", label: "Secondary", description: "次级表面或按钮背景。" },
  {
    key: "secondary-foreground",
    label: "Secondary Foreground",
    description: "次级表面上的文本颜色。",
  },
  { key: "muted", label: "Muted", description: "弱化背景、说明区块。" },
  {
    key: "muted-foreground",
    label: "Muted Foreground",
    description: "弱化说明文本。",
  },
  { key: "accent", label: "Accent", description: "交互 hover、高亮辅助色。" },
  {
    key: "accent-foreground",
    label: "Accent Foreground",
    description: "accent 背景上的文本颜色。",
  },
  { key: "border", label: "Border", description: "默认边框色。" },
  {
    key: "destructive",
    label: "Destructive",
    description: "危险操作与错误强调。",
  },
  { key: "info", label: "Info", description: "信息态颜色。" },
  { key: "success", label: "Success", description: "成功态颜色。" },
  { key: "warning", label: "Warning", description: "警告态颜色。" },
  { key: "error", label: "Error", description: "错误态颜色。" },
] as const

const COMPONENT_TOKEN_DEFINITIONS: readonly TokenDefinition[] = [
  { key: "input", label: "Input", description: "输入框边框/背景语义色。" },
  { key: "ring", label: "Ring", description: "focus ring 颜色。" },
  { key: "chart-1", label: "Chart 1", description: "图表主色 1。" },
  { key: "chart-2", label: "Chart 2", description: "图表主色 2。" },
  { key: "chart-3", label: "Chart 3", description: "图表主色 3。" },
  { key: "chart-4", label: "Chart 4", description: "图表主色 4。" },
  { key: "chart-5", label: "Chart 5", description: "图表主色 5。" },
  { key: "sidebar", label: "Sidebar", description: "侧边栏背景色。" },
  {
    key: "sidebar-foreground",
    label: "Sidebar Foreground",
    description: "侧边栏文字颜色。",
  },
  {
    key: "sidebar-primary",
    label: "Sidebar Primary",
    description: "侧边栏主强调色。",
  },
  {
    key: "sidebar-primary-foreground",
    label: "Sidebar Primary Foreground",
    description: "侧边栏主强调文本色。",
  },
  {
    key: "sidebar-accent",
    label: "Sidebar Accent",
    description: "侧边栏次级强调色。",
  },
  {
    key: "sidebar-accent-foreground",
    label: "Sidebar Accent Foreground",
    description: "侧边栏次级强调文本色。",
  },
  {
    key: "sidebar-border",
    label: "Sidebar Border",
    description: "侧边栏分隔边框色。",
  },
  {
    key: "sidebar-ring",
    label: "Sidebar Ring",
    description: "侧边栏聚焦 ring 颜色。",
  },
] as const

const DEFAULT_TOKENS: ThemeDraft = {
  light: {
    background: "oklch(0.99 0.002 247)",
    foreground: "oklch(0.27 0.02 256)",
    surface: "color(display-p3 0.925 0.925 0.925)",
    "surface-foreground": "oklch(0.27 0.02 256)",
    "surface-component": "color(display-p3 0.825 0.825 0.825)",
    card: "color(display-p3 0.925 0.925 0.925)",
    "card-foreground": "oklch(0.27 0.02 256)",
    popover: "color(display-p3 0.925 0.925 0.925)",
    "popover-foreground": "oklch(0.27 0.02 256)",
    primary: "color(display-p3 0.142 0.343 0.791)",
    "primary-outline": "color(display-p3 0.151 0.394 0.652)",
    "primary-foreground": "oklch(0.99 0 0)",
    secondary: "color(display-p3 0.88 0.9 0.94)",
    "secondary-foreground": "color(display-p3 0.25 0.28 0.32)",
    muted: "oklch(0.96 0.008 247)",
    "muted-foreground": "oklch(0.54 0.02 254)",
    accent: "oklch(0.94 0.015 250)",
    "accent-foreground": "oklch(0.31 0.02 256)",
    border: "oklch(0.89 0.01 250)",
    destructive: "oklch(0.62 0.22 28)",
    info: "color(display-p3 0.3 0.52 0.9)",
    success: "color(display-p3 0.42 0.7 0.35)",
    warning: "color(display-p3 0.7 0.45 0.22)",
    error: "color(display-p3 0.7 0.35 0.33)",
    input: "oklch(0.9 0.012 250)",
    ring: "oklch(0.62 0.18 258)",
    "chart-1": "oklch(0.63 0.2 258)",
    "chart-2": "oklch(0.72 0.16 200)",
    "chart-3": "oklch(0.69 0.18 145)",
    "chart-4": "oklch(0.73 0.17 85)",
    "chart-5": "oklch(0.65 0.2 20)",
    sidebar: "oklch(0.975 0.006 250)",
    "sidebar-foreground": "oklch(0.27 0.02 256)",
    "sidebar-primary": "oklch(0.57 0.19 258)",
    "sidebar-primary-foreground": "oklch(0.99 0 0)",
    "sidebar-accent": "oklch(0.94 0.015 250)",
    "sidebar-accent-foreground": "oklch(0.31 0.02 256)",
    "sidebar-border": "oklch(0.89 0.01 250)",
    "sidebar-ring": "oklch(0.62 0.18 258)",
  },
  dark: {
    background: "oklch(0.2 0.012 255)",
    foreground: "oklch(0.95 0.008 250)",
    surface: "color(display-p3 0.163 0.17 0.167)",
    "surface-foreground": "color(display-p3 0.878 0.879 0.879)",
    "surface-component": "color(display-p3 0.213 0.22 0.217)",
    card: "color(display-p3 0.163 0.17 0.167)",
    "card-foreground": "color(display-p3 0.878 0.879 0.879)",
    popover: "color(display-p3 0.163 0.17 0.167)",
    "popover-foreground": "color(display-p3 0.878 0.879 0.879)",
    primary: "color(display-p3 0.142 0.343 0.791)",
    "primary-outline": "color(display-p3 0.1 0.55 1)",
    "primary-foreground": "white",
    secondary: "color(display-p3 0.22 0.25 0.29)",
    "secondary-foreground": "oklch(0.93 0.01 258)",
    muted: "oklch(0.26 0.012 255)",
    "muted-foreground": "oklch(0.74 0.012 250)",
    accent: "oklch(0.31 0.02 255)",
    "accent-foreground": "oklch(0.95 0.008 250)",
    destructive: "oklch(0.71 0.18 24)",
    border: "oklch(0.38 0.01 252 / 65%)",
    info: "color(display-p3 0.242 0.543 0.991)",
    success: "color(display-p3 0.3954 0.7694 0.4)",
    warning: "color(display-p3 0.9404 0.5755 0.2617)",
    error: "color(display-p3 0.9209 0.2964 0.2741)",
    input: "oklch(0.33 0.01 252 / 70%)",
    ring: "oklch(0.69 0.15 258)",
    "chart-1": "oklch(0.69 0.15 258)",
    "chart-2": "oklch(0.72 0.15 205)",
    "chart-3": "oklch(0.73 0.15 150)",
    "chart-4": "oklch(0.75 0.14 95)",
    "chart-5": "oklch(0.7 0.18 30)",
    sidebar: "oklch(0.22 0.014 255)",
    "sidebar-foreground": "oklch(0.95 0.008 250)",
    "sidebar-primary": "oklch(0.69 0.15 258)",
    "sidebar-primary-foreground": "oklch(0.2 0.01 255)",
    "sidebar-accent": "oklch(0.31 0.02 255)",
    "sidebar-accent-foreground": "oklch(0.95 0.008 250)",
    "sidebar-border": "oklch(0.38 0.01 252 / 65%)",
    "sidebar-ring": "oklch(0.69 0.15 258)",
  },
}

const ALL_TOKEN_KEYS = [
  ...CORE_TOKEN_DEFINITIONS.map((token) => token.key),
  ...COMPONENT_TOKEN_DEFINITIONS.map((token) => token.key),
]

function buildPreviewStyle(mode: ThemeMode, draft: ThemeDraft) {
  return ALL_TOKEN_KEYS.reduce<Record<string, string>>((style, key) => {
    style[`--${key}`] = draft[mode][key]
    return style
  }, {})
}

function buildThemeCss(mode: ThemeMode, values: ThemeValues) {
  const selector =
    mode === "light" ? ":root" : 'html[data-theme="dark"],\n:root.dark'

  const coreLines = CORE_TOKEN_DEFINITIONS.map(
    (token) => `  --${token.key}: ${values[token.key]};`
  ).join("\n")

  const componentLines = COMPONENT_TOKEN_DEFINITIONS.map(
    (token) => `  --${token.key}: ${values[token.key]};`
  ).join("\n")

  return `${selector} {\n  /* Core semantic tokens */\n${coreLines}\n\n  /* Component-level tokens */\n${componentLines}\n}`
}

function ThemePreviewCard({
  mode,
  draft,
}: {
  mode: ThemeMode
  draft: ThemeDraft
}) {
  const previewStyle = useMemo(() => buildPreviewStyle(mode, draft), [draft, mode])

  return (
    <div
      data-theme={mode}
      className="rounded-2xl border border-(--border) p-4 shadow-sm"
      style={{
        ...previewStyle,
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium">{mode === "light" ? "Light" : "Dark"} Preview</div>
          <div className="text-xs text-(--muted-foreground)">
            基于当前表单值渲染，不会改动真实包文件。
          </div>
        </div>
        <Badge variant="outline">{mode}</Badge>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="rounded-xl border p-4"
          style={{
            background: "var(--card)",
            color: "var(--card-foreground)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-sm font-semibold">Guild Theme Surface</div>
          <div className="mt-1 text-sm text-(--muted-foreground)">
            用一组语义色同时覆盖背景、按钮、输入框和状态色。
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Save Theme
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              style={{
                background: "var(--secondary)",
                color: "var(--secondary-foreground)",
                borderColor: "var(--primary-outline)",
              }}
            >
              Secondary
            </button>
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium"
              style={{
                background: "var(--destructive)",
                color: "var(--primary-foreground)",
              }}
            >
              Dangerous
            </button>
          </div>
          <div
            className="mt-4 rounded-xl border px-3 py-2 text-sm"
            style={{
              background: "var(--surface)",
              color: "var(--surface-foreground)",
              borderColor: "var(--input)",
              boxShadow: "0 0 0 2px var(--ring) inset",
            }}
          >
            Token-driven input shell
          </div>
        </div>
        <div className="grid gap-3">
          <div
            className="rounded-xl border p-4"
            style={{
              background: "var(--sidebar)",
              color: "var(--sidebar-foreground)",
              borderColor: "var(--sidebar-border)",
            }}
          >
            <div
              className="inline-flex rounded-md px-2 py-1 text-xs font-semibold"
              style={{
                background: "var(--sidebar-primary)",
                color: "var(--sidebar-primary-foreground)",
              }}
            >
              Sidebar Primary
            </div>
            <div
              className="mt-3 rounded-lg px-3 py-2 text-sm"
              style={{
                background: "var(--sidebar-accent)",
                color: "var(--sidebar-accent-foreground)",
              }}
            >
              Active navigation item
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map((key) => (
              <div key={key} className="space-y-2 text-center text-[11px] text-(--muted-foreground)">
                <div
                  className="h-14 rounded-lg"
                  style={{ background: `var(--${key})` }}
                />
                <span>{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThemeGuidePage() {
  const [activeMode, setActiveMode] = useState<ThemeMode>("light")
  const [draft, setDraft] = useState<ThemeDraft>(DEFAULT_TOKENS)

  const cssOutput = useMemo(
    () =>
      `${buildThemeCss("light", draft.light)}\n\n${buildThemeCss("dark", draft.dark)}`,
    [draft]
  )

  const updateToken = (mode: ThemeMode, key: string, value: string) => {
    setDraft((current) => ({
      ...current,
      [mode]: {
        ...current[mode],
        [key]: value,
      },
    }))
  }

  const resetMode = (mode: ThemeMode) => {
    setDraft((current) => ({
      ...current,
      [mode]: { ...DEFAULT_TOKENS[mode] },
    }))
  }

  const copyCss = async () => {
    await navigator.clipboard.writeText(cssOutput)
    toast("Theme CSS copied", {
      description: "可以直接贴回 @workspace/ui-theme 的 light/dark token 文件。",
    })
  }

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <Badge variant="outline">ui-theme semantics</Badge>
                <CardTitle>Theme 配置页</CardTitle>
                <CardDescription>
                  按照 `@workspace/ui-theme` 当前语义 token 结构，分别配置 light 和 dark
                  颜色，并实时查看组件预览与导出结果。
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => resetMode(activeMode)}>
                  重置当前模式
                </Button>
                <Button onClick={() => void copyCss()}>复制 CSS</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 rounded-2xl border border-dashed border-(--border) bg-(--surface) p-4 md:grid-cols-3">
              <div>
                <div className="text-sm font-medium">编辑方式</div>
                <div className="mt-1 text-sm text-(--muted-foreground)">
                  支持 `oklch()`、`color(display-p3 ...)`、hex、rgb 和命名色。
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">适用场景</div>
                <div className="mt-1 text-sm text-(--muted-foreground)">
                  给 guild/guide 页面先做视觉试配，再回填到 `ui-theme` 包。
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">边界</div>
                <div className="mt-1 text-sm text-(--muted-foreground)">
                  这里只改浏览器中的草稿值，不直接写入包源码。
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div id="semantic-tokens" className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle>Semantic Tokens</CardTitle>
                  <CardDescription>
                    先切换模式，再编辑对应 token。字段名与 `ui-theme` 保持一致。
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-(--muted) p-1">
                  {(["light", "dark"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
                      style={{
                        background:
                          activeMode === mode ? "var(--card)" : "transparent",
                        color:
                          activeMode === mode
                            ? "var(--card-foreground)"
                            : "var(--muted-foreground)",
                      }}
                      onClick={() => setActiveMode(mode)}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold">Core tokens</div>
                    <div className="text-sm text-(--muted-foreground)">
                      页面层语义色，覆盖背景、文本、边框、状态和品牌主色。
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {CORE_TOKEN_DEFINITIONS.map((token) => (
                      <label
                        key={token.key}
                        className="rounded-xl border border-(--border) bg-(--card) p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium">{token.label}</div>
                            <div className="mt-1 text-xs text-(--muted-foreground)">
                              {token.description}
                            </div>
                          </div>
                          <div
                            className="h-8 w-8 shrink-0 rounded-md border border-(--border)"
                            style={{ background: draft[activeMode][token.key] }}
                          />
                        </div>
                        <Input
                          value={draft[activeMode][token.key]}
                          onValueChange={(value) =>
                            updateToken(activeMode, token.key, value)
                          }
                        />
                      </label>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold">Component tokens</div>
                    <div className="text-sm text-(--muted-foreground)">
                      输入框、图表、sidebar 这类组件级颜色语义。
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {COMPONENT_TOKEN_DEFINITIONS.map((token) => (
                      <label
                        key={token.key}
                        className="rounded-xl border border-(--border) bg-(--card) p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium">{token.label}</div>
                            <div className="mt-1 text-xs text-(--muted-foreground)">
                              {token.description}
                            </div>
                          </div>
                          <div
                            className="h-8 w-8 shrink-0 rounded-md border border-(--border)"
                            style={{ background: draft[activeMode][token.key] }}
                          />
                        </div>
                        <Input
                          value={draft[activeMode][token.key]}
                          onValueChange={(value) =>
                            updateToken(activeMode, token.key, value)
                          }
                        />
                      </label>
                    ))}
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>

          <div id="preview" className="space-y-6">
            <ThemePreviewCard mode="light" draft={draft} />
            <ThemePreviewCard mode="dark" draft={draft} />
          </div>
        </div>

        <div id="export">
          <Card>
            <CardHeader>
              <CardTitle>导出 CSS</CardTitle>
              <CardDescription>
                当前输出遵循 `ui-theme` 的 light/dark 语义结构，可以直接作为 token 草稿。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={cssOutput}
                readOnly
                className="min-h-[420px] w-full rounded-xl border border-(--border) bg-(--surface) p-3 font-mono text-xs text-(--foreground)"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
