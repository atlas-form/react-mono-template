import { describe, expect, it } from "vitest"
import {
  findMatches,
  findPublicEntryFiles,
  toLocations,
} from "./test-helpers"

describe("app-components public entry protocols", () => {
  it("only re-exports local modules from public entry files", () => {
    const findings = findMatches(findPublicEntryFiles(), (line) =>
      /^export\b.*from\s+["'](?!\.)/.test(line)
    )

    expect(toLocations(findings)).toEqual([])
  })
})
