import { createReactAppViteConfig } from "@workspace/vite-config/react-app"

export default createReactAppViteConfig({
  appDir: __dirname,
  apiProxyEnv: "VITE_ADMIN_API_PROXY",
  rewriteApiPath: (proxyPath) => proxyPath.replace(/^\/api/, ""),
})
