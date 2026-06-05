import { describe, expect, it } from "vitest"
import {
  appName,
  fileExists,
  findImportFindings,
  getImportSpecifier,
  hasImport,
  resolveAppPath,
  toLocations,
} from "./ast-helpers"

const authPageFiles = [
  resolveAppPath("src/pages/auth/Login.tsx"),
  resolveAppPath("src/pages/auth/register/index.tsx"),
  resolveAppPath("src/pages/public/Login.tsx"),
].filter(fileExists)

const forbiddenAuthPageImports = new Set([
  "@workspace/app-kit/login",
  "@workspace/app-kit/register",
  "react-hook-form",
  "@hookform/resolvers/zod",
  "zod",
  "@workspace/ui-components/stable/input",
  "@workspace/ui-components/stable/field",
])

describe(`${appName} auth page boundaries`, () => {
  it("keeps auth form implementation inside the unified app-kit auth view", () => {
    const findings = findImportFindings(authPageFiles, (node) => {
      return forbiddenAuthPageImports.has(getImportSpecifier(node))
    })

    expect(toLocations(findings)).toEqual([])
  })

  it("uses the unified app-kit auth entry for auth pages", () => {
    const missingAuthViewImport = authPageFiles
      .filter((file) => !hasImport(file, "@workspace/app-kit/auth"))
      .map((file) => file.replace(resolveAppPath(), "").replace(/^\//, ""))
      .sort()

    expect(missingAuthViewImport).toEqual([])
  })
})
