import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  AuthPageForm,
  type AuthPageFormFooterLink,
  type AuthPageFormLabels,
} from "../../components/auth-page-form"
import { createAuthRegisterSchema } from "./auth-register-schema"

export interface AuthRegisterSubmitValues {
  username: string
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthRegisterViewLabels extends AuthPageFormLabels {
  usernameLabel: string
  usernamePlaceholder: string
  displayNameLabel: string
  displayNamePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  confirmPasswordLabel: string
  confirmPasswordPlaceholder: string
}

export type AuthRegisterFooterLink = AuthPageFormFooterLink

export interface AuthRegisterViewProps {
  labels: AuthRegisterViewLabels
  footerLink: AuthRegisterFooterLink
  onSubmit: (values: AuthRegisterSubmitValues) => void | Promise<void>
}

export function AuthRegisterView({
  labels,
  footerLink,
  onSubmit,
}: AuthRegisterViewProps) {
  const { t } = useTranslation(["common", "errors"])
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

  return (
    <AuthPageForm
      labels={labels}
      control={control}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      fields={[
        {
          id: "username",
          name: "username",
          label: labels.usernameLabel,
          placeholder: labels.usernamePlaceholder,
          type: "text",
          required: true,
          error: errors.username?.message,
        },
        {
          id: "displayName",
          name: "displayName",
          label: labels.displayNameLabel,
          placeholder: labels.displayNamePlaceholder,
          type: "text",
          error: errors.displayName?.message,
        },
        {
          id: "email",
          name: "email",
          label: labels.emailLabel,
          placeholder: labels.emailPlaceholder,
          type: "email",
          error: errors.email?.message,
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
        {
          id: "confirmPassword",
          name: "confirmPassword",
          label: labels.confirmPasswordLabel,
          placeholder: labels.confirmPasswordPlaceholder,
          type: "password",
          required: true,
          error: errors.confirmPassword?.message,
        },
      ]}
      footerLink={footerLink}
    />
  )
}
