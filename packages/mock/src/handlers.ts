import { http, HttpResponse } from "msw"

interface MockUserState {
  id: string
  username: string
  displayName: string
  email: string
  avatar: string
  emailVerified: boolean
  disabled: boolean
}

interface MockFileRecord {
  key: string
  kind: "avatar" | "image" | "document"
}

const authTokens = {
  accessToken: "test-access-token",
  refreshToken: "test-refresh-token",
}

let currentUser: MockUserState = {
  id: "u_mock_1001",
  username: "tester",
  displayName: "Tester",
  email: "tester@example.com",
  avatar: "",
  emailVerified: true,
  disabled: false,
}

const uploadedFiles = new Map<string, MockFileRecord>()

function success<T>(data: T) {
  return HttpResponse.json({
    code: 0,
    message: "ok",
    data,
  })
}

function createSignedUpload(
  kind: MockFileRecord["kind"],
  ext = "bin"
): {
  method: "PUT"
  upload_url: string
  key: string
  headers: {
    authorization: string
    "x-amz-date": string
    "x-amz-content-sha256": string
  }
} {
  const safeExt = ext.replace(/^\./, "") || "bin"
  const key = `${kind}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  uploadedFiles.set(key, { key, kind })

  return {
    method: "PUT",
    upload_url: `https://mock-storage.local/upload/${encodeURIComponent(key)}`,
    key,
    headers: {
      authorization: "MOCK_AUTH",
      "x-amz-date": "20260101T000000Z",
      "x-amz-content-sha256": "MOCK_SHA256",
    },
  }
}

export const handlers = [
  http.post("*/auth/session/login", async () => {
    return success(authTokens)
  }),

  http.post("*/auth/session/register", async () => {
    return success(null)
  }),

  http.post("*/auth/session/refresh_token", async () => {
    return success({
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
    })
  }),

  http.get("*/auth/user/me", async () => {
    return success({
      display_user_id: currentUser.id,
      username: currentUser.username,
      display_name: currentUser.displayName,
      avatar: currentUser.avatar,
      email: currentUser.email,
      email_verified: currentUser.emailVerified,
      disabled: currentUser.disabled,
    })
  }),

  http.put("*/auth/user/profile", async ({ request }) => {
    const body = (await request.json()) as {
      display_name?: string | null
      avatar?: string | null
    }

    if (typeof body.display_name === "string") {
      currentUser.displayName = body.display_name
    }

    if (typeof body.avatar === "string") {
      currentUser.avatar = body.avatar
    }

    return success(null)
  }),

  http.put("*/auth/user/email", async ({ request }) => {
    const body = (await request.json()) as {
      email?: string | null
    }

    currentUser.email = body.email ?? ""
    currentUser.emailVerified = false

    return success(null)
  }),

  http.put("*/auth/user/password", async () => {
    return success(null)
  }),

  http.post("*/auth/user/email/verify", async () => {
    currentUser.emailVerified = true
    return success(null)
  }),

  http.get("*/file/sign/upload/avatar", async () => {
    return success(createSignedUpload("avatar", "png"))
  }),

  http.get("*/file/sign/upload/image", async ({ request }) => {
    const url = new URL(request.url)
    const ext = url.searchParams.get("ext") ?? "png"

    return success(createSignedUpload("image", ext))
  }),

  http.get("*/file/sign/upload/document", async ({ request }) => {
    const url = new URL(request.url)
    const ext = url.searchParams.get("ext") ?? "pdf"

    return success(createSignedUpload("document", ext))
  }),

  http.get("*/file/sign/access", async ({ request }) => {
    const url = new URL(request.url)
    const key = url.searchParams.get("key") ?? ""

    return success({
      method: "GET",
      download_url: `https://mock-storage.local/download/${encodeURIComponent(key)}`,
      key,
    })
  }),

  http.get("*/file/sign/delete", async ({ request }) => {
    const url = new URL(request.url)
    const key = url.searchParams.get("key") ?? ""

    return success({
      method: "DELETE",
      delete_url: `https://mock-storage.local/delete/${encodeURIComponent(key)}`,
      key,
      headers: {
        authorization: "MOCK_AUTH",
        "x-amz-date": "20260101T000000Z",
        "x-amz-content-sha256": "MOCK_SHA256",
      },
    })
  }),

  http.put("https://mock-storage.local/upload/:key", async () => {
    return new HttpResponse(null, { status: 200 })
  }),

  http.delete("https://mock-storage.local/delete/:key", async ({ params }) => {
    const key = decodeURIComponent(String(params.key ?? ""))
    uploadedFiles.delete(key)

    return new HttpResponse(null, { status: 200 })
  }),

  http.get("https://mock-storage.local/download/:key", async ({ params }) => {
    const key = decodeURIComponent(String(params.key ?? ""))
    const record = uploadedFiles.get(key)

    if (!record) {
      return new HttpResponse("Not Found", { status: 404 })
    }

    return HttpResponse.json({
      key: record.key,
      kind: record.kind,
      message: "mock download resource",
    })
  }),
]
