import enComponents from "../lang/en/components"
import enErrors from "../lang/en/errors"
import enMessages from "../lang/en/messages"
import zhCNComponents from "../lang/zhCN/components"
import zhCNErrors from "../lang/zhCN/errors"
import zhCNMessages from "../lang/zhCN/messages"

export type LocaleNamespace = "messages" | "components" | "errors"

export type LocaleResources = {
  en: {
    messages: typeof enMessages
    components: typeof enComponents
    errors: typeof enErrors
  }
  zhCN: {
    messages: typeof zhCNMessages
    components: typeof zhCNComponents
    errors: typeof zhCNErrors
  }
}

export const localeResources: LocaleResources = {
  en: {
    messages: enMessages,
    components: enComponents,
    errors: enErrors,
  },
  zhCN: {
    messages: zhCNMessages,
    components: zhCNComponents,
    errors: zhCNErrors,
  },
}
