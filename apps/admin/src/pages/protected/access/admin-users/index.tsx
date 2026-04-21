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
import { adminUsers } from "../_shared/rbac-shared"

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge variant="outline">Admin Users</Badge>
              <CardTitle>后台账号</CardTitle>
              <CardDescription>
                只处理后台可登录用户本身，不在这里直接分配权限，保持页面职责单一。
              </CardDescription>
            </div>
            <Button variant="primary">新增后台账号</Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>账号列表</CardTitle>
          <CardDescription>
            对应 `admin_users` 表，展示状态、最近登录和已绑定角色概况。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table ariaLabel="admin users">
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>最近登录</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-(--app-muted-text)">{user.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "启用" ? "default" : "outline"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.roles.join(" / ")}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
