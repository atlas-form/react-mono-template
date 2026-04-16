import { defineConfig } from "vitest/config"
import { loadEnv } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig(({ mode }) => {
  const envDir =
    process.env.FRONTEND_ENV_DIR ?? path.resolve(__dirname, "../../")
  const env = loadEnv(mode, envDir, "")
  const isMockMode = env.VITE_ENABLE_MOCK === "true"

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    resolve: {
      extensions: [".ts", ".tsx", ".mjs", ".js", ".mts", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return

            if (
              id.includes("/node_modules/react/") ||
              id.includes("/node_modules/react-dom/") ||
              id.includes("/node_modules/scheduler/")
            ) {
              return "vendor-react-core"
            }

            if (id.includes("sonner")) return "vendor-toast"
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
            if (
              id.includes("@radix-ui/") ||
              id.includes("@floating-ui/") ||
              id.includes("@base-ui/") ||
              id.includes("input-otp") ||
              id.includes("cmdk") ||
              id.includes("embla-carousel") ||
              id.includes("vaul") ||
              id.includes("lucide-react")
            ) {
              return "vendor-ui"
            }
            if (
              id.includes("react-hook-form") ||
              id.includes("@hookform/resolvers") ||
              id.includes("zod")
            ) {
              return "vendor-forms"
            }
            if (id.includes("react")) return "vendor-react-ecosystem"

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
          inline: [],
        },
      },
    },
    server: {
      proxy: isMockMode
        ? undefined
        : {
            "/api": {
              target: env.VITE_WEB_API_PROXY,
              changeOrigin: true,
              ws: false,
            },
            "/auth": {
              target: env.VITE_AUTH_PROXY,
              changeOrigin: true,
              ws: false,
            },
            "/file": {
              target: env.VITE_FILE_PROXY,
              changeOrigin: true,
              ws: false,
            },
          },
    },
  }
})
