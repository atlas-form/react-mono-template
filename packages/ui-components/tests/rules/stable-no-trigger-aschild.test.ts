import { describe, expect, it } from "vitest"
import {
  findMatches,
  findStableTsxFiles,
  toLocations,
} from "./test-helpers"

describe("stable component trigger protocols", () => {
  it("does not use Trigger asChild inside stable components", () => {
    const findings = findMatches(findStableTsxFiles(), (line) =>
      /<\w*Trigger\s+asChild\b/.test(line)
    )

    expect(toLocations(findings)).toEqual([])
  })
})
