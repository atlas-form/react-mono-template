import i18n from "../i18n"
import type { AppError } from "./app-error"

export function getAppErrorMessage(error: AppError): string {
  if (typeof error.code === "number") {
    const key = String(error.code)
    if (i18n.exists(key, { ns: "error" })) {
      return i18n.t(key, { ns: "error" })
    }
  }

  return i18n.t("default", { ns: "error" })
}
