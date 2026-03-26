import i18n from "@workspace/services/i18n";

type AppErrorKind = "api" | "network" | "unknown";

interface AppErrorOptions {
	kind: AppErrorKind;
	code?: number | null;
	status?: number;
	cause?: unknown;
}

export class AppError extends Error {
	kind: AppErrorKind;
	code: number | null;
	status?: number;
	cause?: unknown;

	constructor(message: string, options: AppErrorOptions) {
		super(message);
		this.name = "AppError";
		this.kind = options.kind;
		this.code = options.code ?? null;
		this.status = options.status;
		this.cause = options.cause;
	}
}

interface HttpErrorLike {
	response?: {
		data?: unknown;
		status?: number;
	};
}

export function toAppError(input: unknown): AppError {
	if (input instanceof AppError) return input;

	const httpLike = input as HttpErrorLike | undefined;
	const status = httpLike?.response?.status;
	const code = extractBackendErrorCode(httpLike?.response?.data);

	if (typeof status === "number") {
		return new AppError("API request failed", {
			kind: "api",
			code,
			status,
			cause: input,
		});
	}

	if (input instanceof TypeError || input instanceof DOMException) {
		return new AppError("Network request failed", {
			kind: "network",
			cause: input,
		});
	}

	return new AppError("Unknown error", {
		kind: "unknown",
		cause: input,
	});
}

export function getAppErrorMessage(error: AppError): string {
	if (typeof error.code === "number") {
		const key = String(error.code);
		if (i18n.exists(key, { ns: "error" })) {
			return i18n.t(key, { ns: "error" });
		}
	}

	return i18n.t("default", { ns: "error" });
}

function extractBackendErrorCode(payload: unknown): number | null {
	if (!payload || typeof payload !== "object") return null;
	const data = payload as { error_code?: unknown; code?: unknown };

	if (typeof data.error_code === "number") return data.error_code;
	if (typeof data.code === "number") return data.code;

	return null;
}
