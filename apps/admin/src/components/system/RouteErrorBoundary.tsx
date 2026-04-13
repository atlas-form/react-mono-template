import { isRouteErrorResponse, useRouteError } from "react-router"

export default function RouteErrorBoundary() {
  const error = useRouteError()

  const message = (() => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText || "Route error"}`
    }
    if (error instanceof Error && error.message) {
      return error.message
    }
    return "Unexpected page error"
  })()

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-2xl items-center justify-center px-4 py-12">
      <div className="w-full rounded-2xl border border-(--app-border) bg-(--app-surface) p-6 shadow-[var(--ui-shadow-soft)]">
        <h2 className="text-xl font-semibold text-(--app-text)">Page Error</h2>
        <p className="mt-3 text-sm text-(--app-muted-text)">{message}</p>
      </div>
    </div>
  )
}
