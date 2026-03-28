import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@workspace/ui-core/styles.css"
import "@workspace/ui-theme/styles.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
