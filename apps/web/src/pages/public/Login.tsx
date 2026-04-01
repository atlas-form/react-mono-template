import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router"
import { useTranslation } from "react-i18next"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { meApi, loginApi } from "@/api"
import { createLoginSchema } from "@/forms/authSchemas"
import { loginSuccess } from "@/store/authSlice"
import { AppLink } from "@atlas-art/ui-react/adapters/react-router"
import { Button } from "@workspace/ui-components/button"
import { Input } from "@workspace/ui-components/input"
import { Select } from "@workspace/ui-components/select"
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
            <Select
              value={selectDemoValue}
              onValueChange={setSelectDemoValue}
              list={[
                { value: "option-1", label: "选项一" },
                { value: "option-2", label: "选项二" },
                { value: "option-3", label: "选项三" },
              ]}
            />
          </Stack>

          <form onSubmit={handleLogin}>
            <Stack gap="lg">
              <FormField error={errors.identifier?.message}>
                <FormFieldLabel htmlFor="login-identifier">
                  {t("login.form.identifier.label")}
                </FormFieldLabel>
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
              </FormField>

              <FormField error={errors.password?.message}>
                <FormFieldLabel htmlFor="login-password">
                  {t("login.form.password.label")}
                </FormFieldLabel>
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
              </FormField>

              <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
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
