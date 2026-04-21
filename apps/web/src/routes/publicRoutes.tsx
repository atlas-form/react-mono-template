import { Suspense, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import { Navigate } from "react-router"
import { PageLoading } from "@workspace/app-components"
import AuthLayout from "@/layouts/AuthLayout"
import RouteErrorBoundary from "@/components/system/RouteErrorBoundary"
import { GuidePage, LoginPage, RegisterPage } from "@/routes/lazy/publicPages"

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageLoading />}>{node}</Suspense>
}

export const publicRoutes: RouteObject = {
  path: "/",
  element: <AuthLayout />,
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      index: true,
      element: <Navigate to="/login" replace />,
    },
    {
      path: "login",
      element: withSuspense(<LoginPage />),
    },
    {
      path: "register",
      element: withSuspense(<RegisterPage />),
    },
    {
      path: "guide",
      element: withSuspense(<GuidePage />),
    },
  ],
}
