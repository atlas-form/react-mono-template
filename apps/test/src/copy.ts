export type Locale = "zh-CN" | "en-US"

export type Copy = {
  pageTitle: string
  pageDesc: string
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

export const copy: Record<Locale, Copy> = {
  "zh-CN": {
    pageTitle: "组件测试台",
    pageDesc: "组件必须从 @workspace/ui-components 选择并验证，不允许在 app 里私写产品组件。",
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
