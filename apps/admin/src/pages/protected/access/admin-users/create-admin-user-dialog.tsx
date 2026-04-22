import { useMemo, useState } from "react"
import { Input } from "@workspace/ui-components"
import type { DataTableInsertActionConfig } from "@workspace/app-components"
import { createAdminUserApi } from "@/api"
import { adminUsersQueryKey } from "./constants"

export function useCreateAdminUserInsertAction(
  invalidateAdminUsers: () => Promise<unknown>
): DataTableInsertActionConfig {
  const [draftUserId, setDraftUserId] = useState("")
  const [draftDisplayName, setDraftDisplayName] = useState("")
  const [draftRemark, setDraftRemark] = useState("")

  return useMemo(
    () => ({
      label: "新增后台账号",
      title: "创建后台账号",
      description:
        "当前服务端要求传入 user_id、display_name，remark 可选，状态默认创建为启用。",
      renderContent: () => (
        <div className="grid gap-4 py-2">
          <Input
            value={draftUserId}
            onValueChange={setDraftUserId}
            placeholder="输入用户 UUID"
          />
          <Input
            value={draftDisplayName}
            onValueChange={setDraftDisplayName}
            placeholder="输入显示名称"
          />
          <Input
            value={draftRemark}
            onValueChange={setDraftRemark}
            placeholder="输入备注（可选）"
          />
        </div>
      ),
      onConfirm: async () => {
        const trimmedUserId = draftUserId.trim()
        const trimmedDisplayName = draftDisplayName.trim()
        if (!trimmedUserId) {
          throw new Error("user_id is required")
        }
        if (!trimmedDisplayName) {
          throw new Error("display_name is required")
        }

        await createAdminUserApi({
          user_id: trimmedUserId,
          display_name: trimmedDisplayName,
          remark: draftRemark.trim() ? draftRemark.trim() : null,
          status: "enabled",
        })

        setDraftUserId("")
        setDraftDisplayName("")
        setDraftRemark("")
        await invalidateAdminUsers()
      },
    }),
    [draftDisplayName, draftRemark, draftUserId, invalidateAdminUsers]
  )
}

export async function invalidateAdminUsersQuery(
  invalidateQueries: (params: {
    queryKey: typeof adminUsersQueryKey
  }) => Promise<unknown>
) {
  return invalidateQueries({
    queryKey: adminUsersQueryKey,
  })
}
