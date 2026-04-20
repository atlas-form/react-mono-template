import { describe, expect, it } from "vitest"
import {
  findPublicSourceFiles,
  findSourceFilesMatching,
  toFiles,
} from "./test-helpers"

describe("app-components public wrapper boundaries", () => {
  it("does not expose transparent ui-core passthrough wrappers", () => {
    const matches = findSourceFilesMatching(findPublicSourceFiles(), (source) => {
      const importsCoreAlias =
        /import\s*\{[\s\S]*\bas\s+Core[A-Z]\w*[\s\S]*\}\s*from\s*["']@workspace\/ui-core\/[^"']+["']/.test(
          source
        )
      const exportsCoreProps =
        /export\s+(?:type|interface)\s+\w+Props\b[\s\S]*\bCore[A-Z]\w*Props\b/.test(source)
      const forwardsProps =
        /<Core[A-Z]\w*\s+\{\.\.\.props\}\s*\/>/.test(source) ||
        /<Core[A-Z]\w*\s+\{\.\.\.props\}>/.test(source)

      return importsCoreAlias && exportsCoreProps && forwardsProps
    })

    expect(toFiles(matches)).toEqual([])
  })
})
