import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"

const packageRoot = path.resolve(import.meta.dirname, "../..")
const stableRoot = path.join(packageRoot, "src/components/stable")

export interface RuleFinding {
  file: string
  line: number
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

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}
