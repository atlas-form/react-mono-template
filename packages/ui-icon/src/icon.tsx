import { createElement } from "react"

import { buildResolvedSemanticMap } from "./auto-map"
import {
  lucideComponentsByName,
  lucideSemanticAliases,
  type LucideIconName,
} from "./providers/lucide"
import type { IconProps, SemanticIconName } from "./types"

const lucideIconNameSet = new Set<LucideIconName>(
  Object.keys(lucideComponentsByName) as LucideIconName[]
)

function normalizeIconName(name: string) {
  return name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
}

const resolvedSemanticLucideMap = buildResolvedSemanticMap<SemanticIconName>({
  aliases: lucideSemanticAliases,
  isAvailable: (name) => lucideIconNameSet.has(name as LucideIconName),
  normalize: normalizeIconName,
})

function resolveLucideName(name: string): LucideIconName | null {
  const normalized = normalizeIconName(name)
  if (!normalized) {
    return null
  }

  if (lucideIconNameSet.has(normalized as LucideIconName)) {
    return normalized as LucideIconName
  }

  const semanticName = normalized as SemanticIconName
  const mappedName = resolvedSemanticLucideMap[semanticName]
  if (mappedName && lucideIconNameSet.has(mappedName as LucideIconName)) {
    return mappedName as LucideIconName
  }

  return null
}

export function Icon({
  name,
  size = 16,
  className,
  ...props
}: IconProps) {
  const lucideName = resolveLucideName(name)
  if (lucideName) {
    const Comp = lucideComponentsByName[lucideName]
    return createElement(Comp, { size, className, ...props })
  }

  return null
}
