import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  AuthPageForm,
  type AuthPageFormFooterLink,
  type AuthPageFormLabels,
  type AuthPageFormNotice,
} from "../../components/auth-page-form"
import { createAuthLoginSchema } from "./auth-login-schema"

export interface AuthLoginSubmitValues {
  identifier: string
  password: string
}

export interface AuthLoginViewLabels extends AuthPageFormLabels {
  identifierLabel: string
  identifierPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
}

export interface AuthLoginFooterLink extends AuthPageFormFooterLink {
  prefix: string
  to: string
}

export type AuthLoginNotice = AuthPageFormNotice

export interface AuthLoginViewProps {
  labels: AuthLoginViewLabels
  footerLink?: AuthLoginFooterLink
  notice?: AuthLoginNotice
  onSubmit: (values: AuthLoginSubmitValues) => void | Promise<void>
}

export function AuthLoginView({
  labels,
  footerLink,
  notice,
  onSubmit,
}: AuthLoginViewProps) {
  const { t } = useTranslation(["common"])
  const loginSchema = useMemo(() => createAuthLoginSchema(t), [t])
  type LoginFormValues = z.infer<typeof loginSchema>
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const handleLogin = handleSubmit(onSubmit)

  return (
    <AuthPageForm
      labels={labels}
      control={control}
      notice={notice}
      footerLink={footerLink}
      isSubmitting={isSubmitting}
      onSubmit={handleLogin}
      fields={[
        {
          id: "identifier",
          name: "identifier",
          label: labels.identifierLabel,
          placeholder: labels.identifierPlaceholder,
          type: "text",
          required: true,
          error: errors.identifier?.message,
        },
        {
          id: "password",
          name: "password",
          label: labels.passwordLabel,
          placeholder: labels.passwordPlaceholder,
          type: "password",
          required: true,
          error: errors.password?.message,
        },
      ]}
    />
  )
}
