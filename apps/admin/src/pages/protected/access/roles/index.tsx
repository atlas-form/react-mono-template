import { Badge } from "@workspace/ui-components/stable/badge"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components/stable/table"
import { roles } from "../_shared/rbac-shared"

export default function RolesPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge variant="outline">Roles</Badge>
              <CardTitle>角色</CardTitle>
              <CardDescription>
                对应 `roles` 表，只维护角色定义与基础说明，不把授权树塞进这个页面。
              </CardDescription>
            </div>
            <Button variant="primary">新增角色</Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-sm text-(--app-muted-text)">{role.description}</p>
                  </div>
                  <Badge variant="outline">{role.scope}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-[var(--ui-radius-md)] border border-(--app-border) p-3">
                    <p className="text-(--app-muted-text)">用户数</p>
                    <p className="mt-1 text-xl font-semibold">{role.userCount}</p>
                  </div>
                  <div className="rounded-[var(--ui-radius-md)] border border-(--app-border) p-3">
                    <p className="text-(--app-muted-text)">权限数</p>
                    <p className="mt-1 text-xl font-semibold">{role.permissionCount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>角色定义列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table ariaLabel="roles">
            <TableHeader>
              <TableRow>
                <TableHead>角色名</TableHead>
                <TableHead>编码</TableHead>
                <TableHead>作用域</TableHead>
                <TableHead>用户数</TableHead>
                <TableHead>权限数</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.code}</TableCell>
                  <TableCell>{role.scope}</TableCell>
                  <TableCell>{role.userCount}</TableCell>
                  <TableCell>{role.permissionCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
