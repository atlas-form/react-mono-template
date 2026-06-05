import { registerApi } from "@/api"
import type { RegisterFormValues } from "./types"

export async function registerAuthAccount(values: RegisterFormValues) {
  await registerApi({
    username: values.username.trim(),
    password: values.password,
    display_name: values.displayName.trim() || undefined,
    email: values.email.trim() || undefined,
  })
}
