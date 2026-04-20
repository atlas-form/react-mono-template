import { describe, expect, it } from "vitest"
import {
  findMatches,
  findStableTsxFiles,
  toLocations,
} from "./test-helpers"

describe("stable component ref protocols", () => {
  it("does not use forwardRef inside stable components", () => {
    const findings = findMatches(findStableTsxFiles(), (line) =>
      /\bforwardRef\s*</.test(line) || /\bforwardRef\s*\(/.test(line)
    )

    expect(toLocations(findings)).toEqual([])
  })
})
