import type { ReactNode } from "react"
import {
  ShieldCheck,
} from "lucide-react"

export interface NavigationSubItemConfig {
  permissionCode: string
  label: string
  href: string
  matcher?: (pathname: string) => boolean
}

export interface NavigationItemConfig {
  permissionCode?: string
  label: string
  path?: string
  icon?: ReactNode
  subItems?: NavigationSubItemConfig[]
}

export interface NavigationSectionConfig {
  label: string
  items: NavigationItemConfig[]
}

export const navigationSections: NavigationSectionConfig[] = [
  {
    label: "Platform",
    items: [
      {
        label: "权限中心",
        icon: <ShieldCheck />,
        subItems: [
          {
            permissionCode: "admin:user",
            label: "后台账号",
            href: "/access/admin-users",
            matcher: (pathname) => pathname.startsWith("/access/admin-users"),
          },
          {
            permissionCode: "admin:role:list",
            label: "角色",
            href: "/access/roles",
            matcher: (pathname) => pathname.startsWith("/access/roles"),
          },
          {
            permissionCode: "admin:permission:list",
            label: "权限资源",
            href: "/access/permissions",
            matcher: (pathname) => pathname.startsWith("/access/permissions"),
          },
          {
            permissionCode: "admin:role_permission:grant",
            label: "角色授权",
            href: "/access/role-permissions",
            matcher: (pathname) => pathname.startsWith("/access/role-permissions"),
          },
          {
            permissionCode: "admin:user_role:list",
            label: "用户角色",
            href: "/access/user-roles",
            matcher: (pathname) => pathname.startsWith("/access/user-roles"),
          },
          {
            permissionCode: "admin:access",
            label: "菜单配置",
            href: "/access/menus",
            matcher: (pathname) => pathname.startsWith("/access/menus"),
          },
        ],
      },
    ],
  },
]
