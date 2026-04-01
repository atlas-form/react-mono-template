import { defineConfig } from "vitest/config"
import { loadEnv } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig(({ mode }) => {
  const envDir =
    process.env.FRONTEND_ENV_DIR ?? path.resolve(__dirname, "../../")
  const env = loadEnv(mode, envDir, "")

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return

            if (id.includes("react-toastify")) return "vendor-toast"
            if (id.includes("@tanstack/react-query")) return "vendor-query"
            if (
              id.includes("i18next") ||
              id.includes("react-i18next") ||
              id.includes("i18next-browser-languagedetector") ||
              id.includes("i18next-http-backend")
            ) {
              return "vendor-i18n"
            }
            if (
              id.includes("@reduxjs/toolkit") ||
              id.includes("react-redux") ||
              id.includes("redux")
            ) {
              return "vendor-redux"
            }
            if (id.includes("react-router")) return "vendor-router"
            if (id.includes("react") || id.includes("scheduler"))
              return "vendor-react"

            return "vendor-misc"
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
      css: true,
      server: {
        deps: {
          inline: ["@atlas-art/ui-react", "@atlas-art/ui-core"],
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_WEB_API_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          ws: false,
        },
        "/auth": {
          target: env.VITE_AUTH_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, ""),
          ws: false,
        },
        "/file": {
          target: env.VITE_FILE_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/file/, ""),
          ws: false,
        },
      },
    },
  }
})
