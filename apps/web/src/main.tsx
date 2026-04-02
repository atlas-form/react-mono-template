import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { QueryClientProvider } from "@tanstack/react-query"
import { store } from "./store"
import "./index.css"
import "@workspace/services/i18n"
import { queryClient } from "@workspace/services/query/client"
import { setAppApiBaseUrl, setPlatformBaseUrls } from "@workspace/services/url"
import App from "./App"
import { initTheme } from "@workspace/ui-theme"
import { getEnv } from "@/config/env"

async function bootstrap() {
  const rootElement = document.getElementById("root")
  if (!rootElement) throw new Error("Root element #root not found")

  const env = getEnv()

  setPlatformBaseUrls({
    auth: env.VITE_AUTH_URL,
    file: env.VITE_FILE_URL,
  })
  setAppApiBaseUrl(env.VITE_WEB_API_URL)

  if (env.VITE_ENABLE_MOCK === "true") {
    const { startMocking } = await import("@workspace/mock/browser")
    await startMocking()
  }

  initTheme()

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </StrictMode>
  )
}

void bootstrap()
