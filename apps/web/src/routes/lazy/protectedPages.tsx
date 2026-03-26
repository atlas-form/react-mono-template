import { lazy } from "react";

export const GuidePage = lazy(() => import("@/pages/protected/Guide"));
export const AboutPage = lazy(() => import("@/pages/protected/About"));
export const LogoutPage = lazy(() => import("@/pages/protected/Logout"));
