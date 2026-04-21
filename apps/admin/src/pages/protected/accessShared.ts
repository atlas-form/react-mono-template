export type PermissionResourceType = "menu" | "button" | "api"

export interface PermissionResourceNode {
  id: string
  code: string
  name: string
  type: PermissionResourceType
  description: string
  level?: 1 | 2
  path?: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  children?: PermissionResourceNode[]
}

export interface RolePermissionProfile {
  id: string
  code: string
  name: string
  description: string
  scope: string
  userCount: number
  presetIds: string[]
}

export const permissionResourceTree: PermissionResourceNode[] = [
  {
    id: "menu:dashboard",
    code: "menu.dashboard",
    name: "总览",
    type: "menu",
    level: 1,
    path: "/",
    description: "Admin 首页和经营总览。",
  },
  {
    id: "menu:order-center",
    code: "menu.order-center",
    name: "订单中心",
    type: "menu",
    level: 1,
    path: "/orders",
    description: "订单看板和履约处理。",
    children: [
      {
        id: "button:order-center.export",
        code: "button.order-center.export",
        name: "导出订单",
        type: "button",
        description: "允许导出订单列表和筛选结果。",
      },
      {
        id: "api:get:/admin/orders",
        code: "api.get.admin-orders",
        name: "查询订单列表",
        type: "api",
        method: "GET",
        path: "/admin/orders",
        description: "拉取订单列表和聚合统计。",
      },
    ],
  },
  {
    id: "menu:system",
    code: "menu.system",
    name: "系统管理",
    type: "menu",
    level: 1,
    path: "/access",
    description: "一级菜单。聚合权限、审计和系统配置。",
    children: [
      {
        id: "menu:system.role-permission",
        code: "menu.system.role-permission",
        name: "角色权限配置",
        type: "menu",
        level: 2,
        path: "/access",
        description: "二级菜单。核心权限配置入口。",
        children: [
          {
            id: "button:system.role-permission.assign",
            code: "button.system.role-permission.assign",
            name: "分配权限",
            type: "button",
            description: "提交角色与资源绑定关系。",
          },
          {
            id: "button:system.role-permission.publish",
            code: "button.system.role-permission.publish",
            name: "发布变更",
            type: "button",
            description: "高风险角色发布时触发二次确认。",
          },
          {
            id: "api:get:/admin/roles",
            code: "api.get.admin-roles",
            name: "查询角色列表",
            type: "api",
            method: "GET",
            path: "/admin/roles",
            description: "获取角色基础信息和人数统计。",
          },
          {
            id: "api:get:/admin/permissions/tree",
            code: "api.get.permission-tree",
            name: "查询权限资源树",
            type: "api",
            method: "GET",
            path: "/admin/permissions/tree",
            description: "统一返回菜单、按钮、API 三类资源。",
          },
          {
            id: "api:put:/admin/roles/{roleId}/permissions",
            code: "api.put.role-permissions",
            name: "更新角色权限",
            type: "api",
            method: "PUT",
            path: "/admin/roles/{roleId}/permissions",
            description: "提交角色权限覆盖集。",
          },
        ],
      },
      {
        id: "menu:system.audit-log",
        code: "menu.system.audit-log",
        name: "审计日志",
        type: "menu",
        level: 2,
        path: "/settings",
        description: "二级菜单。查看权限变更历史。",
        children: [
          {
            id: "button:system.audit-log.export",
            code: "button.system.audit-log.export",
            name: "导出审计日志",
            type: "button",
            description: "导出审计记录供合规留档。",
          },
          {
            id: "api:get:/admin/audit-logs",
            code: "api.get.audit-logs",
            name: "查询审计日志",
            type: "api",
            method: "GET",
            path: "/admin/audit-logs",
            description: "获取权限变更和审批留痕。",
          },
        ],
      },
    ],
  },
]

export const roleProfiles: RolePermissionProfile[] = [
  {
    id: "role:super-admin",
    code: "super_admin",
    name: "超级管理员",
    description: "拥有平台全量读写权限，负责最终发布。",
    scope: "全局",
    userCount: 2,
    presetIds: collectAllResourceIds(permissionResourceTree),
  },
  {
    id: "role:security-admin",
    code: "security_admin",
    name: "权限管理员",
    description: "可维护角色、菜单和审计，但不处理业务订单。",
    scope: "系统域",
    userCount: 5,
    presetIds: [
      "menu:dashboard",
      "menu:system",
      "menu:system.role-permission",
      "button:system.role-permission.assign",
      "button:system.role-permission.publish",
      "api:get:/admin/roles",
      "api:get:/admin/permissions/tree",
      "api:put:/admin/roles/{roleId}/permissions",
      "menu:system.audit-log",
      "button:system.audit-log.export",
      "api:get:/admin/audit-logs",
    ],
  },
  {
    id: "role:ops-manager",
    code: "ops_manager",
    name: "运营主管",
    description: "主要管理订单与会员，仅可查看权限中心。",
    scope: "业务域",
    userCount: 14,
    presetIds: [
      "menu:dashboard",
      "menu:order-center",
      "button:order-center.export",
      "api:get:/admin/orders",
      "menu:system",
      "menu:system.role-permission",
      "api:get:/admin/roles",
      "api:get:/admin/permissions/tree",
    ],
  },
]

export function flattenPermissionResources(
  nodes: PermissionResourceNode[],
): PermissionResourceNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenPermissionResources(node.children ?? []),
  ])
}

export function collectAllResourceIds(nodes: PermissionResourceNode[]): string[] {
  return flattenPermissionResources(nodes).map((node) => node.id)
}
