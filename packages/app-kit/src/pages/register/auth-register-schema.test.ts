import { describe, expect, it } from "vitest"

import { createAuthRegisterSchema } from "./auth-register-schema"

const t = (key: string) => key

const validRegisterValues = {
  username: "valid_user-01",
  displayName: "",
  email: "",
  password: "password123",
  confirmPassword: "password123",
}

describe("createAuthRegisterSchema", () => {
  it("accepts values that match auth service register constraints", () => {
    const schema = createAuthRegisterSchema(t)

    expect(schema.safeParse(validRegisterValues).success).toBe(true)
  })

  it("uses auth error codes for register field validation", () => {
    const schema = createAuthRegisterSchema(t)

    const cases = [
      ["username", { username: "ab" }, "-10007"],
      ["username", { username: "invalid.name" }, "-10008"],
      ["displayName", { displayName: "a".repeat(65) }, "-10009"],
      ["email", { email: "invalid-email" }, "-10012"],
      ["password", { password: "short", confirmPassword: "short" }, "-10011"],
    ] as const

    for (const [fieldName, override, errorCode] of cases) {
      const result = schema.safeParse({
        ...validRegisterValues,
        ...override,
      })

      expect(result.success).toBe(false)
      if (result.success) continue

      const issue = result.error.issues.find(
        (item) => item.path[0] === fieldName
      )
      expect(issue?.message).toBe(errorCode)
    }
  })
})
