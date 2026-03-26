import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./msw/server";

const memoryStorage = (() => {
	const store = new Map<string, string>();

	return {
		getItem(key: string) {
			return store.has(key) ? store.get(key)! : null;
		},
		setItem(key: string, value: string) {
			store.set(key, value);
		},
		removeItem(key: string) {
			store.delete(key);
		},
		clear() {
			store.clear();
		},
	};
})();

Object.defineProperty(globalThis, "localStorage", {
	value: memoryStorage,
	configurable: true,
});

beforeAll(() => {
	server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
	server.resetHandlers();
	globalThis.localStorage.clear();
});

afterAll(() => {
	server.close();
});
