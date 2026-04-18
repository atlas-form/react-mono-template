import { Suspense } from "react"
import type { ReactNode } from "react"
import type { RouteObject } from "react-router"
import AppLayout from "@/layouts/AppLayout"
import PageLoading from "@/components/system/PageLoading"
import RouteErrorBoundary from "@/components/system/RouteErrorBoundary"
import { DataTableGuidePage } from "@/routes/lazy/appPages"

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageLoading />}>{node}</Suspense>
}

export const appRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      index: true,
      element: withSuspense(<DataTableGuidePage />),
    },
  ],
}
