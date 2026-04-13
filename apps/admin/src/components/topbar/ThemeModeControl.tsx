import { useState } from "react"
import { Select } from "@workspace/ui-components/stable/select"
import {
  getStoredThemeMode,
  setThemeMode,
  type ThemeMode,
} from "@workspace/ui-theme"

export default function ThemeModeControl() {
  const [mode, setMode] = useState<ThemeMode>(getStoredThemeMode())

  return (
    <Select
      value={mode}
      onValueChange={(value) => {
        const next = value as ThemeMode
        setMode(next)
        setThemeMode(next)
      }}
      list={[
        { value: "system", label: "Theme: System" },
        { value: "light", label: "Theme: Light" },
        { value: "dark", label: "Theme: Dark" },
      ]}
    />
  )
}
