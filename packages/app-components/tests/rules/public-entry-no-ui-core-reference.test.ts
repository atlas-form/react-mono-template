import { describe, expect, it } from "vitest"
import {
  findMatches,
  findPublicEntryFiles,
  toLocations,
} from "./test-helpers"

describe("app-components public entry primitive boundaries", () => {
  it("does not reference ui-core from public entry files", () => {
    const findings = findMatches(findPublicEntryFiles(), (line) =>
      /@workspace\/ui-core/.test(line)
    )

    expect(toLocations(findings)).toEqual([])
  })
})
