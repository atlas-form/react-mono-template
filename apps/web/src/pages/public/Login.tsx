import { useDispatch } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router"
import { useTranslation } from "react-i18next"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { meApi, loginApi } from "@/api"
import { createLoginSchema } from "@/forms/authSchemas"
import { loginSuccess } from "@/store/authSlice"
import { Button } from "@workspace/ui-components/button"
import { Input } from "@workspace/ui-components/input"
import { Select } from "@workspace/ui-components/select"

export default function LoginPage() {
  const { t } = useTranslation()
  const [selectDemoValue, setSelectDemoValue] = useState("option-1")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loginSchema = useMemo(() => createLoginSchema(t), [t])
  type LoginFormValues = z.infer<typeof loginSchema>
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const from = location.state?.from?.pathname ?? "/"

  const handleLogin = handleSubmit(async (values) => {
    try {
      const res = await loginApi(values)
      const token = res.accessToken
      const refreshToken = res.refreshToken

      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      const user = await meApi()

      dispatch(loginSuccess({ token, user }))

      navigate(from, { replace: true })
    } catch (err) {
      console.error("Login failed:", err)
    }
  })

  return (
    <div className="ui-auth-shell">
      <section className="ui-auth-aside">
        <div className="space-y-10">
          <div>
            <p className="ui-auth-aside-brand">{t("login.brand")}</p>
            <h1 className="ui-auth-aside-title">
              {t("login.hero.titleLine1")}
              <br />
              {t("login.hero.titleLine2")}
            </h1>
          </div>
          <div className="ui-auth-aside-desc">
            <p>{t("login.hero.desc1")}</p>
            <p>{t("login.hero.desc2")}</p>
          </div>
        </div>
        <div className="ui-auth-aside-decoration" />
      </section>

      <section className="ui-auth-content">
        <div className="space-y-8">
          <div className="ui-auth-content-header">
            <p className="ui-auth-content-kicker">{t("login.welcome")}</p>
            <h2 className="ui-auth-content-title">
              {t("login.title")}
            </h2>
            <p className="ui-auth-content-subtitle">{t("login.subtitle")}</p>
            <Select
              value={selectDemoValue}
              onValueChange={setSelectDemoValue}
              list={[
                { value: "option-1", label: "选项一" },
                { value: "option-2", label: "选项二" },
                { value: "option-3", label: "选项三" },
              ]}
            />
          </div>

          <form onSubmit={handleLogin}>
            <div className="ui-form">
              <label className="ui-field">
                <span className="ui-field-label">
                  {t("login.form.identifier.label")}
                </span>
                <Controller
                  control={control}
                  name="identifier"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onValueChange={field.onChange}
                      type="text"
                      placeholder={t("login.form.identifier.placeholder")}
                    />
                  )}
                />
                {errors.identifier && (
                  <p className="ui-error-text">{errors.identifier.message}</p>
                )}
              </label>

              <label className="ui-field">
                <span className="ui-field-label">
                  {t("login.form.password.label")}
                </span>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onValueChange={field.onChange}
                      type="password"
                      placeholder={t("login.form.password.placeholder")}
                    />
                  )}
                />
                {errors.password && (
                  <p className="ui-error-text">{errors.password.message}</p>
                )}
              </label>

              <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
                {isSubmitting
                  ? t("login.form.submitting")
                  : t("login.form.submit")}
              </Button>
            </div>
          </form>

          <p className="ui-auth-footer">
            {t("login.footer.toRegisterPrefix")}{" "}
            <Link to="/register" className="ui-link-primary">
              {t("login.footer.toRegisterAction")}
            </Link>
          </p>

          <p className="ui-auth-footer">
            {t("login.footer.toGuidePrefix")}{" "}
            <Link to="/guide" className="ui-link-primary">
              {t("login.footer.toGuideAction")}
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
