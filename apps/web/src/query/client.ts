import { QueryClient } from "@tanstack/react-query";
import { AppError } from "@/errors/appError";

function shouldRetry(failureCount: number, error: unknown): boolean {
	if (failureCount >= 2) return false;
	if (!(error instanceof AppError)) return true;
	if (error.kind !== "api") return true;
	if (typeof error.status !== "number") return false;
	return error.status >= 500;
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30_000,
			gcTime: 5 * 60_000,
			retry: shouldRetry,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: shouldRetry,
		},
	},
});
