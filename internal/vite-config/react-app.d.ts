import type { ProxyOptions, UserConfigExport } from "vite"

export interface CreateReactAppViteConfigOptions {
  appDir: string
  apiProxyEnv: string
  rewriteApiPath?: ProxyOptions["rewrite"]
  testSetupFiles?: string[]
}

export function createReactAppViteConfig(
  options: CreateReactAppViteConfigOptions
): UserConfigExport
