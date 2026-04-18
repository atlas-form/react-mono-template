import { useMemo } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { BookOpenText, LayoutPanelTop, TableProperties } from "lucide-react"
import { LanguageSwitch, ThemeToggle } from "@workspace/app-components"
import {
  AdminSidebar,
  type AdminSidebarSection,
} from "@workspace/app-components/admin-sidebar"
import { TopBar } from "@workspace/app-components/top-bar"
import { Badge } from "@workspace/ui-components/stable/badge"

const navItems = [
  {
    label: "DataTable 指南",
    path: "/",
    icon: <TableProperties />,
    matcher: (pathname: string) => pathname === "/",
    subItems: [
      { label: "快速预设", href: "/#presets" },
      { label: "实时示例", href: "/#live-demo" },
      { label: "配置说明", href: "/#playbook" },
    ],
  },
]

export default function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentSection = useMemo(() => {
    return navItems.find((item) => item.matcher(location.pathname)) ?? navItems[0]
  }, [location.pathname])

  const sections = useMemo<AdminSidebarSection[]>(
    () => [
      {
        label: "Guide",
        items: navItems.map((item) => ({
          label: item.label,
          href: item.path,
          active: item.matcher(location.pathname),
          icon: item.icon,
            onSelect: () => navigate(item.path),
            subItems: item.subItems?.map((subItem) => ({
              ...subItem,
              active: false,
              onSelect: () => {
                navigate(item.path)
                window.setTimeout(() => {
                  const anchor = document.querySelector(subItem.href)
                  anchor?.scrollIntoView({ behavior: "smooth", block: "start" })
                }, 0)
              },
            })),
        })),
      },
    ],
    [location.pathname, navigate]
  )

  return (
    <div className="h-screen overflow-hidden bg-(--app-bg) text-(--app-text)">
      <div className="flex h-full min-w-0 flex-col overflow-hidden">
        <AdminSidebar
          brandEyebrow="Component Docs"
          brandTitle="Guide"
          brandDescription="Admin Shell"
          sections={sections}
          footerAccount={{
            avatarAlt: "Guide Center",
            avatarFallback: "G",
            displayName: "Guide Center",
            displayId: "datatable@workspace",
            actions: [
              {
                icon: <BookOpenText />,
                label: "组件使用说明",
              },
              {
                icon: <LayoutPanelTop />,
                label: "后台壳架构",
              },
            ],
          }}
        >
          <TopBar
            title={currentSection.label}
            trailing={[
              <Badge key="badge" variant="outline">
                No Login
              </Badge>,
              <LanguageSwitch key="lang" />,
              <ThemeToggle key="theme" />,
            ]}
          />
          <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden p-3">
            <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
              <Outlet />
            </div>
          </div>
        </AdminSidebar>
      </div>
    </div>
  )
}
