import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router"
import type { SidebarShellSection } from "@workspace/app-components/sidebar-shell"
import { getCurrentUserMenusApi, type CurrentUserMenuNode } from "@/api/admin"
import {
  navigationSections,
  type NavigationItemConfig,
  type NavigationSectionConfig,
  type NavigationSubItemConfig,
} from "./menu-config"

function collectPermissionCodes(nodes: CurrentUserMenuNode[]): Set<string> {
  return nodes.reduce((codes, node) => {
    if (node.permission_code) {
      codes.add(node.permission_code)
    }

    for (const childCode of collectPermissionCodes(node.children)) {
      codes.add(childCode)
    }

    return codes
  }, new Set<string>())
}

function isVisibleItem(item: NavigationItemConfig, visibleCodes: Set<string>) {
  return visibleCodes.has(item.permissionCode)
}

function findCurrentItem(
  sections: NavigationSectionConfig[],
  pathname: string
): NavigationItemConfig | null {
  for (const section of sections) {
    for (const item of section.items) {
      const matcher =
        item.matcher ?? ((currentPathname: string) => currentPathname === item.path)

      if (matcher(pathname)) {
        return item
      }
    }
  }

  return null
}

function getDefaultItem(
  sections: NavigationSectionConfig[]
): NavigationItemConfig | null {
  return sections.flatMap((section) => section.items)[0] ?? null
}

function toSidebarSubItems(
  subItems: NavigationSubItemConfig[] | undefined,
  pathname: string,
  navigate: ReturnType<typeof useNavigate>
) {
  return subItems?.map((subItem) => ({
    ...subItem,
    active: pathname === subItem.href,
    onSelect: () => navigate(subItem.href),
  }))
}

export function useAdminNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const menusQuery = useQuery({
    queryKey: ["admin", "current-user-menus"],
    queryFn: getCurrentUserMenusApi,
  })

  const visibleCodes = useMemo(
    () => collectPermissionCodes(menusQuery.data ?? []),
    [menusQuery.data]
  )

  const visibleSections = useMemo<NavigationSectionConfig[]>(
    () =>
      navigationSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => isVisibleItem(item, visibleCodes)),
        }))
        .filter((section) => section.items.length > 0),
    [visibleCodes]
  )

  const currentItem = useMemo(
    () => findCurrentItem(visibleSections, location.pathname),
    [location.pathname, visibleSections]
  )

  const defaultItem = useMemo(
    () => getDefaultItem(visibleSections),
    [visibleSections]
  )

  const sections = useMemo<SidebarShellSection[]>(
    () =>
      visibleSections.map((section) => ({
        label: section.label,
        items: section.items.map((item) => {
          const matcher =
            item.matcher ?? ((pathname: string) => pathname === item.path)

          return {
            label: item.label,
            href: item.path,
            active: matcher(location.pathname),
            icon: item.icon,
            onSelect: () => navigate(item.path),
            subItems: toSidebarSubItems(item.subItems, location.pathname, navigate),
          }
        }),
      })),
    [location.pathname, navigate, visibleSections]
  )

  return {
    currentItem,
    defaultPath: defaultItem?.path ?? null,
    hasVisibleMenus: visibleSections.length > 0,
    isLoading: menusQuery.isLoading,
    sections,
  }
}
