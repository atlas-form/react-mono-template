import { existsSync, readdirSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import ts from "typescript"
import { readPackageJson, readSourceFile } from "./ast-helpers"

const packageRoot = path.resolve(import.meta.dirname, "../..")
const authEntryFile = path.join(packageRoot, "src/pages/auth/index.ts")
const srcPagesRoot = path.join(packageRoot, "src/pages")
const authPagesRoot = path.join(packageRoot, "src/pages/auth")
const sourceExtensions = [".ts", ".tsx"] as const

function findSourceFiles(root: string): string[] {
  if (!existsSync(root)) {
    return []
  }

  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(root, entry.name)

    if (entry.isDirectory()) {
      return findSourceFiles(file)
    }

    return sourceExtensions.some((extension) => file.endsWith(extension))
      ? [file]
      : []
  })
}

function toPackageRelative(file: string) {
  return path.relative(packageRoot, file)
}

function getExportedDeclarationNames(file: string) {
  const { sourceFile } = readSourceFile(file)
  const names: string[] = []

  sourceFile.statements.forEach((statement) => {
    if (!ts.canHaveModifiers(statement)) {
      return
    }

    const isExported =
      ts
        .getModifiers(statement)
        ?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false

    if (!isExported) {
      return
    }

    if (
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement)) &&
      statement.name
    ) {
      names.push(statement.name.text)
    }

    if (ts.isVariableStatement(statement)) {
      statement.declarationList.declarations.forEach((declaration) => {
        if (ts.isIdentifier(declaration.name)) {
          names.push(declaration.name.text)
        }
      })
    }
  })

  return names.sort()
}

describe("app-kit auth public API boundaries", () => {
  it("exposes one unified auth view entry instead of separate login/register entries", () => {
    const exportsMap = readPackageJson().exports ?? {}

    expect(exportsMap["./auth"]).toBe("./src/pages/auth/index.ts")
    expect(exportsMap).not.toHaveProperty("./login")
    expect(exportsMap).not.toHaveProperty("./register")
  })

  it("keeps auth as a View API, not package-level Page APIs", () => {
    const exportedNames = getExportedDeclarationNames(
      path.join(packageRoot, "src/pages/auth/auth-view.tsx")
    )
    const pageExports = exportedNames.filter((name) => /^Auth.*Page$/.test(name))

    expect(pageExports).toEqual([])
  })

  it("does not reintroduce split login/register auth views", () => {
    const authSourceFiles = findSourceFiles(srcPagesRoot)
    const oldAuthViewFiles = authSourceFiles
      .map(toPackageRelative)
      .filter((file) =>
        /src\/pages\/.+\/auth-(login|register)-view\.tsx$/.test(file)
      )
    const oldAuthViewNames = authSourceFiles.flatMap((file) => {
      const { sourceText } = readSourceFile(file)
      const matches = sourceText.match(/\bAuth(?:Login|Register)View\b/g) ?? []

      return matches.map((match) => `${toPackageRelative(file)}:${match}`)
    })

    expect(oldAuthViewFiles).toEqual([])
    expect(oldAuthViewNames).toEqual([])
  })

  it("keeps the auth entry focused on AuthView exports", () => {
    const { sourceText } = readSourceFile(authEntryFile)

    expect(sourceText).toContain("AuthView")
    expect(sourceText).not.toMatch(/\bAuth(?:Login|Register)View\b/)
    expect(sourceText).not.toMatch(/\bAuth.*Page\b/)
  })

  it("does not define package auth page files under the shared auth view", () => {
    const authFiles = findSourceFiles(authPagesRoot)
      .map(toPackageRelative)
      .filter((file) => /page\.(ts|tsx)$/.test(path.basename(file)))

    expect(authFiles).toEqual([])
  })
})
