import { isRouteErrorResponse, useRouteError } from "react-router"
import { PageErrorState } from "@workspace/app-components"

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

  return <PageErrorState message={message} />
}
