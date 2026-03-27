import { lazy } from "react"

export const LoginPage = lazy(() => import("@/pages/public/Login"))
export const RegisterPage = lazy(() => import("@/pages/public/Register"))
export const GuidePage = lazy(() => import("@/pages/protected/Guide"))
