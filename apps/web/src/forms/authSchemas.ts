import { z } from "zod";
import type { TFunction } from "i18next";

export function createLoginSchema(t: TFunction) {
  return z.object({
    identifier: z.string().trim().min(1, t("common.validation.required")),
    password: z.string().trim().min(1, t("common.validation.required")),
  });
}

export function createRegisterSchema(t: TFunction) {
  const emailValidator = z.email();

  return z
    .object({
      username: z.string().trim().min(1, t("common.validation.required")),
      displayName: z.string(),
      email: z
        .string()
        .trim()
        .refine(
          (value) => value === "" || emailValidator.safeParse(value).success,
          {
            message: t("common.validation.emailInvalid"),
          },
        ),
      password: z.string().trim().min(1, t("common.validation.required")),
      confirmPassword: z
        .string()
        .trim()
        .min(1, t("common.validation.required")),
    })
    .refine((value) => value.password === value.confirmPassword, {
      path: ["confirmPassword"],
      message: t("register.error.passwordMismatch"),
    });
}
