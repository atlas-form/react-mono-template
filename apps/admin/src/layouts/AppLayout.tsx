import { useMemo, type ReactNode } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { logout } from "@/store/authSlice"
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LayoutGrid,
  ShieldCheck,
  ShoppingCart,
  SquareTerminal,
  TableProperties,
  Users,
} from "lucide-react"
import {
  LanguageSwitch,
  ThemeToggle,
} from "@workspace/app-components"
import {
  SidebarShell,
  type SidebarShellSection,
} from "@workspace/app-components/sidebar-shell"
import { TopBar } from "@workspace/app-components/top-bar"
import { Badge } from "@workspace/ui-components/stable/badge"

interface AdminNavItem {
  label: string
  path: string
  icon: ReactNode
  matcher: (pathname: string) => boolean
  subItems?: Array<{
    label: string
    href: string
  }>
}

const navItems: AdminNavItem[] = [
  {
    label: "总览",
    path: "/",
    icon: <LayoutGrid />,
    matcher: (pathname: string) => pathname === "/",
  },
  {
    label: "订单看板",
    path: "/orders",
    icon: <ShoppingCart />,
    matcher: (pathname: string) => pathname.startsWith("/orders"),
  },
  {
    label: "会员中心",
    path: "/members",
    icon: <Users />,
    matcher: (pathname: string) => pathname.startsWith("/members"),
  },
  {
    label: "权限控制",
    path: "/access",
    icon: <ShieldCheck />,
    matcher: (pathname: string) => pathname.startsWith("/access"),
  },
  {
    label: "系统设置",
    path: "/settings",
    icon: <SquareTerminal />,
    matcher: (pathname: string) => pathname.startsWith("/settings"),
  },
  {
    label: "DataTable 超长菜单名称显示效果检查示例项目",
    path: "/datatable",
    icon: <TableProperties />,
    matcher: (pathname: string) => pathname.startsWith("/datatable"),
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

  const sections = useMemo<SidebarShellSection[]>(
    () => [
      {
        label: "Platform",
        items: navItems.map((item) => ({
          label: item.label,
          href: item.path,
          active: item.matcher(location.pathname),
          icon: item.icon,
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
    <div className="h-screen overflow-hidden bg-(--app-bg) text-(--app-text)">
      <div className="flex h-full min-w-0 flex-col overflow-hidden">
        <SidebarShell
          brandEyebrow="Workspace"
          brandTitle="Admin"
          brandDescription="Enterprise"
          sections={sections}
          footerAccount={{
            avatarAlt: user?.name ?? "Admin",
            avatarSrc: user?.avatar,
            avatarFallback: (user?.name ?? "A").charAt(0).toUpperCase(),
            displayName: user?.name ?? "Admin",
            displayId: user?.id || user?.email || "workspace-admin@example.com",
            logout: {
              label: "Log out",
              onSelect: handleLogout,
            },
            actions: [
              {
                icon: <BadgeCheck />,
                label: "Account",
                onSelect: () => navigate("/settings"),
              },
              {
                icon: <CreditCard />,
                label: "Billing",
                onSelect: () => navigate("/settings"),
              },
              {
                icon: <Bell />,
                label: "Notifications",
                onSelect: () => navigate("/settings"),
              },
            ],
          }}
        >
          <TopBar
            title={currentSection.label}
            trailing={[
              <Badge key="badge" variant="outline">
                Admin Console
              </Badge>,
              <LanguageSwitch key="lang" />,
              <ThemeToggle key="theme" />,
            ]}
          />
          <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden p-3">
            <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden pr-1">
              <Outlet />
            </div>
          </div>
        </SidebarShell>
      </div>
    </div>
  )
}
