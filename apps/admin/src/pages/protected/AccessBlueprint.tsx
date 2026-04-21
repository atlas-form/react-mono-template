import { Badge } from "@workspace/ui-components/stable/badge"
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
import { permissionResourceTree, flattenPermissionResources } from "./accessShared"

const resourceRows = flattenPermissionResources(permissionResourceTree)

const controlRows = [
  {
    type: "menu",
    backend: "menus",
    codeRule: "menu.<一级> 或 menu.<一级>.<二级>",
    note: "二级菜单必须保留 parent_code / parent_id，用来渲染侧边导航和路由守卫。",
  },
  {
    type: "button",
    backend: "permissions",
    codeRule: "button.<页面>.<动作>",
    note: "前端拿到角色权限码后，直接对按钮做显隐或禁用控制。",
  },
  {
    type: "api",
    backend: "permissions",
    codeRule: "api.<method>.<resource>",
    note: "接口层做最终授权，避免只靠前端拦截。",
  },
]

export default function AccessBlueprintPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Badge variant="outline">Blueprint</Badge>
          <CardTitle>权限资源编码说明</CardTitle>
          <CardDescription>
            针对你现在的 Rust admin 设计，推荐把 role_permission 配成统一资源编码，再按资源类型区分菜单、按钮、API。
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>建议的数据模型</CardTitle>
            <CardDescription>沿用现有表结构即可落地，必要时只补资源类型和父子关系字段。</CardDescription>
          </CardHeader>
          <CardContent>
            <Table ariaLabel="permission control model">
              <TableHeader>
                <TableRow>
                  <TableHead>控制对象</TableHead>
                  <TableHead>落表建议</TableHead>
                  <TableHead>编码规则</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {controlRows.map((row) => (
                  <TableRow key={row.type}>
                    <TableCell>
                      <div className="font-medium">{row.type}</div>
                      <div className="text-xs text-(--app-muted-text)">
                        {row.note}
                      </div>
                    </TableCell>
                    <TableCell>{row.backend}</TableCell>
                    <TableCell>{row.codeRule}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>当前页面示例资源</CardTitle>
            <CardDescription>
              把“系统管理 / 角色权限配置”明确拆成一级菜单和二级菜单，后续角色分配时就能独立控制。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table ariaLabel="permission resource examples">
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>编码</TableHead>
                  <TableHead>类型</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourceRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="font-medium">{row.name}</div>
                      <div className="text-xs text-(--app-muted-text)">
                        {row.path ?? row.description}
                      </div>
                    </TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
