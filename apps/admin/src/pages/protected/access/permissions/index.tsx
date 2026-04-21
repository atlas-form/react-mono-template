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
import {
  flattenPermissionTree,
  permissionTree,
} from "../_shared/rbac-shared"

const permissions = flattenPermissionTree(permissionTree)

export default function PermissionsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge variant="outline">Permissions</Badge>
              <CardTitle>权限资源</CardTitle>
              <CardDescription>
                对应 `permissions` 表，负责维护权限码、层级关系和资源语义。
              </CardDescription>
            </div>
            <Button variant="primary">新增权限项</Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>权限资源清单</CardTitle>
          <CardDescription>
            页面只做资源定义，真正给角色分配权限放到“角色授权”页面处理。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table ariaLabel="permission resources">
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>编码</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>路径</TableHead>
                <TableHead>说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{permission.kind}</Badge>
                  </TableCell>
                  <TableCell>{permission.path ?? "-"}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
