import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"
import { loadEnv } from "vite"

const RESOLVE_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".mjs",
  ".js",
  ".mts",
  ".jsx",
  ".json",
]

function createWorkspaceAliases(appDir) {
  return [
    {
      find: /^@$/,
      replacement: path.resolve(appDir, "src"),
    },
    {
      find: /^@workspace\/ui-components$/,
      replacement: path.resolve(appDir, "../../packages/ui-components/src/index.ts"),
    },
    {
      find: /^@workspace\/app-components$/,
      replacement: path.resolve(appDir, "../../packages/app-components/src/index.ts"),
    },
    {
      find: /^@workspace\/services$/,
      replacement: path.resolve(appDir, "../../packages/services/src/index.ts"),
    },
    {
      find: /^@workspace\/services\/(.+)$/,
      replacement: path.resolve(appDir, "../../packages/services/src/$1"),
    },
    {
      find: /^@workspace\/shared-i18n$/,
      replacement: path.resolve(appDir, "../../packages/shared-i18n/src/index.ts"),
    },
    {
      find: /^react-router$/,
      replacement: path.resolve(appDir, "node_modules/react-router"),
    },
    {
      find: "@/",
      replacement: `${path.resolve(appDir, "src")}/`,
    },
  ]
}

function createManualChunkName(id) {
  if (!id.includes("node_modules")) return undefined

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
}

function createServerProxy(env, { apiProxyEnv, rewriteApiPath }) {
  return {
    "/api": {
      target: env[apiProxyEnv],
      changeOrigin: true,
      ws: false,
      ...(rewriteApiPath ? { rewrite: rewriteApiPath } : {}),
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
  }
}

export function createReactAppViteConfig({
  appDir,
  apiProxyEnv,
  rewriteApiPath,
  testSetupFiles = ["./src/test/setup.ts"],
} = {}) {
  return defineConfig(({ mode }) => {
    const envDir = process.env.FRONTEND_ENV_DIR ?? path.resolve(appDir, "../../")
    const env = loadEnv(mode, envDir, "")
    const isMockMode = env.VITE_ENABLE_MOCK === "true"

    return {
      envDir,
      plugins: [react(), tailwindcss()],
      resolve: {
        extensions: RESOLVE_EXTENSIONS,
        alias: createWorkspaceAliases(appDir),
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              return createManualChunkName(id)
            },
          },
        },
      },
      test: {
        environment: "jsdom",
        globals: true,
        setupFiles: testSetupFiles,
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
          : createServerProxy(env, { apiProxyEnv, rewriteApiPath }),
      },
    }
  })
}
