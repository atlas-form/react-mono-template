import { createReactAppViteConfig } from "@workspace/vite-config/react-app"

export default createReactAppViteConfig({
  appDir: __dirname,
  apiProxyEnv: "VITE_WEB_API_PROXY",
})
