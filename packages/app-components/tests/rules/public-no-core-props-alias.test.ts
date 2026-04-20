import { describe, expect, it } from "vitest"
import {
  findSourceMatches,
  findPublicSourceFiles,
  toLocations,
} from "./test-helpers"

describe("app-components public prop aliases", () => {
  it("does not export Core*Props aliases from public component sources", () => {
    const findings = findSourceMatches(
      findPublicSourceFiles(),
      /export\s+type\s+\w+Props\s*=\s*Core\w+Props\b/g
    )

    expect(toLocations(findings)).toEqual([])
  })
})
