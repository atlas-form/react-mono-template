import { useMemo } from "react"
import { useForm } from "react-hook-form"
import type {
  DefaultValues,
  FieldErrors,
  FieldValues,
  Path,
  Resolver,
  SubmitHandler,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import {
  AuthPageForm,
  type AuthPageFormFooterLink,
  type AuthPageFormLabels,
  type AuthPageFormNotice,
} from "../../components/auth-page-form"
import type { InputType } from "@workspace/ui-components/stable/input"

type Translate = (key: string, options?: Record<string, unknown>) => string

export type AuthViewLabels = AuthPageFormLabels
export type AuthFooterLink = AuthPageFormFooterLink
export type AuthNotice = AuthPageFormNotice

export interface AuthViewField<TFieldValues extends FieldValues> {
  id: string
  name: Path<TFieldValues>
  label: string
  placeholder?: string
  type?: InputType
  required?: boolean
}

export interface AuthViewProps<TFieldValues extends FieldValues> {
  labels: AuthViewLabels
  createSchema: (t: Translate) => z.ZodType<TFieldValues, TFieldValues>
  defaultValues: DefaultValues<TFieldValues>
  fields: AuthViewField<TFieldValues>[]
  footerLink?: AuthFooterLink
  notice?: AuthNotice
  onSubmit: (values: TFieldValues) => void | Promise<void>
}

function getFieldError<TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
  name: Path<TFieldValues>
) {
  const fieldError = (errors as Record<string, { message?: unknown }>)[name]

  return typeof fieldError?.message === "string" ? fieldError.message : undefined
}

export function AuthView<TFieldValues extends FieldValues>({
  labels,
  createSchema,
  defaultValues,
  fields,
  footerLink,
  notice,
  onSubmit,
}: AuthViewProps<TFieldValues>) {
  const { t } = useTranslation(["common", "errors"])
  const schema = useMemo(() => createSchema(t), [createSchema, t])
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFieldValues>({
    resolver: zodResolver(schema) as Resolver<TFieldValues>,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  })

  return (
    <AuthPageForm
      labels={labels}
      control={control}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit as SubmitHandler<TFieldValues>)}
      fields={fields.map((field) => ({
        ...field,
        error: getFieldError(errors, field.name),
      }))}
      footerLink={footerLink}
      notice={notice}
    />
  )
}
