import { describe, expect, it } from "vitest"
import {
  findExportedPropBlocksMatching,
  findStableTsxFiles,
  toFileExports,
} from "./test-helpers"

describe("stable component derived className props", () => {
  it("does not expose *ClassName props through exported stable props", () => {
    const matches = findExportedPropBlocksMatching(
      findStableTsxFiles(),
      (blockText) => /\b\w+ClassName\??:\s*/.test(blockText)
    )

    expect(toFileExports(matches)).toEqual([])
  })
})
