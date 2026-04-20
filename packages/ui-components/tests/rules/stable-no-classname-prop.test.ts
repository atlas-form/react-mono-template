import { describe, expect, it } from "vitest"
import {
  findExportedPropBlocksMatching,
  findStableTsxFiles,
  toFileExports,
} from "./test-helpers"

describe("stable component className props", () => {
  it("does not expose className through exported stable props", () => {
    const matches = findExportedPropBlocksMatching(
      findStableTsxFiles(),
      (blockText) => /\bclassName\??:\s*/.test(blockText)
    )

    expect(toFileExports(matches)).toEqual([])
  })
})
