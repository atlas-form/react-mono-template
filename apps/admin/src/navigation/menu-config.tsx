import type { ReactNode } from "react"
import { ShieldCheck, Users } from "lucide-react"

export interface NavigationSubItemConfig {
  label: string
  href: string
}

export interface NavigationItemConfig {
  permissionCode: string
  label: string
  path: string
  icon: ReactNode
  matcher?: (pathname: string) => boolean
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
        permissionCode: "admin:user",
        label: "用户管理",
        path: "/members",
        icon: <Users />,
        matcher: (pathname) => pathname.startsWith("/members"),
      },
      {
        permissionCode: "admin:access",
        label: "权限管理",
        path: "/access",
        icon: <ShieldCheck />,
        matcher: (pathname) => pathname.startsWith("/access"),
      },
    ],
  },
]
