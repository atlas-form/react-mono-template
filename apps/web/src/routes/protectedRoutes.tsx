import { Suspense, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import { PageLoading, RouteErrorBoundary } from "@workspace/app-components"
import AppLayout from "@/layouts/AppLayout"
import { AboutPage, GuidePage, LogoutPage } from "@/routes/lazy/protectedPages"

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
      element: withSuspense(<GuidePage />),
    },
    {
      path: "guide",
      element: withSuspense(<GuidePage />),
    },
    {
      path: "about",
      element: withSuspense(<AboutPage />),
    },
    {
      path: "logout",
      element: withSuspense(<LogoutPage />),
    },
  ],
}
