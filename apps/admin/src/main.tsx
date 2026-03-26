import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { setAppApiBaseUrl, setPlatformBaseUrls } from "@workspace/services/url"

import "@workspace/ui-core/globals.css"
import "@workspace/ui-theme/light.css"
import "@workspace/ui-theme/dark.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { getEnv } from "@/config/env.ts"

const env = getEnv()
setPlatformBaseUrls({
  auth: env.VITE_AUTH_URL,
  file: env.VITE_FILE_URL,
})
setAppApiBaseUrl(env.VITE_ADMIN_API_URL)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
