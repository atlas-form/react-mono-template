import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import {
  createAuthRegisterSchema,
  type AuthFooterLink,
  type AuthViewField,
} from "@workspace/app-kit/auth"
import { registerAuthAccount } from "./register-data"
import { createRegisterLabels } from "./register-labels"
import type { RegisterFormValues } from "./types"

const loginPath = "/login"

export function useRegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await registerAuthAccount(values)
      navigate(loginPath, { replace: true })
    } catch (err) {
      console.error("Register failed:", err)
    }
  }

  const footerLink: AuthFooterLink = {
    prefix: t("register.footer.toLoginPrefix"),
    to: loginPath,
    label: t("register.footer.toLoginAction"),
  }

  const fields: AuthViewField<RegisterFormValues>[] = [
    {
      id: "username",
      name: "username",
      label: t("register.form.username.label"),
      placeholder: t("register.form.username.placeholder"),
      type: "text",
      required: true,
    },
    {
      id: "displayName",
      name: "displayName",
      label: t("register.form.displayName.label"),
      placeholder: t("register.form.displayName.placeholder"),
      type: "text",
    },
    {
      id: "email",
      name: "email",
      label: t("register.form.email.label"),
      placeholder: t("register.form.email.placeholder"),
      type: "email",
    },
    {
      id: "password",
      name: "password",
      label: t("register.form.password.label"),
      placeholder: t("register.form.password.placeholder"),
      type: "password",
      required: true,
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      label: t("register.form.confirmPassword.label"),
      placeholder: t("register.form.confirmPassword.placeholder"),
      type: "password",
      required: true,
    },
  ]

  return {
    labels: createRegisterLabels(t),
    createSchema: createAuthRegisterSchema,
    defaultValues: {
      username: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    fields,
    footerLink,
    onSubmit: handleRegister,
  }
}
