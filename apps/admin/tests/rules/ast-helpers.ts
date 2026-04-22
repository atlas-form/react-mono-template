import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import ts from "typescript"

const packageRoot = path.resolve(import.meta.dirname, "../..")
const pagesRoot = path.join(packageRoot, "src/pages/protected")

export interface RuleFinding {
  file: string
  line: number
  text: string
}

export function resolveProtectedPage(...segments: string[]) {
  return path.join(pagesRoot, ...segments)
}

export function fileExists(file: string) {
  return existsSync(file)
}

export function readSourceFile(file: string) {
  const sourceText = readFileSync(file, "utf8")
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )

  return { sourceFile, sourceText }
}

export function findImportFindings(
  files: string[],
  matcher: (node: ts.ImportDeclaration) => boolean
): RuleFinding[] {
  return files.flatMap((file) => {
    const { sourceFile } = readSourceFile(file)

    return sourceFile.statements.flatMap((statement) => {
      if (!ts.isImportDeclaration(statement) || !matcher(statement)) {
        return []
      }

      return [toFinding(file, sourceFile, statement)]
    })
  })
}

export function toLocations(findings: RuleFinding[]): string[] {
  return findings.map((finding) => `${finding.file}:${finding.line}`).sort()
}

function toFinding(
  file: string,
  sourceFile: ts.SourceFile,
  node: ts.Node
): RuleFinding {
  const relativeFile = path.relative(packageRoot, file)
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))

  return {
    file: relativeFile,
    line: line + 1,
    text: node.getText(sourceFile),
  }
}
