import { Link, useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { registerApi } from "@/api"
import { createRegisterSchema } from "@/forms/authSchemas"

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const registerSchema = useMemo(() => createRegisterSchema(t), [t])
  type RegisterFormValues = z.infer<typeof registerSchema>
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleRegister = handleSubmit(async (values) => {
    const payload = {
      username: values.username.trim(),
      password: values.password,
      display_name: values.displayName.trim() || undefined,
      email: values.email.trim() || undefined,
    }
    try {
      await registerApi(payload)
      navigate("/login", { replace: true })
    } catch (err) {
      console.error("Register failed:", err)
    }
  })

  return (
    <div className="ui-auth-shell">
      <section className="ui-auth-aside">
        <div>
          <p className="ui-auth-aside-brand">{t("register.brand")}</p>
          <h1 className="ui-auth-aside-title">
            {t("register.hero.titleLine1")}
            <br />
            {t("register.hero.titleLine2")}
          </h1>
        </div>
        <div className="ui-auth-aside-desc">
          <p>{t("register.hero.desc1")}</p>
          <p>{t("register.hero.desc2")}</p>
        </div>
        <div className="ui-auth-aside-decoration" />
      </section>

      <section className="ui-auth-content">
        <div className="ui-auth-content-header">
          <p className="ui-auth-content-kicker">{t("register.welcome")}</p>
          <h2 className="ui-auth-content-title">{t("register.title")}</h2>
          <p className="ui-auth-content-subtitle">{t("register.subtitle")}</p>
        </div>

        <form onSubmit={handleRegister} className="ui-form">
          <label className="ui-field">
            <span className="ui-field-label">
              {t("register.form.username.label")}
            </span>
            <input
              type="text"
              placeholder={t("register.form.username.placeholder")}
              {...register("username")}
              className="ui-input"
            />
            {errors.username && (
              <p className="ui-error-text">{errors.username.message}</p>
            )}
          </label>

          <label className="ui-field">
            <span className="ui-field-label">
              {t("register.form.displayName.label")}
            </span>
            <input
              type="text"
              placeholder={t("register.form.displayName.placeholder")}
              {...register("displayName")}
              className="ui-input"
            />
            {errors.displayName && (
              <p className="ui-error-text">{errors.displayName.message}</p>
            )}
          </label>

          <label className="ui-field">
            <span className="ui-field-label">
              {t("register.form.email.label")}
            </span>
            <input
              type="email"
              placeholder={t("register.form.email.placeholder")}
              {...register("email")}
              className="ui-input"
            />
            {errors.email && (
              <p className="ui-error-text">{errors.email.message}</p>
            )}
          </label>

          <label className="ui-field">
            <span className="ui-field-label">
              {t("register.form.password.label")}
            </span>
            <input
              type="password"
              placeholder={t("register.form.password.placeholder")}
              {...register("password")}
              className="ui-input"
            />
            {errors.password && (
              <p className="ui-error-text">{errors.password.message}</p>
            )}
          </label>

          <label className="ui-field">
            <span className="ui-field-label">
              {t("register.form.confirmPassword.label")}
            </span>
            <input
              type="password"
              placeholder={t("register.form.confirmPassword.placeholder")}
              {...register("confirmPassword")}
              className="ui-input"
            />
            {errors.confirmPassword && (
              <p className="ui-error-text">{errors.confirmPassword.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ui-btn-primary"
          >
            {isSubmitting
              ? t("register.form.submitting")
              : t("register.form.submit")}
          </button>
        </form>

        <p className="ui-auth-footer">
          {t("register.footer.toLoginPrefix")}{" "}
          <Link to="/login" className="ui-link-primary">
            {t("register.footer.toLoginAction")}
          </Link>
        </p>
      </section>
    </div>
  )
}
