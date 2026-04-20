import { describe, expect, it } from "vitest"
import {
  findMatches,
  findStableTsxFiles,
  toLocations,
} from "./test-helpers"

describe("stable component core utility imports", () => {
  it("does not import ui-core utility modules inside stable components", () => {
    const findings = findMatches(findStableTsxFiles(), (line) =>
      /from\s+["']@workspace\/ui-core\/lib\/utils(?:\.js)?["']/.test(line)
    )

    expect(toLocations(findings)).toEqual([])
  })
})
