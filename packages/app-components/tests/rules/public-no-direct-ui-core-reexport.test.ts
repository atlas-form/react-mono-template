import { describe, expect, it } from "vitest"
import {
  findSourceMatches,
  findPublicSourceFiles,
  toLocations,
} from "./test-helpers"

describe("app-components public re-export boundaries", () => {
  it("does not directly re-export ui-core modules from public sources", () => {
    const findings = findSourceMatches(
      findPublicSourceFiles(),
      /export\s+(?:type\s+)?\{[\s\S]*?\}\s+from\s+["']@workspace\/ui-core\/[^"']+["']/g
    )

    expect(toLocations(findings)).toEqual([])
  })
})
