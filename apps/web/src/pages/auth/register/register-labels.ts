import type { useTranslation } from "react-i18next"
import type { AuthViewLabels } from "@workspace/app-kit/auth"

export function createRegisterLabels(
  t: ReturnType<typeof useTranslation>["t"]
): AuthViewLabels {
  return {
    brand: t("register.brand"),
    heroTitleLine1: t("register.hero.titleLine1"),
    heroTitleLine2: t("register.hero.titleLine2"),
    heroDescriptions: [
      t("register.hero.desc1"),
      t("register.hero.desc2"),
    ],
    welcome: t("register.welcome"),
    title: t("register.title"),
    subtitle: t("register.subtitle"),
    submit: t("register.form.submit"),
    submitting: t("register.form.submitting"),
  }
}
