import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const envDir =
    process.env.FRONTEND_ENV_DIR ??
    path.resolve(__dirname, "../../")
  const env = loadEnv(mode, envDir, "")

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    server: {
      port: 5174,
      proxy: {
        "/api": {
          target: env.VITE_ADMIN_API_PROXY,
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
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
