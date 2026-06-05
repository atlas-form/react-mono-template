import { z } from "zod"

type Translate = (key: string, options?: Record<string, unknown>) => string

const usernamePattern = /^[A-Za-z0-9_-]+$/

export function createAuthRegisterSchema(t: Translate) {
  const emailValidator = z.email()

  return z
    .object({
      username: z
        .string()
        .trim()
        .min(1, t("validation.required", { ns: "common" }))
        .min(3, t("-10007", { ns: "errors" }))
        .max(32, t("-10007", { ns: "errors" }))
        .regex(usernamePattern, t("-10008", { ns: "errors" })),
      displayName: z
        .string()
        .trim()
        .max(64, t("-10009", { ns: "errors" })),
      email: z
        .string()
        .trim()
        .refine(
          (value) => value === "" || emailValidator.safeParse(value).success,
          {
            message: t("-10012", { ns: "errors" }),
          }
        ),
      password: z
        .string()
        .trim()
        .min(1, t("validation.required", { ns: "common" }))
        .min(8, t("-10011", { ns: "errors" }))
        .max(128, t("-10011", { ns: "errors" })),
      confirmPassword: z
        .string()
        .trim()
        .min(1, t("validation.required", { ns: "common" })),
    })
    .refine((value) => value.password === value.confirmPassword, {
      path: ["confirmPassword"],
      message: t("authRegister.error.passwordMismatch", { ns: "pages" }),
    })
}
