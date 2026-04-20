import { describe, expect, it } from "vitest"
import { legacyAllowedExportKeys } from "./legacy-allowlist"
import { readPackageJson } from "./test-helpers"

describe("ui-components package exports", () => {
  it("does not introduce new legacy export categories", () => {
    const exportsMap = readPackageJson().exports ?? {}
    const exportKeys = Object.keys(exportsMap)
    const legacyKeys = exportKeys.filter(
      (key) => ![".", "./styles.css", "./stable/*", "./labs/*"].includes(key)
    )

    expect(legacyKeys.sort()).toEqual(legacyAllowedExportKeys)
  })
})
