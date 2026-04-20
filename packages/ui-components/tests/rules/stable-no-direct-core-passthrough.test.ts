import { describe, expect, it } from "vitest"
import { findMatches, findStableTsxFiles, toFiles } from "./test-helpers"

describe("stable component passthroughs", () => {
  it("does not directly passthrough props into Core* components", () => {
    const findings = findMatches(findStableTsxFiles(), (line) =>
      /return <Core\w+ \{\.\.\.(props|rest)\}(?:\s*\/>|>)/.test(line)
    )

    expect(toFiles(findings)).toEqual([])
  })
})
