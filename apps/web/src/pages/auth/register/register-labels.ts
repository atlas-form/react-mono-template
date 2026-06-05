import type { useTranslation } from "react-i18next"
import type { AuthRegisterViewLabels } from "@workspace/app-kit/register"

export function createRegisterLabels(
  t: ReturnType<typeof useTranslation>["t"]
): AuthRegisterViewLabels {
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
    usernameLabel: t("register.form.username.label"),
    usernamePlaceholder: t("register.form.username.placeholder"),
    displayNameLabel: t("register.form.displayName.label"),
    displayNamePlaceholder: t("register.form.displayName.placeholder"),
    emailLabel: t("register.form.email.label"),
    emailPlaceholder: t("register.form.email.placeholder"),
    passwordLabel: t("register.form.password.label"),
    passwordPlaceholder: t("register.form.password.placeholder"),
    confirmPasswordLabel: t("register.form.confirmPassword.label"),
    confirmPasswordPlaceholder: t(
      "register.form.confirmPassword.placeholder"
    ),
    submit: t("register.form.submit"),
    submitting: t("register.form.submitting"),
  }
}
