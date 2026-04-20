import { describe, expect, it } from "vitest"
import {
  findExportedPropBlocksMatching,
  findStableTsxFiles,
  toFileExports,
} from "./test-helpers"

describe("stable component asChild props", () => {
  it("does not expose asChild through exported stable props", () => {
    const matches = findExportedPropBlocksMatching(
      findStableTsxFiles(),
      (blockText) => /\basChild\??:\s*/.test(blockText)
    )

    expect(toFileExports(matches)).toEqual([])
  })
})
