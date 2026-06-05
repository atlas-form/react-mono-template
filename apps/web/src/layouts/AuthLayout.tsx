import { Outlet } from "react-router"
import { LanguageSwitch, ThemeToggle } from "@workspace/app-kit"

export default function AuthLayout() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[linear-gradient(160deg,var(--app-bg)_0%,var(--app-surface)_100%)] p-4 sm:py-6">
      <div className="pointer-events-none absolute top-16 -left-24 size-72  rounded-full bg-[color-mix(in_oklab,var(--app-active-bg)_30%,transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-72  rounded-full bg-[color-mix(in_oklab,var(--app-hover)_80%,transparent)] blur-3xl" />

      <div className="relative z-30 mx-auto flex w-full max-w-5xl shrink-0 justify-end gap-3 pb-3 sm:pb-4">
        <ThemeToggle />
        <LanguageSwitch />
      </div>

      <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
