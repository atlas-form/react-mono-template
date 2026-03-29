import { createElement } from "react"
import type { ComponentProps } from "react"
import { DynamicIcon, iconNames } from "lucide-react/dynamic"

import { buildResolvedSemanticMap } from "./auto-map"
import { lucideSemanticAliases } from "./providers/lucide"
import type { IconProps, SemanticIconName } from "./types"

type DynamicLucideName = ComponentProps<typeof DynamicIcon>["name"]
const lucideIconNameSet = new Set<DynamicLucideName>(
  iconNames as DynamicLucideName[]
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
  isAvailable: (name) => lucideIconNameSet.has(name as DynamicLucideName),
  normalize: normalizeIconName,
})

function resolveLucideName(name: string): DynamicLucideName | null {
  const normalized = normalizeIconName(name)
  if (!normalized) {
    return null
  }

  if (lucideIconNameSet.has(normalized as DynamicLucideName)) {
    return normalized as DynamicLucideName
  }

  const semanticName = normalized as SemanticIconName
  const mappedName = resolvedSemanticLucideMap[semanticName]
  if (mappedName && lucideIconNameSet.has(mappedName as DynamicLucideName)) {
    return mappedName as DynamicLucideName
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
    return createElement(DynamicIcon, {
      name: lucideName,
      size,
      className,
      ...props,
    })
  }

  return null
}
