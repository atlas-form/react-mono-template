import { describe, expect, it } from "vitest"
import {
  legacyAllowedCorePropsAliases,
} from "./legacy-allowlist"
import { findMatches, findStableTsxFiles, toLocations } from "./test-helpers"

describe("stable component prop aliases", () => {
  it("does not introduce new Core*Props aliases", () => {
    const findings = findMatches(findStableTsxFiles(), (line) =>
      /export type \w+Props = Core\w+Props\b/.test(line)
    )

    expect(toLocations(findings)).toEqual(legacyAllowedCorePropsAliases)
  })
})
