import { describe, expect, it } from "vitest"
import {
  findExportedPropBlocksMatching,
  findPublicSourceFiles,
  toFileExports,
} from "./test-helpers"

describe("app-components public prop protocols", () => {
  it("does not expose Core* references from exported public props", () => {
    const matches = findExportedPropBlocksMatching(
      findPublicSourceFiles(),
      (blockText) => /\bCore[A-Z]\w*\b/.test(blockText)
    )

    expect(toFileExports(matches)).toEqual([])
  })
})
