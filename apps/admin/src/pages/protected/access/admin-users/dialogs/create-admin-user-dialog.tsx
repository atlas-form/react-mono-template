import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { DataTableInsertActionConfig } from "@workspace/app-components"
import { AdvancedSelect, Input, Select } from "@workspace/ui-components"
import { createAdminUserApi, listUsersApi } from "@/api"

type CreateAdminUserMode = "existing-user" | "manual-user-id"

const createModeOptions = [
  { label: "已有账号", value: "existing-user" },
  { label: "手动输入 User ID", value: "manual-user-id" },
] as const

export function useCreateAdminUserInsertAction(
  invalidateAdminUsers: () => Promise<unknown>
): DataTableInsertActionConfig {
  const [createMode, setCreateMode] =
    useState<CreateAdminUserMode>("existing-user")
  const [selectedUserId, setSelectedUserId] = useState("")
  const [draftUserId, setDraftUserId] = useState("")
  const [draftDisplayName, setDraftDisplayName] = useState("")
  const [draftRemark, setDraftRemark] = useState("")

  const usersQuery = useQuery({
    queryKey: ["admin", "admin-users", "create-dialog", "users"],
    queryFn: () => listUsersApi({ page: 1, pageSize: 100 }),
  })

  const userOptions = useMemo(
    () =>
      (usersQuery.data?.items ?? []).map((user) => ({
        label: `${user.name} (${user.id})`,
        value: user.id,
      })),
    [usersQuery.data?.items]
  )

  return useMemo(
    () => ({
      label: "新增后台账号",
      title: "创建后台账号",
      description:
        "优先从已有账号中直接选择用户，不需要手动查 user_id；如无法匹配，再切换为手动输入。",
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

          {createMode === "existing-user" ? (
            <div className="grid gap-2">
              <span className="text-sm font-medium">选择已有账号</span>
              <AdvancedSelect
                value={selectedUserId}
                onValueChange={(value) => {
                  setSelectedUserId(value)
                  const selectedUser = usersQuery.data?.items.find(
                    (user) => user.id === value
                  )
                  if (selectedUser) {
                    setDraftDisplayName(selectedUser.name)
                  }
                }}
                list={userOptions}
                placeholder={
                  usersQuery.isPending
                    ? "正在加载用户列表"
                    : usersQuery.isError
                      ? "加载失败，请切换为手动输入"
                      : "选择已有用户"
                }
                disabled={usersQuery.isPending || usersQuery.isError}
                allowClear
                clearLabel="清空已选用户"
              />
              <span className="text-xs text-muted-foreground">
                适用于中心 auth 已有账号的用户，选择后会自动带出显示名称。
              </span>
            </div>
          ) : (
            <div className="grid gap-2">
              <span className="text-sm font-medium">用户 ID</span>
              <Input
                value={draftUserId}
                onValueChange={setDraftUserId}
                placeholder="输入用户 UUID"
              />
              <span className="text-xs text-muted-foreground">
                仅在无法从已有账号列表中找到用户时使用。
              </span>
            </div>
          )}

          <div className="grid gap-2">
            <span className="text-sm font-medium">显示名称</span>
            <Input
              value={draftDisplayName}
              onValueChange={setDraftDisplayName}
              placeholder="输入显示名称"
            />
          </div>

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
        const resolvedUserId =
          createMode === "existing-user"
            ? selectedUserId.trim()
            : draftUserId.trim()
        const trimmedDisplayName = draftDisplayName.trim()
        if (!resolvedUserId) {
          throw new Error(
            createMode === "existing-user"
              ? "please select an existing user"
              : "user_id is required"
          )
        }
        if (!trimmedDisplayName) {
          throw new Error("display_name is required")
        }

        await createAdminUserApi({
          user_id: resolvedUserId,
          display_name: trimmedDisplayName,
          remark: draftRemark.trim() ? draftRemark.trim() : null,
          status: "enabled",
        })

        setCreateMode("existing-user")
        setSelectedUserId("")
        setDraftUserId("")
        setDraftDisplayName("")
        setDraftRemark("")
        await invalidateAdminUsers()
      },
    }),
    [
      createMode,
      draftDisplayName,
      draftRemark,
      draftUserId,
      invalidateAdminUsers,
      selectedUserId,
      userOptions,
      usersQuery.data?.items,
      usersQuery.isError,
      usersQuery.isPending,
    ]
  )
}
