import { useLocation, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import {
  AuthView,
  createAuthLoginSchema,
  type AuthViewLabels,
} from "@workspace/app-kit/auth"
import { getCurrentUserPermissionsApi, loginApi, meApi } from "@/api"
import { setAccess } from "@/store/accessSlice"
import { loginSuccess } from "@/store/authSlice"

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
  const from = location.state?.from?.pathname ?? "/"

  const handleLogin = async (values: { identifier: string; password: string }) => {
    try {
      const res = await loginApi(values)
      const token = res.accessToken
      const refreshToken = res.refreshToken

      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      const [user, access] = await Promise.all([
        meApi(),
        getCurrentUserPermissionsApi(),
      ])

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
      notice={{
        title: t("login.notice.title"),
        description: t("login.notice.description"),
      }}
      onSubmit={handleLogin}
    />
  )
}
