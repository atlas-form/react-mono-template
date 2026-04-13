import { Card, CardContent, CardTitle } from "@workspace/ui-components/stable/card"

const blocks = [
  {
    title: "角色矩阵",
    description: "按菜单、操作和数据范围拆角色，替代 demo 里直接耦合到页面的权限结构。",
    marker: "RM",
  },
  {
    title: "审批流",
    description: "高风险权限变更先进入审批，再触发真实接口写入。",
    marker: "WF",
  },
  {
    title: "会话控制",
    description: "继续沿用当前仓库的登录恢复逻辑，后续可扩展多端会话和强制下线。",
    marker: "SC",
  },
]

export default function AccessPage() {
  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <Card key={block.title}>
          <CardContent>
            <div className="flex items-start gap-3">
              <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl bg-(--app-active-bg) text-sm font-semibold text-(--app-muted-text)">
                {block.marker}
              </span>
              <div>
                <CardTitle>{block.title}</CardTitle>
                <p className="mt-2 text-sm text-(--app-muted-text)">
                  {block.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
