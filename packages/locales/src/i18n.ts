import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import {
  defaultLocaleNamespace,
  localeNamespaces,
  normalizeLanguage,
  supportedLanguages,
} from "./index"
import { localeResources } from "./resources"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: [...supportedLanguages],
    debug: false,
    ns: [...localeNamespaces],
    defaultNS: defaultLocaleNamespace,
    resources: localeResources,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      convertDetectedLanguage: (lng) => normalizeLanguage(lng),
    },
  })

export default i18n
