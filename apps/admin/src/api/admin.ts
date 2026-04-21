import { request } from "@workspace/services/api/base"

export interface CurrentUserMenuNode {
  id: number
  name: string
  path: string
  parent_id: number | null
  permission_code: string | null
  children: CurrentUserMenuNode[]
}

export interface CurrentUserPermissionsResponse {
  user_id: string
  role_codes: string[]
  permission_codes: string[]
}

export const getCurrentUserMenusApi = async (): Promise<CurrentUserMenuNode[]> => {
  return request<undefined, CurrentUserMenuNode[]>({
    method: "GET",
    url: "/api/admin/me/menus",
  })
}

export const getCurrentUserPermissionsApi =
  async (): Promise<CurrentUserPermissionsResponse> => {
    return request<undefined, CurrentUserPermissionsResponse>({
      method: "GET",
      url: "/api/admin/me/permissions",
    })
  }
