import enError from "../lang/en/error"
import enTranslation from "../lang/en/translation"
import zhCNError from "../lang/zhCN/error"
import zhCNTranslation from "../lang/zhCN/translation"

export type LocaleNamespace = "translation" | "error"

export type LocaleResources = {
  en: {
    translation: typeof enTranslation
    error: typeof enError
  }
  zhCN: {
    translation: typeof zhCNTranslation
    error: typeof zhCNError
  }
}

export const localeResources: LocaleResources = {
  en: {
    translation: enTranslation,
    error: enError,
  },
  zhCN: {
    translation: zhCNTranslation,
    error: zhCNError,
  },
}
