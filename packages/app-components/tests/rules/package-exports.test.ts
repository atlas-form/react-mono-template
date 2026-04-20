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

  it("maps component subpath exports to matching component index files", () => {
    const exportsMap = readPackageJson().exports ?? {}

    const invalidEntries = Object.entries(exportsMap)
      .filter(([key]) => key !== ".")
      .flatMap(([key, value]) => {
        if (typeof value !== "string") {
          return [key]
        }

        const componentName = key.slice(2)
        const expectedPath = `./src/components/${componentName}/index.ts`

        return value === expectedPath ? [] : [`${key} -> ${value}`]
      })

    expect(invalidEntries).toEqual([])
  })
})
