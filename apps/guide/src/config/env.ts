import { z } from "zod"

const EnvSchema = z.object({
  VITE_ENABLE_MOCK: z.enum(["true", "false"]).default("false"),
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
