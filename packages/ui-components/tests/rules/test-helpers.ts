import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"

const packageRoot = path.resolve(import.meta.dirname, "../..")
const stableRoot = path.join(packageRoot, "src/components/stable")

export interface RuleFinding {
  file: string
  line: number
  text: string
}

export interface ExportedPropBlockMatch {
  file: string
  exportName: string
  text: string
}

export function readPackageJson() {
  return JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8")) as {
    exports?: Record<string, string>
  }
}

export function findStableTsxFiles(): string[] {
  return walk(stableRoot).filter((file) => file.endsWith(".tsx"))
}

export function findMatches(
  files: string[],
  matcher: (line: string) => boolean
): RuleFinding[] {
  return files.flatMap((file) => {
    const relativeFile = path.relative(packageRoot, file)
    const lines = readFileSync(file, "utf8").split("\n")

    return lines.flatMap((line, index) =>
      matcher(line)
        ? [
            {
              file: relativeFile,
              line: index + 1,
              text: line.trim(),
            },
          ]
        : []
    )
  })
}

export function toLocations(findings: RuleFinding[]): string[] {
  return findings.map((finding) => `${finding.file}:${finding.line}`).sort()
}

export function toFiles(findings: RuleFinding[]): string[] {
  return [...new Set(findings.map((finding) => finding.file))].sort()
}

export function findExportedPropBlocksMatching(
  files: string[],
  matcher: (blockText: string) => boolean
): ExportedPropBlockMatch[] {
  return files.flatMap((file) => {
    const relativeFile = path.relative(packageRoot, file)
    const source = readFileSync(file, "utf8")
    const matches = source.matchAll(
      /export\s+(?:interface|type)\s+(\w+Props)\b[\s\S]*?(?:\{[\s\S]*?\})/g
    )

    return Array.from(matches).flatMap((match) => {
      const exportName = match[1]
      const text = match[0]

      return matcher(text)
        ? [
            {
              file: relativeFile,
              exportName,
              text,
            },
          ]
        : []
    })
  })
}

export function toFileExports(
  matches: ExportedPropBlockMatch[]
): string[] {
  return matches
    .map((match) => `${match.file}:${match.exportName}`)
    .sort()
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}
