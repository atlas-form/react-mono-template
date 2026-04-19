import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@workspace/ui-components"
import {
  applyThemeOverrides,
  clearThemeOverrides,
  loadThemeOverrides,
  saveThemeOverrides,
  type ThemeDraft,
  type ThemeMode,
} from "@/theme/themeOverrides"

type TokenDefinition = {
  key: string
  label: string
  description: string
}

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

const ALL_TOKEN_DEFINITIONS = [
  ...CORE_TOKEN_DEFINITIONS,
  ...COMPONENT_TOKEN_DEFINITIONS,
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

function mergeDraftWithDefaults(
  draft: ThemeDraft | null | undefined
): ThemeDraft {
  return {
    light: {
      ...DEFAULT_TOKENS.light,
      ...(draft?.light ?? {}),
    },
    dark: {
      ...DEFAULT_TOKENS.dark,
      ...(draft?.dark ?? {}),
    },
  }
}

function getResolvedDocumentTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "light"
  }

  const attr = document.documentElement.getAttribute("data-theme")
  return attr === "dark" ? "dark" : "light"
}

function resolveColorInputValue(value: string) {
  if (typeof document === "undefined") {
    return "#000000"
  }

  const sample = document.createElement("span")
  sample.style.color = ""
  sample.style.color = value

  if (!sample.style.color) {
    return "#000000"
  }

  document.body.appendChild(sample)
  const resolved = window.getComputedStyle(sample).color
  sample.remove()

  const match = resolved.match(
    /rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i
  )

  if (!match) {
    return "#000000"
  }

  const toHex = (channel: string) =>
    Number(channel).toString(16).padStart(2, "0")

  return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`
}

function ThemeTokenField({
  token,
  activeMode,
  value,
  onChange,
}: {
  token: TokenDefinition
  activeMode: ThemeMode
  value: string
  onChange: (value: string) => void
}) {
  const colorInputId = useId()
  const colorInputRef = useRef<HTMLInputElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const swatchRef = useRef<HTMLSpanElement | null>(null)

  const getHexFromRenderedSwatch = () => {
    const swatch = swatchRef.current
    if (!swatch || typeof window === "undefined") {
      return resolveColorInputValue(value)
    }

    const resolved = window.getComputedStyle(swatch).backgroundColor
    const match = resolved.match(
      /rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i
    )

    if (!match) {
      return resolveColorInputValue(value)
    }

    const toHex = (channel: string) =>
      Number(channel).toString(16).padStart(2, "0")

    return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`
  }

  const positionColorInputNearTrigger = () => {
    const input = colorInputRef.current
    const trigger = triggerRef.current
    if (!input || !trigger) {
      return
    }

    input.value = getHexFromRenderedSwatch()

    const rect = trigger.getBoundingClientRect()
    input.style.left = `${Math.round(rect.left + rect.width / 2)}px`
    input.style.top = `${Math.round(rect.top + rect.height / 2)}px`
  }

  const openColorPicker = () => {
    const input = colorInputRef.current
    if (!input) {
      return
    }

    positionColorInputNearTrigger()

    if ("showPicker" in input && typeof input.showPicker === "function") {
      input.showPicker()
      return
    }

    input.click()
  }

  return (
    <div className="rounded-xl border border-(--border) bg-(--card) p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium">{token.label}</div>
          <div className="mt-1 text-xs text-(--muted-foreground)">
            {token.description}
          </div>
        </div>
        <button
          type="button"
          ref={triggerRef}
          className="block h-14 w-14 shrink-0 cursor-pointer rounded-2xl border border-(--border) p-3"
          aria-label={`${token.label} color picker`}
          title={`选择 ${activeMode} ${token.label} 颜色`}
          onClick={openColorPicker}
        >
          <span
            ref={swatchRef}
            className="block h-full w-full rounded-md border border-black/10"
            style={{ background: value }}
          />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <input
          id={colorInputId}
          ref={colorInputRef}
          type="color"
          value={resolveColorInputValue(value)}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none fixed z-[-1] h-px w-px opacity-0"
          onChange={(event) => onChange(event.target.value)}
        />
        <div className="min-w-0 flex-1">
          <Input value={value} onValueChange={onChange} />
        </div>
      </div>
    </div>
  )
}

export default function ThemeGuidePage() {
  const [activeMode, setActiveMode] = useState<ThemeMode>("light")
  const [draft, setDraft] = useState<ThemeDraft>(() =>
    mergeDraftWithDefaults(loadThemeOverrides())
  )
  const [editorShellMode, setEditorShellMode] = useState<ThemeMode>(() =>
    getResolvedDocumentTheme()
  )

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined
    }

    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setEditorShellMode(getResolvedDocumentTheme())
    })

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const editorShellStyle = ALL_TOKEN_DEFINITIONS.reduce((style, token) => {
    style[`--${token.key}`] = DEFAULT_TOKENS[editorShellMode][token.key]
    return style
  }, {} as Record<string, string>) as CSSProperties

  const updateToken = (mode: ThemeMode, key: string, value: string) => {
    setDraft((current) => ({
      ...current,
      [mode]: (() => {
        const nextMode = {
          ...current[mode],
          [key]: value,
        }

        const nextDraft = {
          ...current,
          [mode]: nextMode,
        }

        applyThemeOverrides(nextDraft)
        saveThemeOverrides(nextDraft)
        return nextMode
      })(),
    }))
  }

  const resetMode = (mode: ThemeMode) => {
    setDraft((current) => {
      const nextDraft = {
        ...current,
        [mode]: { ...DEFAULT_TOKENS[mode] },
      }

      applyThemeOverrides(nextDraft)
      saveThemeOverrides(nextDraft)
      return nextDraft
    })
  }

  const resetAll = () => {
    const nextDraft = mergeDraftWithDefaults(null)
    setDraft(nextDraft)
    clearThemeOverrides()
  }

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-auto">
      <div
        className="mx-auto flex max-w-6xl flex-col gap-6 p-4 md:p-6"
        style={editorShellStyle}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>Theme 配置页</CardTitle>
                <CardDescription>
                  直接修改当前 guide 项目的 light/dark 主题变量。
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={resetAll}>
                  恢复全部默认
                </Button>
                <Button variant="outline" onClick={() => resetMode(activeMode)}>
                  重置当前模式
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div id="semantic-tokens">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle>Semantic Tokens</CardTitle>
                  <CardDescription>字段名与 `ui-theme` 保持一致。</CardDescription>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-(--muted) p-1">
                  {(["light", "dark"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
                      style={{
                        background: activeMode === mode ? "var(--card)" : "transparent",
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
                  <div className="text-sm font-semibold">Core tokens</div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {CORE_TOKEN_DEFINITIONS.map((token) => (
                      <ThemeTokenField
                        key={token.key}
                        token={token}
                        activeMode={activeMode}
                        value={draft[activeMode][token.key]}
                        onChange={(value) => updateToken(activeMode, token.key, value)}
                      />
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="text-sm font-semibold">Component tokens</div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {COMPONENT_TOKEN_DEFINITIONS.map((token) => (
                      <ThemeTokenField
                        key={token.key}
                        token={token}
                        activeMode={activeMode}
                        value={draft[activeMode][token.key]}
                        onChange={(value) => updateToken(activeMode, token.key, value)}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
