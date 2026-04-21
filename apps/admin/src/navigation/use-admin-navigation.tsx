import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import type { SidebarShellSection } from "@workspace/app-components/sidebar-shell"
import type { RootState } from "@/store"
import {
  navigationSections,
  type NavigationItemConfig,
  type NavigationSectionConfig,
  type NavigationSubItemConfig,
} from "./menu-config"

interface CurrentNavigationItem {
  label: string
  path: string
}

function matchesNavigationSubItem(
  subItem: NavigationSubItemConfig,
  pathname: string
) {
  const matcher =
    subItem.matcher ??
    ((currentPathname: string) => currentPathname === subItem.href)

  return matcher(pathname)
}

function isVisibleSubItem(
  subItem: NavigationSubItemConfig,
  visibleCodes: Set<string>
) {
  return visibleCodes.has(subItem.permissionCode)
}

function findCurrentItem(
  sections: NavigationSectionConfig[],
  pathname: string
): CurrentNavigationItem | null {
  for (const section of sections) {
    for (const item of section.items) {
      if (item.subItems?.length) {
        for (const subItem of item.subItems) {
          if (matchesNavigationSubItem(subItem, pathname)) {
            return {
              label: subItem.label,
              path: subItem.href,
            }
          }
        }
      }

      if (!item.path) {
        continue
      }

      if (pathname === item.path) {
        return {
          label: item.label,
          path: item.path,
        }
      }
    }
  }

  return null
}

function getDefaultItem(
  sections: NavigationSectionConfig[]
): CurrentNavigationItem | null {
  for (const section of sections) {
    for (const item of section.items) {
      const firstSubItem = item.subItems?.[0]
      if (firstSubItem) {
        return {
          label: firstSubItem.label,
          path: firstSubItem.href,
        }
      }

      if (item.path) {
        return {
          label: item.label,
          path: item.path,
        }
      }
    }
  }

  return null
}

function toSidebarSubItems(
  subItems: NavigationSubItemConfig[] | undefined,
  pathname: string,
  navigate: ReturnType<typeof useNavigate>
) {
  return subItems?.map((subItem) => ({
    ...subItem,
    active: matchesNavigationSubItem(subItem, pathname),
    onSelect: () => navigate(subItem.href),
  }))
}

export function useAdminNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const permissionCodes = useSelector(
    (state: RootState) => state.adminAccess.permissionCodes
  )
  const visibleCodes = useMemo(() => new Set(permissionCodes), [permissionCodes])

  const visibleSections = useMemo<NavigationSectionConfig[]>(
    () =>
      navigationSections
        .map((section) => ({
          ...section,
          items: section.items
            .map((item) => {
              const visibleSubItems = item.subItems?.filter((subItem) =>
                isVisibleSubItem(subItem, visibleCodes)
              )

              if (visibleSubItems?.length) {
                return {
                  ...item,
                  subItems: visibleSubItems,
                }
              }

              if (item.permissionCode && visibleCodes.has(item.permissionCode)) {
                return item
              }

              return null
            })
            .filter((item): item is NavigationItemConfig => Boolean(item)),
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
          return {
            label: item.label,
            href: item.path ?? "#",
            active: item.path ? location.pathname === item.path : false,
            icon: item.icon,
            onSelect: item.path ? () => navigate(item.path!) : undefined,
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
    isLoading: false,
    sections,
  }
}
