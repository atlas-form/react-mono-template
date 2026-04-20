import { describe, expect, it } from "vitest"
import { readPackageJson } from "./ast-helpers"

describe("app-components package exports", () => {
  it("only exposes the approved public export categories", () => {
    const exportsMap = readPackageJson().exports ?? {}
    const exportKeys = Object.keys(exportsMap).sort()

    expect(exportKeys).toEqual([
      ".",
      "./admin-sidebar",
      "./data-table",
      "./date-time-picker",
      "./language-switch",
      "./theme-toggle",
      "./tooltip",
      "./top-bar",
    ])
  })
})
