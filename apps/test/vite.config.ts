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
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@workspace/ui-icon": path.resolve(
        __dirname,
        "../../packages/ui-icon/src/index.ts"
      ),
    },
  },
})
