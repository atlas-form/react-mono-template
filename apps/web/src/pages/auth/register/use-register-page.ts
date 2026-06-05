import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import type {
  AuthRegisterFooterLink,
  AuthRegisterSubmitValues,
} from "@workspace/app-kit/register"
import { registerAuthAccount } from "./register-data"
import { createRegisterLabels } from "./register-labels"

const loginPath = "/login"

export function useRegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleRegister = async (values: AuthRegisterSubmitValues) => {
    try {
      await registerAuthAccount(values)
      navigate(loginPath, { replace: true })
    } catch (err) {
      console.error("Register failed:", err)
    }
  }

  const footerLink: AuthRegisterFooterLink = {
    prefix: t("register.footer.toLoginPrefix"),
    to: loginPath,
    label: t("register.footer.toLoginAction"),
  }

  return {
    labels: createRegisterLabels(t),
    footerLink,
    onSubmit: handleRegister,
  }
}
