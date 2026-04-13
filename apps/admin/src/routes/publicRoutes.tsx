import { Suspense, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import { Navigate } from "react-router"
import AuthLayout from "@/layouts/AuthLayout"
import PageLoading from "@/components/system/PageLoading"
import RouteErrorBoundary from "@/components/system/RouteErrorBoundary"
import { LoginPage } from "@/routes/lazy/publicPages"

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
  ],
}
