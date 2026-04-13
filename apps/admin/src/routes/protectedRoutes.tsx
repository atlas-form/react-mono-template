import { Suspense, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import AppLayout from "@/layouts/AppLayout"
import PageLoading from "@/components/system/PageLoading"
import RouteErrorBoundary from "@/components/system/RouteErrorBoundary"
import {
  AccessPage,
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
      path: "settings",
      element: withSuspense(<SettingsPage />),
    },
  ],
}
