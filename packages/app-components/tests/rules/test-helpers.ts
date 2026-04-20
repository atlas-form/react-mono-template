import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"

const packageRoot = path.resolve(import.meta.dirname, "../..")

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

export interface SourceFileMatch {
  file: string
  text: string
}

export function readPackageJson() {
  return JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8")) as {
    exports?: Record<string, string>
  }
}

export function findPublicEntryFiles(): string[] {
  const exportsMap = readPackageJson().exports ?? {}

  return Object.values(exportsMap)
    .filter((value): value is string => typeof value === "string")
    .map((value) => path.resolve(packageRoot, value))
    .sort()
}

export function findPublicSourceFiles(): string[] {
  const files = new Set<string>()

  for (const entryFile of findPublicEntryFiles()) {
    files.add(entryFile)

    if (entryFile.endsWith("/index.ts") && entryFile.includes("/src/components/")) {
      for (const file of walk(path.dirname(entryFile))) {
        if (isSourceFile(file)) {
          files.add(file)
        }
      }
    }
  }

  return [...files].sort()
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

export function findSourceMatches(
  files: string[],
  matcher: RegExp
): RuleFinding[] {
  return files.flatMap((file) => {
    const relativeFile = path.relative(packageRoot, file)
    const source = readFileSync(file, "utf8")

    return Array.from(source.matchAll(matcher)).map((match) => {
      const index = match.index ?? 0

      return {
        file: relativeFile,
        line: source.slice(0, index).split("\n").length,
        text: match[0].trim(),
      }
    })
  })
}

export function findSourceFilesMatching(
  files: string[],
  matcher: (source: string) => boolean
): SourceFileMatch[] {
  return files.flatMap((file) => {
    const relativeFile = path.relative(packageRoot, file)
    const source = readFileSync(file, "utf8")

    return matcher(source)
      ? [
          {
            file: relativeFile,
            text: source,
          },
        ]
      : []
  })
}

export function findExportedPropBlocksMatching(
  files: string[],
  matcher: (blockText: string) => boolean
): ExportedPropBlockMatch[] {
  return files.flatMap((file) => {
    const relativeFile = path.relative(packageRoot, file)
    const source = readFileSync(file, "utf8")
    const matches = source.matchAll(
      /export\s+(?:interface|type)\s+(\w+Props)\b[\s\S]*?(?:\{[\s\S]*?\}|=[^\n;]+[;\n])/g
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

export function toLocations(findings: RuleFinding[]): string[] {
  return findings.map((finding) => `${finding.file}:${finding.line}`).sort()
}

export function toFileExports(matches: ExportedPropBlockMatch[]): string[] {
  return matches
    .map((match) => `${match.file}:${match.exportName}`)
    .sort()
}

export function toFiles(matches: Array<{ file: string }>): string[] {
  return [...new Set(matches.map((match) => match.file))].sort()
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function isSourceFile(file: string) {
  return /\.(ts|tsx)$/.test(file) && !/\.test\.(ts|tsx)$/.test(file)
}
