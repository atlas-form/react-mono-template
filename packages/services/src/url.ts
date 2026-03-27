interface BaseUrls {
  api: string
  auth: string
  file: string
}

interface PlatformBaseUrls {
  auth: string
  file: string
}

let appApiBaseUrl: string | null = null
let platformBaseUrls: PlatformBaseUrls | null = null

export type UrlGroup = keyof BaseUrls

export function setBaseUrls(urls: BaseUrls): void {
  setAppApiBaseUrl(urls.api)
  setPlatformBaseUrls({
    auth: urls.auth,
    file: urls.file,
  })
}

export function setAppApiBaseUrl(api: string): void {
  appApiBaseUrl = api
}

export function setPlatformBaseUrls(urls: PlatformBaseUrls): void {
  platformBaseUrls = urls
}

export function resolveUrl(url: string, group: UrlGroup = "api"): string {
  const isAbsolute = /^https?:\/\//.test(url)
  if (isAbsolute) return url

  if (!platformBaseUrls) {
    throw new Error("[resolveUrl] Platform base URLs are not initialized")
  }

  if (group === "api") {
    if (!appApiBaseUrl) {
      throw new Error("[resolveUrl] App API base URL is not initialized")
    }
    return joinUrl(appApiBaseUrl, url)
  }

  const base = platformBaseUrls[group]
  if (!base) {
    throw new Error(`[resolveUrl] Unknown URL group: '${group}'`)
  }

  return joinUrl(base, url)
}

function joinUrl(base: string, path: string): string {
  if (!base) return path
  if (!path) return base

  const baseEndsWithSlash = base.endsWith("/")
  const pathStartsWithSlash = path.startsWith("/")

  if (baseEndsWithSlash && pathStartsWithSlash) {
    return `${base.slice(0, -1)}${path}`
  }
  if (!baseEndsWithSlash && !pathStartsWithSlash) {
    return `${base}/${path}`
  }
  return `${base}${path}`
}
