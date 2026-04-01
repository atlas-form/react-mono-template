import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  toAppError,
  type AppError,
} from "@workspace/services/errors/app-error"
import { getAppErrorMessage } from "@workspace/services/errors/error-message"

export function showGlobalError(error: string | AppError | unknown) {
  const message =
    typeof error === "string" ? error : getAppErrorMessage(toAppError(error))

  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
  })
}
