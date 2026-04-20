import { describe, expect, it } from "vitest"
import {
  legacyAllowedCorePassthroughs,
} from "./legacy-allowlist"
import { findMatches, findStableTsxFiles, toLocations } from "./test-helpers"

describe("stable component passthroughs", () => {
  it("does not introduce new direct Core* passthrough wrappers", () => {
    const findings = findMatches(findStableTsxFiles(), (line) =>
      /return <Core\w+ \{\.\.\.(props|rest)\}(?:\s*\/>|>)/.test(line)
    )

    expect(toLocations(findings)).toEqual(legacyAllowedCorePassthroughs)
  })
})
