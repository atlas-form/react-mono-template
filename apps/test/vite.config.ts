import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5175,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".mts", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@workspace/shared-i18n": path.resolve(
        __dirname,
        "../../packages/shared-i18n/src/index.ts"
      ),
      "@workspace/ui-icon": path.resolve(
        __dirname,
        "../../packages/ui-icon/src/index.ts"
      ),
    },
  },
})
