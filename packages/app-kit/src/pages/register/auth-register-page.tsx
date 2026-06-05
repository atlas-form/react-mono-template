import { useMemo } from "react"
import { Link, useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { registerApi } from "@workspace/services/api/auth"
import { Button } from "@workspace/ui-components/stable/button"
import { Card } from "@workspace/ui-components/stable/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui-components/stable/field"
import { Input } from "@workspace/ui-components/stable/input"
import { createAuthRegisterSchema } from "./auth-register-schema"
import type { AuthRegisterPageProps } from "./types"

const authShellClassName =
  "relative mx-auto max-h-full w-full max-w-5xl overflow-hidden rounded-xl shadow-[var(--ui-shadow-soft)] [&>[data-slot=card]]:gap-0 [&>[data-slot=card]]:overflow-hidden [&>[data-slot=card]]:rounded-xl [&>[data-slot=card]]:bg-(--surface) [&>[data-slot=card]]:py-0 [&>[data-slot=card]]:ring-0"
const authPanelClassName =
  "grid max-h-full overflow-hidden rounded-xl bg-(--surface) sm:grid-cols-2"
const authAsideClassName =
  "relative hidden flex-col justify-between bg-[color-mix(in_oklab,var(--surface)_82%,var(--primary)_12%)] p-8 text-(--app-text) sm:flex"
const authContentClassName = "bg-(--surface) p-6 sm:p-8"
const authFooterClassName = "mt-4 text-sm text-(--app-muted-text)"
const authLinkClassName =
  "font-medium text-[var(--primary-outline,var(--primary))] underline-offset-4 transition hover:underline"

function RequiredFieldLabel({ children }: { children: string }) {
  return (
    <FieldLabel>
      {children}
      <span aria-hidden="true" className="ml-1 text-destructive">
        *
      </span>
    </FieldLabel>
  )
}

export function AuthRegisterPage({
  loginPath = "/login",
  onRegistered,
}: AuthRegisterPageProps) {
  const { t } = useTranslation(["pages", "common", "errors"])
  const navigate = useNavigate()
  const registerSchema = useMemo(() => createAuthRegisterSchema(t), [t])
  type RegisterFormValues = z.infer<typeof registerSchema>
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
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
      await onRegistered?.()
      navigate(loginPath, { replace: true })
    } catch (err) {
      console.error("Register failed:", err)
    }
  })

  return (
    <div className={authShellClassName}>
      <Card>
        <div className={authPanelClassName}>
          <section className={authAsideClassName}>
            <div>
              <p className="text-xs tracking-[0.22em] text-(--app-muted-text)">
                {t("authRegister.brand", { ns: "pages" })}
              </p>
              <h1 className="mt-4 text-3xl/tight font-semibold">
                {t("authRegister.hero.titleLine1", { ns: "pages" })}
                <br />
                {t("authRegister.hero.titleLine2", { ns: "pages" })}
              </h1>
            </div>
            <div className="space-y-3 text-sm text-(--app-muted-text)">
              <p>{t("authRegister.hero.desc1", { ns: "pages" })}</p>
              <p>{t("authRegister.hero.desc2", { ns: "pages" })}</p>
            </div>
          </section>

          <section className={authContentClassName}>
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.16em] text-(--app-muted-text)">
                {t("authRegister.welcome", { ns: "pages" })}
              </p>
              <h2 className="text-3xl font-semibold text-(--app-text)">
                {t("authRegister.title", { ns: "pages" })}
              </h2>
              <p className="text-sm text-(--app-muted-text)">
                {t("authRegister.subtitle", { ns: "pages" })}
              </p>
            </div>

            <form
              onSubmit={handleRegister}
              className="mt-6 [&_[data-slot=field-group]]:gap-3"
            >
              <FieldGroup>
                <Field>
                  <RequiredFieldLabel>
                    {t("authRegister.form.username.label", { ns: "pages" })}
                  </RequiredFieldLabel>
                  <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onValueChange={field.onChange}
                        type="text"
                        placeholder={t(
                          "authRegister.form.username.placeholder",
                          {
                            ns: "pages",
                          }
                        )}
                      />
                    )}
                  />
                  <FieldError>{errors.username?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>
                    {t("authRegister.form.displayName.label", { ns: "pages" })}
                  </FieldLabel>
                  <Controller
                    control={control}
                    name="displayName"
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onValueChange={field.onChange}
                        type="text"
                        placeholder={t(
                          "authRegister.form.displayName.placeholder",
                          {
                            ns: "pages",
                          }
                        )}
                      />
                    )}
                  />
                  <FieldError>{errors.displayName?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>
                    {t("authRegister.form.email.label", { ns: "pages" })}
                  </FieldLabel>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onValueChange={field.onChange}
                        type="email"
                        placeholder={t("authRegister.form.email.placeholder", {
                          ns: "pages",
                        })}
                      />
                    )}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>

                <Field>
                  <RequiredFieldLabel>
                    {t("authRegister.form.password.label", { ns: "pages" })}
                  </RequiredFieldLabel>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onValueChange={field.onChange}
                        type="password"
                        placeholder={t(
                          "authRegister.form.password.placeholder",
                          {
                            ns: "pages",
                          }
                        )}
                      />
                    )}
                  />
                  <FieldError>{errors.password?.message}</FieldError>
                </Field>

                <Field>
                  <RequiredFieldLabel>
                    {t("authRegister.form.confirmPassword.label", {
                      ns: "pages",
                    })}
                  </RequiredFieldLabel>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onValueChange={field.onChange}
                        type="password"
                        placeholder={t(
                          "authRegister.form.confirmPassword.placeholder",
                          { ns: "pages" }
                        )}
                      />
                    )}
                  />
                  <FieldError>{errors.confirmPassword?.message}</FieldError>
                </Field>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("authRegister.form.submitting", { ns: "pages" })
                    : t("authRegister.form.submit", { ns: "pages" })}
                </Button>
              </FieldGroup>
            </form>

            <p className={authFooterClassName}>
              {t("authRegister.footer.toLoginPrefix", { ns: "pages" })}{" "}
              <Link to={loginPath} className={authLinkClassName}>
                {t("authRegister.footer.toLoginAction", { ns: "pages" })}
              </Link>
            </p>
          </section>
        </div>
      </Card>
    </div>
  )
}
