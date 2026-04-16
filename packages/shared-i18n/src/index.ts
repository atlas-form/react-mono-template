export type SupportedLanguage = "en" | "zhCN"

export function normalizeLanguage(
  language: string | undefined
): SupportedLanguage {
  const normalized = language?.toLowerCase()

  if (normalized === "zhcn" || normalized === "zh-cn" || normalized === "zh") {
    return "zhCN"
  }

  return "en"
}
