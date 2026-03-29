import type { ComponentProps } from "react"
import {
  Field as HeadlessField,
  FieldContent as HeadlessFieldContent,
  FieldDescription as HeadlessFieldDescription,
  FieldError as HeadlessFieldError,
  FieldGroup as HeadlessFieldGroup,
  FieldLabel as HeadlessFieldLabel,
  FieldLegend as HeadlessFieldLegend,
  FieldSeparator as HeadlessFieldSeparator,
  FieldSet as HeadlessFieldSet,
  FieldTitle as HeadlessFieldTitle,
} from "@workspace/ui-core/components/field"

export type FieldProps = ComponentProps<typeof HeadlessField>
export type FieldSetProps = ComponentProps<typeof HeadlessFieldSet>
export type FieldLegendProps = ComponentProps<typeof HeadlessFieldLegend>
export type FieldGroupProps = ComponentProps<typeof HeadlessFieldGroup>
export type FieldContentProps = ComponentProps<typeof HeadlessFieldContent>
export type FieldLabelProps = ComponentProps<typeof HeadlessFieldLabel>
export type FieldTitleProps = ComponentProps<typeof HeadlessFieldTitle>
export type FieldDescriptionProps = ComponentProps<typeof HeadlessFieldDescription>
export type FieldSeparatorProps = ComponentProps<typeof HeadlessFieldSeparator>
export type FieldErrorProps = ComponentProps<typeof HeadlessFieldError>

export function Field(props: FieldProps) {
  return <HeadlessField {...props} />
}

export function FieldSet(props: FieldSetProps) {
  return <HeadlessFieldSet {...props} />
}

export function FieldLegend(props: FieldLegendProps) {
  return <HeadlessFieldLegend {...props} />
}

export function FieldGroup(props: FieldGroupProps) {
  return <HeadlessFieldGroup {...props} />
}

export function FieldContent(props: FieldContentProps) {
  return <HeadlessFieldContent {...props} />
}

export function FieldLabel(props: FieldLabelProps) {
  return <HeadlessFieldLabel {...props} />
}

export function FieldTitle(props: FieldTitleProps) {
  return <HeadlessFieldTitle {...props} />
}

export function FieldDescription(props: FieldDescriptionProps) {
  return <HeadlessFieldDescription {...props} />
}

export function FieldSeparator(props: FieldSeparatorProps) {
  return <HeadlessFieldSeparator {...props} />
}

export function FieldError(props: FieldErrorProps) {
  return <HeadlessFieldError {...props} />
}
