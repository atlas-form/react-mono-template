import { describe, expect, it } from "vitest"
import {
  findExportedPropMemberMatches,
  findPublicSourceFiles,
  toFileExports,
} from "./ast-helpers"

describe("app-components public prop protocols", () => {
  it("does not expose Core* references from exported public props", () => {
    const matches = findExportedPropMemberMatches(
      findPublicSourceFiles(),
      (_propName, typeText) => /\bCore[A-Z]\w*\b/.test(typeText)
    )

    expect(toFileExports(matches)).toEqual([])
  })
})
