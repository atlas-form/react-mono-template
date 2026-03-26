import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAppErrorMessage, toAppError, type AppError } from "@/errors/appError";

export function showGlobalError(error: string | AppError | unknown) {
	const message =
		typeof error === "string" ? error : getAppErrorMessage(toAppError(error));

	toast.error(message, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
	});
}
