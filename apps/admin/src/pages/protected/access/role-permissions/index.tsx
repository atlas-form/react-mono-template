import { useMemo, useState } from "react"
import { ShieldCheck, SquareMousePointer, Waypoints } from "lucide-react"
import { TreeView, type TreeNode } from "@workspace/ui-components"
import { Badge } from "@workspace/ui-components/stable/badge"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Input } from "@workspace/ui-components/stable/input"
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
  rolePermissionPresetMap,
  roles,
  type PermissionNode,
} from "../_shared/rbac-shared"

type ResourceSummaryType = "group" | "action" | "menu" | "api"

const kindLabelMap: Record<ResourceSummaryType, string> = {
  group: "分组",
  action: "操作",
  menu: "菜单",
  api: "API",
}

function toTreeNode(node: PermissionNode): TreeNode {
  return {
    id: node.id,
    label: node.name,
    searchText: `${node.name} ${node.code} ${node.description} ${node.path ?? ""}`,
    children: node.children?.map((child) => toTreeNode(child)),
  }
}

export default function RolePermissionsPage() {
  const [activeRoleId, setActiveRoleId] = useState(roles[0]?.id ?? "")
  const [searchValue, setSearchValue] = useState("")
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    rolePermissionPresetMap[roles[0]?.id ?? ""] ?? [],
  )

  const activeRole = roles.find((role) => role.id === activeRoleId) ?? roles[0]

  const flatPermissions = useMemo(() => flattenPermissionTree(permissionTree), [])
  const selectedResources = useMemo(
    () =>
      selectedPermissionIds
        .map((id) => flatPermissions.find((permission) => permission.id === id))
        .filter((permission): permission is PermissionNode => Boolean(permission)),
    [flatPermissions, selectedPermissionIds],
  )

  const resourceTree = useMemo<TreeNode[]>(
    () => permissionTree.map((node) => toTreeNode(node)),
    [],
  )

  const summary = useMemo(() => {
    const counts: Record<ResourceSummaryType, number> = {
      group: 0,
      action: 0,
      menu: 0,
      api: 0,
    }

    for (const resource of selectedResources) {
      counts[resource.kind] += 1
    }

    return counts
  }, [selectedResources])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Badge variant="outline">Role Permissions</Badge>
          <CardTitle>角色授权</CardTitle>
          <CardDescription>
            页面只处理 `role_permissions` 关系，把“角色定义”和“权限资源定义”拆到独立页面。
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>角色列表</CardTitle>
            <CardDescription>选择一个角色后，在右侧配置权限覆盖集。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roles.map((role) => {
                const active = role.id === activeRoleId

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setActiveRoleId(role.id)
                      setSelectedPermissionIds(
                        rolePermissionPresetMap[role.id] ?? [],
                      )
                    }}
                    className={`w-full rounded-[var(--ui-radius-lg)] border px-4 py-3 text-left transition ${
                      active
                        ? "border-(--app-accent) bg-(--app-active-bg)"
                        : "border-(--app-border) bg-(--app-panel)"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{role.name}</p>
                        <p className="mt-1 text-sm text-(--app-muted-text)">
                          {role.description}
                        </p>
                      </div>
                      <Badge variant={active ? "default" : "outline"}>
                        {role.userCount} 人
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-(--app-muted-text)">
                      <span>编码：{role.code}</span>
                      <span>范围：{role.scope}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <CardTitle>{activeRole?.name}</CardTitle>
                <CardDescription>
                  统一用权限树维护菜单分组、操作码和接口能力。
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">恢复预设</Button>
                <Button variant="primary">保存角色授权</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                <Input
                  value={searchValue}
                  onValueChange={setSearchValue}
                  placeholder="搜索权限名称、编码或接口路径"
                />
                <div className="flex items-center gap-2 text-sm text-(--app-muted-text)">
                  <ShieldCheck className="size-4" />
                  已选择 {selectedPermissionIds.length} 项
                </div>
              </div>

              <div className="rounded-[var(--ui-radius-lg)] border border-(--app-border) p-3">
                <TreeView
                  data={resourceTree}
                  value={selectedPermissionIds}
                  onValueChange={setSelectedPermissionIds}
                  defaultExpandedIds={["perm-admin-user", "perm-admin-access"]}
                  searchValue={searchValue}
                  maxHeight={540}
                  emptyLabel="没有匹配到权限项。"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>授权摘要</CardTitle>
              <CardDescription>
                用于快速确认当前角色拿到了哪些类型的能力。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    icon: <ShieldCheck className="size-4" />,
                    label: "分组",
                    value: summary.group,
                  },
                  {
                    icon: <SquareMousePointer className="size-4" />,
                    label: "操作",
                    value: summary.action,
                  },
                  {
                    icon: <Waypoints className="size-4" />,
                    label: "API",
                    value: summary.api,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-[var(--ui-radius-lg)] border border-(--app-border) px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-(--app-active-bg)">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-lg font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>本次勾选明细</CardTitle>
            </CardHeader>
            <CardContent>
              <Table ariaLabel="selected permissions">
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead>类型</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-xs text-(--app-muted-text)">
                            {resource.code}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{kindLabelMap[resource.kind]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
