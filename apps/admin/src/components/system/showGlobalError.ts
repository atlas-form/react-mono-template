import { toast } from "@workspace/ui-components/stable/toast"
import {
  toRequestError,
  type RequestError,
} from "@workspace/services/errors/request-error"
import { getRequestErrorMessage } from "@workspace/services/errors/error-message"

export function showGlobalError(error: string | RequestError | unknown) {
  const message =
    typeof error === "string"
      ? error
      : getRequestErrorMessage(toRequestError(error))

  toast.error(message)
}
