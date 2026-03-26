import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { meApi, loginApi } from "@/api"
import { createLoginSchema } from "@/forms/authSchemas"
import { loginSuccess } from "@/store/authSlice"
import { AppLink } from "@atlas-art/ui-react/adapters/react-router"
import { Button } from "@workspace/ui-core/components/button"
import { Input } from "@workspace/ui-core/components/input"
import {
  FormField,
  FormFieldLabel,
  SplitCard,
  SplitCardAside,
  SplitCardMain,
  Stack,
  Text,
} from "@atlas-art/ui-react"

export default function LoginPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loginSchema = useMemo(() => createLoginSchema(t), [t])
  type LoginFormValues = z.infer<typeof loginSchema>
  const {
    register,
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
    <SplitCard>
      <SplitCardAside>
        <Stack gap="xl">
          <Stack gap="sm">
            <Text variant="brand">{t("login.brand")}</Text>
            <Text as="h1" variant="lead">
              {t("login.hero.titleLine1")}
              <br />
              {t("login.hero.titleLine2")}
            </Text>
          </Stack>
          <Stack gap="sm">
            <Text variant="muted">{t("login.hero.desc1")}</Text>
            <Text variant="muted">{t("login.hero.desc2")}</Text>
          </Stack>
        </Stack>
      </SplitCardAside>

      <SplitCardMain>
        <Stack gap="xl">
          <Stack gap="sm">
            <Text variant="kicker">{t("login.welcome")}</Text>
            <Text as="h2" variant="title">
              {t("login.title")}
            </Text>
            <Text variant="muted">{t("login.subtitle")}</Text>
          </Stack>

          <form onSubmit={handleLogin}>
            <Stack gap="lg">
              <FormField error={errors.identifier?.message}>
                <FormFieldLabel htmlFor="login-identifier">
                  {t("login.form.identifier.label")}
                </FormFieldLabel>
                <Input
                  id="login-identifier"
                  type="text"
                  placeholder={t("login.form.identifier.placeholder")}
                  aria-invalid={Boolean(errors.identifier)}
                  {...register("identifier")}
                />
              </FormField>

              <FormField error={errors.password?.message}>
                <FormFieldLabel htmlFor="login-password">
                  {t("login.form.password.label")}
                </FormFieldLabel>
                <Input
                  id="login-password"
                  type="password"
                  placeholder={t("login.form.password.placeholder")}
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />
              </FormField>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("login.form.submitting")
                  : t("login.form.submit")}
              </Button>
            </Stack>
          </form>

          <Text variant="muted">
            {t("login.footer.toRegisterPrefix")}{" "}
            <AppLink to="/register" variant="primary">
              {t("login.footer.toRegisterAction")}
            </AppLink>
          </Text>

          <Text variant="muted">
            {t("login.footer.toGuidePrefix")}{" "}
            <AppLink to="/guide" variant="primary">
              {t("login.footer.toGuideAction")}
            </AppLink>
          </Text>
        </Stack>
      </SplitCardMain>
    </SplitCard>
  )
}
