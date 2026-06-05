import { useLocation, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import {
  AuthView,
  createAuthLoginSchema,
  type AuthViewLabels,
} from "@workspace/app-kit/auth"
import {
  ensureCurrentAppUserPermissions,
  loginApi,
  meApi,
} from "@/api"
import { loginSuccess } from "@/store/authSlice"
import { setAccess } from "@/store/accessSlice"

function createLoginLabels(
  t: ReturnType<typeof useTranslation>["t"]
): AuthViewLabels {
  return {
    brand: t("login.brand"),
    heroTitleLine1: t("login.hero.titleLine1"),
    heroTitleLine2: t("login.hero.titleLine2"),
    heroDescriptions: [t("login.hero.desc1"), t("login.hero.desc2")],
    welcome: t("login.welcome"),
    title: t("login.title"),
    subtitle: t("login.subtitle"),
    submit: t("login.form.submit"),
    submitting: t("login.form.submitting"),
  }
}

export default function LoginPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? "/home"

  const handleLogin = async (values: { identifier: string; password: string }) => {
    try {
      const res = await loginApi(values)
      const token = res.accessToken
      const refreshToken = res.refreshToken

      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      const user = await meApi()
      const access = await ensureCurrentAppUserPermissions(user)

      dispatch(loginSuccess({ token, user }))
      dispatch(
        setAccess({
          roleCodes: access.roleCodes,
          permissionCodes: access.permissionCodes,
        })
      )

      navigate(from, { replace: true })
    } catch (err) {
      console.error("Login failed:", err)
    }
  }

  return (
    <AuthView
      labels={createLoginLabels(t)}
      createSchema={createAuthLoginSchema}
      defaultValues={{
        identifier: "",
        password: "",
      }}
      fields={[
        {
          id: "identifier",
          name: "identifier",
          label: t("login.form.identifier.label"),
          placeholder: t("login.form.identifier.placeholder"),
          type: "text",
          required: true,
        },
        {
          id: "password",
          name: "password",
          label: t("login.form.password.label"),
          placeholder: t("login.form.password.placeholder"),
          type: "password",
          required: true,
        },
      ]}
      footerLink={{
        prefix: t("login.footer.toRegisterPrefix"),
        to: "/register",
        label: t("login.footer.toRegisterAction"),
      }}
      onSubmit={handleLogin}
    />
  )
}
