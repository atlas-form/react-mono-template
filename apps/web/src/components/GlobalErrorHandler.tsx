import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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

  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
  })
}
