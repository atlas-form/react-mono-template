/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WEB_API_URL: string;
	readonly VITE_ADMIN_API_URL: string;
	readonly VITE_AUTH_URL: string;
	readonly VITE_FILE_URL: string;
	readonly VITE_WEB_API_PROXY?: string;
	readonly VITE_ADMIN_API_PROXY?: string;
	readonly VITE_AUTH_PROXY?: string;
	readonly VITE_FILE_PROXY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
