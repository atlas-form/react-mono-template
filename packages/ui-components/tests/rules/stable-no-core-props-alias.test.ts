import { describe, expect, it } from "vitest"
import { findMatches, findStableTsxFiles, toFiles } from "./test-helpers"

describe("stable component prop aliases", () => {
  it("does not expose Core*Props aliases from stable components", () => {
    const findings = findMatches(findStableTsxFiles(), (line) =>
      /export type \w+Props = Core\w+Props\b/.test(line)
    )

    expect(toFiles(findings)).toEqual([])
  })
})
