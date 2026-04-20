import { describe, expect, it } from "vitest"
import {
  findExportedPropBlocksMatching,
  findStableTsxFiles,
  toFileExports,
} from "./test-helpers"

describe("stable component style props", () => {
  it("does not expose style through exported stable props", () => {
    const matches = findExportedPropBlocksMatching(
      findStableTsxFiles(),
      (blockText) => /\bstyle\??:\s*/.test(blockText)
    )

    expect(toFileExports(matches)).toEqual([])
  })
})
