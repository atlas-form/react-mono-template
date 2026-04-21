import { existsSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { readPackageJson } from "./ast-helpers"

describe("app-components package exports", () => {
  it("uses the public export naming convention", () => {
    const exportsMap = readPackageJson().exports ?? {}
    const exportKeys = Object.keys(exportsMap).sort()

    const invalidKeys = exportKeys.filter(
      (key) => key !== "." && !/^\.\/[a-z0-9-]+$/.test(key)
    )

    expect(invalidKeys).toEqual([])
  })

  it("maps component subpath exports to public component index files", () => {
    const exportsMap = readPackageJson().exports ?? {}

    const invalidEntries = Object.entries(exportsMap)
      .filter(([key]) => key !== ".")
      .flatMap(([key, value]) => {
        if (typeof value !== "string") {
          return [key]
        }

        const normalizedValue = value.replaceAll("\\", "/")
        const isComponentIndex =
          normalizedValue.startsWith("./src/components/") &&
          normalizedValue.endsWith("/index.ts")
        const absolutePath = path.resolve(import.meta.dirname, "../../", value)

        return isComponentIndex && existsSync(absolutePath)
          ? []
          : [`${key} -> ${value}`]
      })

    expect(invalidEntries).toEqual([])
  })
})
