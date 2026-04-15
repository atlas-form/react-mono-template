export interface YearRange {
  from: number
  to: number
}

export type PickerLanguage = "en" | "zhCN"

export function getDefaultYearRange(): YearRange {
  const currentYear = new Date().getFullYear()

  return {
    from: currentYear - 10,
    to: currentYear + 10,
  }
}

export function normalizeLanguage(language: string | undefined): PickerLanguage {
  const normalized = language?.toLowerCase()

  if (normalized === "zhcn" || normalized === "zh-cn" || normalized === "zh") {
    return "zhCN"
  }

  return "en"
}

export function pad(value: number) {
  return String(value).padStart(2, "0")
}
