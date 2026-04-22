import { useMemo, useState } from "react"
import type { DataTableInsertActionConfig } from "@workspace/app-components"
import { Input, Select } from "@workspace/ui-components"
import {
  createAdminUserApi,
  getAuthUserProfileApi,
  loginApi,
  registerApi,
} from "@/api"

type CreateAdminUserMode = "existing-account" | "new-account"

const createModeOptions = [
  { label: "已有账号转后台账号", value: "existing-account" },
  { label: "新建账号并创建后台账号", value: "new-account" },
] as const

export function useCreateAdminUserInsertAction(
  invalidateAdminUsers: () => Promise<unknown>
): DataTableInsertActionConfig {
  const [createMode, setCreateMode] =
    useState<CreateAdminUserMode>("existing-account")
  const [existingIdentifier, setExistingIdentifier] = useState("")
  const [existingPassword, setExistingPassword] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newDisplayName, setNewDisplayName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [draftDisplayName, setDraftDisplayName] = useState("")
  const [draftRemark, setDraftRemark] = useState("")

  return useMemo(
    () => ({
      label: "新增后台账号",
      title: "创建后台账号",
      description:
        "支持两种方式：使用已有 auth 账号转为后台账号，或先注册新账号，再立即创建后台账号。",
      renderContent: () => (
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <span className="text-sm font-medium">创建方式</span>
            <Select
              value={createMode}
              onValueChange={(value) =>
                setCreateMode(value as CreateAdminUserMode)
              }
              list={createModeOptions.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
            />
          </div>

          {createMode === "existing-account" ? (
            <>
              <div className="grid gap-2">
                <span className="text-sm font-medium">账号</span>
                <Input
                  value={existingIdentifier}
                  onValueChange={setExistingIdentifier}
                  placeholder="输入用户名或邮箱"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">密码</span>
                <Input
                  value={existingPassword}
                  onValueChange={setExistingPassword}
                  placeholder="输入账号密码"
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">
                  显示名称（留空则使用 auth 资料）
                </span>
                <Input
                  value={draftDisplayName}
                  onValueChange={setDraftDisplayName}
                  placeholder="输入显示名称"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <span className="text-sm font-medium">用户名</span>
                <Input
                  value={newUsername}
                  onValueChange={setNewUsername}
                  placeholder="输入新用户名"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">密码</span>
                <Input
                  value={newPassword}
                  onValueChange={setNewPassword}
                  placeholder="输入初始密码"
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">显示名称</span>
                <Input
                  value={newDisplayName}
                  onValueChange={setNewDisplayName}
                  placeholder="输入显示名称"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">邮箱（可选）</span>
                <Input
                  value={newEmail}
                  onValueChange={setNewEmail}
                  placeholder="输入邮箱"
                  type="email"
                />
              </div>
            </>
          )}

          <div className="grid gap-2">
            <span className="text-sm font-medium">备注</span>
            <Input
              value={draftRemark}
              onValueChange={setDraftRemark}
              placeholder="输入备注（可选）"
            />
          </div>
        </div>
      ),
      onConfirm: async () => {
        const trimmedRemark = draftRemark.trim()

        if (createMode === "existing-account") {
          const identifier = existingIdentifier.trim()
          const password = existingPassword.trim()
          const manualDisplayName = draftDisplayName.trim()

          if (!identifier) {
            throw new Error("identifier is required")
          }
          if (!password) {
            throw new Error("password is required")
          }

          const loginResponse = await loginApi({
            identifier,
            password,
          })
          const authUser = await getAuthUserProfileApi(loginResponse.accessToken)
          const userId = authUser.id.trim()
          const resolvedDisplayName =
            manualDisplayName || authUser.display_name?.trim() || authUser.username

          if (!userId) {
            throw new Error("id is required")
          }
          if (!resolvedDisplayName) {
            throw new Error("display_name is required")
          }

          await createAdminUserApi({
            user_id: userId,
            display_name: resolvedDisplayName,
            remark: trimmedRemark || null,
            status: "enabled",
          })
        } else {
          const username = newUsername.trim()
          const password = newPassword.trim()
          const displayName = newDisplayName.trim()
          const email = newEmail.trim()

          if (!username) {
            throw new Error("username is required")
          }
          if (!password) {
            throw new Error("password is required")
          }
          if (!displayName) {
            throw new Error("display_name is required")
          }

          await registerApi({
            username,
            password,
            display_name: displayName,
            email: email || undefined,
          })

          const loginResponse = await loginApi({
            identifier: username,
            password,
          })
          const authUser = await getAuthUserProfileApi(loginResponse.accessToken)
          const userId = authUser.id.trim()

          if (!userId) {
            throw new Error("id is required")
          }

          await createAdminUserApi({
            user_id: userId,
            display_name: displayName,
            remark: trimmedRemark || null,
            status: "enabled",
          })
        }

        setCreateMode("existing-account")
        setExistingIdentifier("")
        setExistingPassword("")
        setNewUsername("")
        setNewPassword("")
        setNewDisplayName("")
        setNewEmail("")
        setDraftDisplayName("")
        setDraftRemark("")
        await invalidateAdminUsers()
      },
    }),
    [
      createMode,
      draftDisplayName,
      draftRemark,
      existingIdentifier,
      existingPassword,
      invalidateAdminUsers,
      newDisplayName,
      newEmail,
      newPassword,
      newUsername,
    ]
  )
}
