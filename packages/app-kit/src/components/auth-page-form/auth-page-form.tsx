import type { FormEventHandler, ReactNode } from "react"
import { Link } from "react-router"
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import { Button } from "@workspace/ui-components/stable/button"
import { Card } from "@workspace/ui-components/stable/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  RequiredFieldLabel,
} from "@workspace/ui-components/stable/field"
import { Input, type InputType } from "@workspace/ui-components/stable/input"
import { authPageFormClassNames } from "./auth-page-form.styles"

export interface AuthPageFormLabels {
  brand: string
  heroTitleLine1: string
  heroTitleLine2: string
  heroDescriptions: string[]
  welcome: string
  title: string
  subtitle: string
  submit: string
  submitting: string
}

export interface AuthPageFormField<TFieldValues extends FieldValues> {
  id: string
  name: Path<TFieldValues>
  label: ReactNode
  placeholder?: string
  type?: InputType
  required?: boolean
  error?: ReactNode
}

export interface AuthPageFormFooterLink {
  prefix: string
  to: string
  label: ReactNode
}

export interface AuthPageFormNotice {
  title: string
  description: string
}

export interface AuthPageFormProps<TFieldValues extends FieldValues> {
  labels: AuthPageFormLabels
  control: Control<TFieldValues>
  fields: AuthPageFormField<TFieldValues>[]
  footerLink?: AuthPageFormFooterLink
  notice?: AuthPageFormNotice
  isSubmitting: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function AuthPageForm<TFieldValues extends FieldValues>({
  labels,
  control,
  fields,
  footerLink,
  notice,
  isSubmitting,
  onSubmit,
}: AuthPageFormProps<TFieldValues>) {
  return (
    <div className={authPageFormClassNames.shell}>
      <Card>
        <div className={authPageFormClassNames.panel}>
          <section className={authPageFormClassNames.aside}>
            <div>
              <p className={authPageFormClassNames.brand}>{labels.brand}</p>
              <h1 className={authPageFormClassNames.heroTitle}>
                {labels.heroTitleLine1}
                <br />
                {labels.heroTitleLine2}
              </h1>
            </div>
            <div className={authPageFormClassNames.heroDescriptions}>
              {labels.heroDescriptions.map((description) => (
                <p key={description}>{description}</p>
              ))}
            </div>
          </section>

          <section className={authPageFormClassNames.content}>
            <div className={authPageFormClassNames.header}>
              <p className={authPageFormClassNames.welcome}>{labels.welcome}</p>
              <h2 className={authPageFormClassNames.title}>{labels.title}</h2>
              <p className={authPageFormClassNames.subtitle}>
                {labels.subtitle}
              </p>
            </div>

            {notice ? (
              <div className={authPageFormClassNames.notice}>
                <p className={authPageFormClassNames.noticeTitle}>
                  {notice.title}
                </p>
                <p className={authPageFormClassNames.noticeDescription}>
                  {notice.description}
                </p>
              </div>
            ) : null}

            <form onSubmit={onSubmit} className={authPageFormClassNames.form}>
              <FieldGroup>
                {fields.map((field) => (
                  <Field key={field.id}>
                    {field.required ? (
                      <RequiredFieldLabel>{field.label}</RequiredFieldLabel>
                    ) : (
                      <FieldLabel>{field.label}</FieldLabel>
                    )}
                    <Controller
                      control={control}
                      name={field.name}
                      render={({ field: formField }) => (
                        <Input
                          value={String(formField.value ?? "")}
                          onValueChange={formField.onChange}
                          type={field.type}
                          placeholder={field.placeholder}
                        />
                      )}
                    />
                    <FieldError>{field.error}</FieldError>
                  </Field>
                ))}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? labels.submitting : labels.submit}
                </Button>
              </FieldGroup>
            </form>

            {footerLink ? (
              <p className={authPageFormClassNames.footer}>
                {footerLink.prefix}{" "}
                <Link to={footerLink.to} className={authPageFormClassNames.link}>
                  {footerLink.label}
                </Link>
              </p>
            ) : null}
          </section>
        </div>
      </Card>
    </div>
  )
}
