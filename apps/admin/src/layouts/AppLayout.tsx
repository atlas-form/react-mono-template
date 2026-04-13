import { useMemo } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { logout } from "@/store/authSlice"
import ThemeModeControl from "@/components/topbar/ThemeModeControl"
import LanguageControl from "@/components/topbar/LanguageControl"
import { BadgeCheck, Bell, CreditCard } from "lucide-react"
import { AvatarDropdown, AvatarDropdownItem } from "@workspace/app-components"
import { Sidebar, type SidebarSection } from "@workspace/app-components/sidebar"
import { TopBar } from "@workspace/app-components/top-bar"
import { Badge } from "@workspace/ui-components/stable/badge"

interface AdminNavItem {
  label: string
  description: string
  path: string
  prefix: string
  matcher: (pathname: string) => boolean
  subItems?: Array<{
    label: string
    href: string
  }>
}

const navItems: AdminNavItem[] = [
  {
    label: "总览",
    description: "Dashboard",
    path: "/",
    prefix: "01",
    matcher: (pathname: string) => pathname === "/",
  },
  {
    label: "订单看板",
    description: "Orders",
    path: "/orders",
    prefix: "02",
    matcher: (pathname: string) => pathname.startsWith("/orders"),
  },
  {
    label: "会员中心",
    description: "Members",
    path: "/members",
    prefix: "03",
    matcher: (pathname: string) => pathname.startsWith("/members"),
  },
  {
    label: "权限控制",
    description: "Access",
    path: "/access",
    prefix: "04",
    matcher: (pathname: string) => pathname.startsWith("/access"),
  },
  {
    label: "系统设置",
    description: "Settings",
    path: "/settings",
    prefix: "05",
    matcher: (pathname: string) => pathname.startsWith("/settings"),
    subItems: [
      { label: "审计开关", href: "/settings" },
      { label: "策略配置", href: "/settings" },
    ],
  },
]

export default function AppLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state: RootState) => state.auth.user)

  const currentSection = useMemo(() => {
    return (
      navItems.find((item) => item.matcher(location.pathname)) ?? navItems[0]
    )
  }, [location.pathname])

  const sections = useMemo<SidebarSection[]>(
    () => [
      {
        label: "Platform",
        items: navItems.map((item) => ({
          label: item.label,
          description: item.description,
          href: item.path,
          active: item.matcher(location.pathname),
          prefix: item.prefix,
          onSelect: () => navigate(item.path),
          subItems: item.subItems?.map((subItem) => ({
            ...subItem,
            active: location.pathname === subItem.href,
            onSelect: () => navigate(subItem.href),
          })),
        })),
      },
    ],
    [location.pathname, navigate]
  )

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    dispatch(logout())
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen bg-(--app-bg) text-(--app-text)">
      <div className="mx-auto max-w-400 px-3 py-3 sm:px-4 lg:px-6">
        <Sidebar
          brandEyebrow="Workspace"
          brandTitle="Admin"
          brandDescription="以 `apps/web` 为模板，改成你们自己的 admin 信息架构。"
          sections={sections}
        >
          <TopBar
            title={currentSection.label}
            meta={currentSection.description}
            trailing={[
              <Badge key="badge" variant="outline">
                Admin Console
              </Badge>,
              <LanguageControl key="lang" />,
              <ThemeModeControl key="theme" />,
              <AvatarDropdown
                key="account"
                avatarAlt={user?.name ?? "Admin"}
                avatarSrc={user?.avatar}
                avatarFallback={(user?.name ?? "A").charAt(0).toUpperCase()}
                displayName={user?.name ?? "Admin"}
                displayId={user?.email ?? "workspace-admin@example.com"}
                logout={{
                  label: "Log out",
                  onSelect: handleLogout,
                }}
              >
                <AvatarDropdownItem
                  icon={<BadgeCheck />}
                  label="Account"
                  onSelect={() => navigate("/settings")}
                />
                <AvatarDropdownItem
                  icon={<CreditCard />}
                  label="Billing"
                  onSelect={() => navigate("/settings")}
                />
                <AvatarDropdownItem
                  icon={<Bell />}
                  label="Notifications"
                  onSelect={() => navigate("/settings")}
                />
              </AvatarDropdown>,
            ]}
          />
          <Outlet />
        </Sidebar>
      </div>
    </div>
  )
}
