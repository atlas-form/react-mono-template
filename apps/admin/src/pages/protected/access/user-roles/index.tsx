import { Badge } from "@workspace/ui-components/stable/badge"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { adminUsers, roles } from "../_shared/rbac-shared"

export default function UserRolesPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardHeader>
          <Badge variant="outline">User Roles</Badge>
          <CardTitle>用户角色</CardTitle>
          <CardDescription>
            页面只处理 `user_roles` 关系，把“人”和“角色”的绑定单独拆出来。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adminUsers.map((user) => (
              <div
                key={user.id}
                className="rounded-[var(--ui-radius-lg)] border border-(--app-border) px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-(--app-muted-text)">{user.email}</p>
                  </div>
                  <Badge variant={user.status === "启用" ? "default" : "outline"}>
                    {user.status}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <CardTitle>可分配角色</CardTitle>
              <CardDescription>
                从角色库中选择后分配给指定后台账号，避免在账号页里承担过多交互。
              </CardDescription>
            </div>
            <Button variant="primary">保存用户角色</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className="rounded-[var(--ui-radius-lg)] border border-(--app-border) px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="mt-1 text-sm text-(--app-muted-text)">
                      {role.description}
                    </p>
                  </div>
                  <Badge variant="outline">{role.scope}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-(--app-muted-text)">
                  <span>编码：{role.code}</span>
                  <span>{role.userCount} 个用户</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
