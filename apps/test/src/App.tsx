import { useState } from "react"
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui-components"
import { useTheme } from "@/components/theme-provider"

type Locale = "zh-CN" | "en-US"

type Copy = {
  pageTitle: string
  pageDesc: string
  controlsTitle: string
  controlsDesc: string
  languageLabel: string
  themeLabel: string
  basicTitle: string
  basicDesc: string
  buttonPrimary: string
  buttonSecondary: string
  buttonSubtle: string
  buttonDefault: string
  buttonGhost: string
  buttonLink: string
  buttonDisabled: string
  inputTitle: string
  inputDesc: string
  inputPlaceholder: string
  searchPlaceholder: string
  lengthLabel: string
  footerHint: string
}

const copy: Record<Locale, Copy> = {
  "zh-CN": {
    pageTitle: "组件测试台",
    pageDesc: "组件必须从 @workspace/ui-components 选择并验证，不允许在 app 里私写产品组件。",
    controlsTitle: "测试控制项",
    controlsDesc: "切换语言和主题，检查组件在多场景下的一致性。",
    languageLabel: "语言",
    themeLabel: "主题",
    basicTitle: "Button 组件",
    basicDesc: "验证主次按钮、弱化按钮与禁用状态。",
    buttonPrimary: "主按钮",
    buttonSecondary: "次按钮",
    buttonSubtle: "弱化按钮",
    buttonDefault: "默认按钮",
    buttonGhost: "幽灵按钮",
    buttonLink: "链接按钮",
    buttonDisabled: "禁用按钮",
    inputTitle: "Input 组件",
    inputDesc: "验证输入框在不同文案长度下的显示与输入行为。",
    inputPlaceholder: "请输入组件测试标题",
    searchPlaceholder: "请输入关键字",
    lengthLabel: "当前输入长度：",
    footerHint: "提示：按 d 可快速切换明暗主题。",
  },
  "en-US": {
    pageTitle: "Component Test Lab",
    pageDesc:
      "Components must be selected from @workspace/ui-components and validated here. Do not implement product components in app packages.",
    controlsTitle: "Test Controls",
    controlsDesc: "Switch language and theme to verify behavior consistency.",
    languageLabel: "Language",
    themeLabel: "Theme",
    basicTitle: "Button Component",
    basicDesc: "Verify primary, secondary, subtle, and disabled states.",
    buttonPrimary: "Primary",
    buttonSecondary: "Secondary",
    buttonSubtle: "Subtle",
    buttonDefault: "Default",
    buttonGhost: "Ghost",
    buttonLink: "Link",
    buttonDisabled: "Disabled",
    inputTitle: "Input Component",
    inputDesc: "Verify input behavior across different text lengths.",
    inputPlaceholder: "Type a component test title",
    searchPlaceholder: "Type keywords",
    lengthLabel: "Current input length: ",
    footerHint: "Tip: press d to quickly toggle dark/light mode.",
  },
}

export function App() {
  const { theme, setTheme } = useTheme()
  const [locale, setLocale] = useState<Locale>("zh-CN")
  const [value, setValue] = useState("")
  const t = copy[locale]

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-6 p-6" lang={locale}>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{t.pageTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.pageDesc}</p>
      </header>

      <section className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-muted-foreground">{t.languageLabel}</span>
          <Select value={locale} onValueChange={(next) => setLocale(next as Locale)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zh-CN">中文</SelectItem>
              <SelectItem value="en-US">English</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-muted-foreground">{t.themeLabel}</span>
          <Select
            value={theme}
            onValueChange={(next) => setTheme(next as "light" | "dark" | "system")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{locale === "zh-CN" ? "浅色" : "Light"}</SelectItem>
              <SelectItem value="dark">{locale === "zh-CN" ? "深色" : "Dark"}</SelectItem>
              <SelectItem value="system">{locale === "zh-CN" ? "跟随系统" : "System"}</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">{t.basicTitle}</h2>
        <p className="text-sm text-muted-foreground">{t.basicDesc}</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">{t.buttonPrimary}</Button>
          <Button variant="secondary">{t.buttonSecondary}</Button>
          <Button variant="outline">
            {t.buttonSubtle}
          </Button>
          <Button>{t.buttonDefault}</Button>
          <Button variant="ghost">{t.buttonGhost}</Button>
          <Button variant="link">{t.buttonLink}</Button>
          <Button variant="primary" disabled>
            {t.buttonDisabled}
          </Button>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">{t.inputTitle}</h2>
        <p className="text-sm text-muted-foreground">{t.inputDesc}</p>
        <div className="grid gap-3">
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t.inputPlaceholder}
          />
          <Input placeholder={t.searchPlaceholder} />
          <p className="text-xs text-muted-foreground">
            {t.lengthLabel}
            {value.length}
          </p>
        </div>
      </section>

      <footer className="text-xs text-muted-foreground">{t.footerHint}</footer>
    </main>
  )
}
