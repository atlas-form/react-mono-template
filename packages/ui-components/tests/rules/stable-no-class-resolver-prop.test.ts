import { describe, expect, it } from "vitest"
import {
  findExportedPropBlocksMatching,
  findStableTsxFiles,
  toFileExports,
} from "./test-helpers"

describe("stable component class resolver props", () => {
  it("does not expose classResolver through exported stable props", () => {
    const matches = findExportedPropBlocksMatching(
      findStableTsxFiles(),
      (blockText) => /\bclassResolver\??:\s*/.test(blockText)
    )

    expect(toFileExports(matches)).toEqual([])
  })

  it("does not expose classNameMode through exported stable props", () => {
    const matches = findExportedPropBlocksMatching(
      findStableTsxFiles(),
      (blockText) => /\bclassNameMode\??:\s*/.test(blockText)
    )

    expect(toFileExports(matches)).toEqual([])
  })
})
