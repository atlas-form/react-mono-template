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
import { menuTree } from "../_shared/rbac-shared"

const menuRows = menuTree.flatMap((menu) => [
  menu,
  ...(menu.children ?? []),
])

export default function MenusPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge variant="outline">Menus</Badge>
              <CardTitle>菜单配置</CardTitle>
              <CardDescription>
                对应 `menus` 表，用来维护一级分组和二级页面入口的映射关系。
              </CardDescription>
            </div>
            <Button variant="primary">新增菜单节点</Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>菜单结构</CardTitle>
          <CardDescription>
            这里明确一级菜单只做分组，真正可访问的页面入口全部落在二级菜单。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table ariaLabel="menu configuration">
            <TableHeader>
              <TableRow>
                <TableHead>层级</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>路径</TableHead>
                <TableHead>权限码</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuRows.map((menu) => (
                <TableRow key={menu.id}>
                  <TableCell>
                    <Badge variant="outline">{menu.level === 1 ? "一级" : "二级"}</Badge>
                  </TableCell>
                  <TableCell>{menu.name}</TableCell>
                  <TableCell>{menu.path}</TableCell>
                  <TableCell>{menu.permissionCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
