export type ThemeMode = "system" | "light" | "dark"
export type ThemePalette = "github" | "antd"

const THEME_STORAGE_KEY = "app_theme"
const THEME_PALETTE_STORAGE_KEY = "app_theme_palette"

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function resolveTheme(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? getSystemTheme() : mode
}

function isThemePalette(value: string | null): value is ThemePalette {
  return value === "github" || value === "antd"
}

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system"
  const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (raw === "light" || raw === "dark" || raw === "system") return raw
  return "system"
}

export function getStoredThemePalette(): ThemePalette {
  if (typeof window === "undefined") return "github"
  const raw = window.localStorage.getItem(THEME_PALETTE_STORAGE_KEY)
  return isThemePalette(raw) ? raw : "github"
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof document === "undefined") return
  const root = document.documentElement
  const resolved = resolveTheme(mode)

  root.setAttribute("data-theme", resolved)
  root.setAttribute("data-theme-mode", mode)
}

export function applyThemePalette(palette: ThemePalette): void {
  if (typeof document === "undefined") return
  const root = document.documentElement
  root.setAttribute("data-theme-palette", palette)
}

export function setThemeMode(mode: ThemeMode): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  }
  applyTheme(mode)
}

export function setThemePalette(palette: ThemePalette): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_PALETTE_STORAGE_KEY, palette)
  }
  applyThemePalette(palette)
}

export function initTheme(): () => void {
  if (typeof window === "undefined") return () => {}

  const media = window.matchMedia("(prefers-color-scheme: dark)")

  const onSystemThemeChange = () => {
    if (getStoredThemeMode() === "system") {
      applyTheme("system")
    }
  }

  applyTheme(getStoredThemeMode())
  applyThemePalette(getStoredThemePalette())
  media.addEventListener("change", onSystemThemeChange)

  return () => {
    media.removeEventListener("change", onSystemThemeChange)
  }
}
