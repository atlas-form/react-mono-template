import { lazy } from "react"

export const DashboardPage = lazy(() => import("@/pages/protected/Dashboard"))
export const OrdersPage = lazy(() => import("@/pages/protected/Orders"))
export const MembersPage = lazy(() => import("@/pages/protected/Members"))
export const AccessPage = lazy(() => import("@/pages/protected/Access"))
export const AccessBlueprintPage = lazy(
  () => import("@/pages/protected/AccessBlueprint"),
)
export const SettingsPage = lazy(() => import("@/pages/protected/Settings"))
export const DataTablePage = lazy(() => import("@/pages/protected/DataTable"))
