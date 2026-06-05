import { registerApi } from "@/api"
import type { AuthRegisterSubmitValues } from "@workspace/app-kit/register"

export async function registerAuthAccount(values: AuthRegisterSubmitValues) {
  await registerApi({
    username: values.username.trim(),
    password: values.password,
    display_name: values.displayName.trim() || undefined,
    email: values.email.trim() || undefined,
  })
}
