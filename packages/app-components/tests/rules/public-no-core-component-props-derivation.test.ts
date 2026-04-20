import { describe, expect, it } from "vitest"
import {
  findSourceMatches,
  findPublicSourceFiles,
  toLocations,
} from "./test-helpers"

describe("app-components public prop derivation", () => {
  it("does not derive public props from React.ComponentProps<typeof Core*>", () => {
    const findings = findSourceMatches(
      findPublicSourceFiles(),
      /export\s+type\s+\w+Props\s*=\s*React\.ComponentProps<\s*typeof\s+Core[A-Z]\w*\s*>/g
    )

    expect(toLocations(findings)).toEqual([])
  })
})
