import { createElement } from "react"
import type { ComponentProps } from "react"
import { DynamicIcon, iconNames } from "lucide-react/dynamic"

import { heroiconsMap } from "./providers/heroicons"
import { lucideMap } from "./providers/lucide"
import type {
  IconMap,
  IconProps,
  IconProvider,
  SemanticIconName,
} from "./types"

const providerMaps: Record<IconProvider, IconMap> = {
  lucide: lucideMap,
  heroicons: heroiconsMap,
}

let currentProvider: IconProvider = "lucide"
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

function resolveLucideName(name: string): DynamicLucideName | null {
  const normalized = normalizeIconName(name)
  if (!normalized) {
    return null
  }

  if (lucideIconNameSet.has(normalized as DynamicLucideName)) {
    return normalized as DynamicLucideName
  }

  return null
}

export function setIconProvider(provider: IconProvider) {
  currentProvider = provider
}

export function getIconProvider() {
  return currentProvider
}

export function Icon({
  name,
  size = 16,
  className,
  provider,
  ...props
}: IconProps) {
  const selectedProvider = provider ?? currentProvider
  const iconMap = providerMaps[selectedProvider]
  const Comp = iconMap[name as SemanticIconName]

  if (Comp) {
    return createElement(Comp, { size, className, ...props })
  }

  if (selectedProvider === "lucide") {
    const lucideName = resolveLucideName(name)
    if (lucideName) {
      return createElement(DynamicIcon, {
        name: lucideName,
        size,
        className,
        ...props,
      })
    }
  }

  return null
}
