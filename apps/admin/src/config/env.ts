import { z } from "zod"

const EnvSchema = z.object({
  VITE_ADMIN_API_URL: z.string().min(1, "VITE_ADMIN_API_URL is required"),
  VITE_AUTH_URL: z.string().min(1, "VITE_AUTH_URL is required"),
  VITE_FILE_URL: z.string().min(1, "VITE_FILE_URL is required"),
})

export type AppEnv = z.infer<typeof EnvSchema>

export function getEnv(): AppEnv {
  const result = EnvSchema.safeParse(import.meta.env)
  if (result.success) {
    return result.data
  }

  const issues = result.error.issues
    .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
    .join("\n")

  throw new Error(`Invalid environment variables:\n${issues}`)
}
