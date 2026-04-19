import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import "./index.css"
import "@workspace/services/i18n"
import { queryClient } from "@workspace/services/query/client"
import App from "./App.tsx"
import { initTheme } from "@workspace/ui-theme"
import { getEnv } from "@/config/env"
import { applyThemeOverrides, loadThemeOverrides } from "@/theme/themeOverrides"

async function bootstrap() {
  const rootElement = document.getElementById("root")
  if (!rootElement) throw new Error("Root element #root not found")

  const env = getEnv()

  if (env.VITE_ENABLE_MOCK === "true") {
    const { startMocking } = await import("@workspace/mock/browser")
    await startMocking()
  }

  initTheme()
  const themeOverrides = loadThemeOverrides()
  if (themeOverrides) {
    applyThemeOverrides(themeOverrides)
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
}

void bootstrap()
