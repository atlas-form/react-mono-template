import { Suspense, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import { PageLoading, RouteErrorBoundary } from "@workspace/app-components"
import AppLayout from "@/layouts/AppLayout"
import {
  AccessPage,
  AccessBlueprintPage,
  DataTablePage,
  DashboardPage,
  MembersPage,
  OrdersPage,
  SettingsPage,
} from "@/routes/lazy/protectedPages"

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageLoading />}>{node}</Suspense>
}

export const protectedRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      index: true, // Default path `/`
      element: withSuspense(<DashboardPage />),
    },
    {
      path: "orders",
      element: withSuspense(<OrdersPage />),
    },
    {
      path: "members",
      element: withSuspense(<MembersPage />),
    },
    {
      path: "access",
      element: withSuspense(<AccessPage />),
    },
    {
      path: "access/blueprint",
      element: withSuspense(<AccessBlueprintPage />),
    },
    {
      path: "settings",
      element: withSuspense(<SettingsPage />),
    },
    {
      path: "datatable",
      element: withSuspense(<DataTablePage />),
    },
  ],
}
