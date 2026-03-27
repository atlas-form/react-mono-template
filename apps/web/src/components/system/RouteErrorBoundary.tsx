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
    <div className="ui-route-error">
      <h2 className="ui-route-error-title">Page Error</h2>
      <p className="ui-route-error-message">{message}</p>
    </div>
  )
}
