import type { ComponentProps } from "react"
import {
  Field as CoreField,
  FieldContent as CoreFieldContent,
  FieldDescription as CoreFieldDescription,
  FieldError as CoreFieldError,
  FieldGroup as CoreFieldGroup,
  FieldLabel as CoreFieldLabel,
  FieldLegend as CoreFieldLegend,
  FieldSeparator as CoreFieldSeparator,
  FieldSet as CoreFieldSet,
  FieldTitle as CoreFieldTitle,
} from "@workspace/ui-core/components/field"

export type FieldProps = ComponentProps<typeof CoreField>
export type FieldSetProps = ComponentProps<typeof CoreFieldSet>
export type FieldLegendProps = ComponentProps<typeof CoreFieldLegend>
export type FieldGroupProps = ComponentProps<typeof CoreFieldGroup>
export type FieldContentProps = ComponentProps<typeof CoreFieldContent>
export type FieldLabelProps = ComponentProps<typeof CoreFieldLabel>
export type FieldTitleProps = ComponentProps<typeof CoreFieldTitle>
export type FieldDescriptionProps = ComponentProps<typeof CoreFieldDescription>
export type FieldSeparatorProps = ComponentProps<typeof CoreFieldSeparator>
export type FieldErrorProps = ComponentProps<typeof CoreFieldError>

export function Field(props: FieldProps) {
  return <CoreField {...props} />
}

export function FieldSet(props: FieldSetProps) {
  return <CoreFieldSet {...props} />
}

export function FieldLegend(props: FieldLegendProps) {
  return <CoreFieldLegend {...props} />
}

export function FieldGroup(props: FieldGroupProps) {
  return <CoreFieldGroup {...props} />
}

export function FieldContent(props: FieldContentProps) {
  return <CoreFieldContent {...props} />
}

export function FieldLabel(props: FieldLabelProps) {
  return <CoreFieldLabel {...props} />
}

export function FieldTitle(props: FieldTitleProps) {
  return <CoreFieldTitle {...props} />
}

export function FieldDescription(props: FieldDescriptionProps) {
  return <CoreFieldDescription {...props} />
}

export function FieldSeparator(props: FieldSeparatorProps) {
  return <CoreFieldSeparator {...props} />
}

export function FieldError(props: FieldErrorProps) {
  return <CoreFieldError {...props} />
}
