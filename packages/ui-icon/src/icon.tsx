import { createElement } from "react"

import { heroiconsMap } from "./providers/heroicons"
import { lucideMap } from "./providers/lucide"
import type { IconMap, IconProps, IconProvider } from "./types"

const providerMaps: Record<IconProvider, IconMap> = {
  lucide: lucideMap,
  heroicons: heroiconsMap,
}

let currentProvider: IconProvider = "lucide"

export function setIconProvider(provider: IconProvider) {
  currentProvider = provider
}

export function getIconProvider() {
  return currentProvider
}

export function Icon({ name, size = 16, className, provider }: IconProps) {
  const iconMap = providerMaps[provider ?? currentProvider]
  const Comp = iconMap[name]

  if (!Comp) {
    return null
  }

  return createElement(Comp, { size, className })
}
