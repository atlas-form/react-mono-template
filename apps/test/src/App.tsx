import { useEffect, useState } from "react"
import i18n from "@workspace/services/i18n"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  Tree,
  type TreeNode,
} from "@workspace/ui-components"
import {
  DisplayControls,
  type AppLanguage,
} from "@/components/display-controls"

const LANGUAGE_STORAGE_KEY = "test-language"

const TREE_DATA: TreeNode[] = [
  {
    id: "node-1",
    label: "Node1",
    children: [
      {
        id: "node-1-child-1",
        label: "Child Node1",
        children: [
          {
            id: "node-1-child-1-sub-1",
            label: "Sub Node1",
            children: [
              {
                id: "node-1-child-1-sub-1-leaf-1",
                label: "Leaf Node1",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "node-2",
    label: "Node2",
    children: [
      {
        id: "node-2-child-3",
        label: "Child Node3",
      },
      {
        id: "node-2-child-4",
        label: "Child Node4",
        children: [
          {
            id: "node-2-child-4-sub-1",
            label: "Sub Node4-1",
          },
          {
            id: "node-2-child-4-sub-2",
            label: "Sub Node4-2",
            children: [
              {
                id: "node-2-child-4-sub-2-leaf-1",
                label: "Leaf Node4-2-1",
              },
            ],
          },
        ],
      },
      {
        id: "node-2-child-5",
        label: "Child Node5",
      },
    ],
  },
]

function getInitialLanguage(): AppLanguage {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored === "en" || stored === "zhCN") {
    return stored
  }

  const currentLanguage = i18n.language
  if (currentLanguage === "zhCN" || currentLanguage?.startsWith("zh")) {
    return "zhCN"
  }

  return "en"
}

export function App() {
  const [language, setLanguage] = useState<AppLanguage>(getInitialLanguage)
  const [treeValue, setTreeValue] = useState<string[]>([
    "node-1",
    "node-1-child-1",
    "node-1-child-1-sub-1",
    "node-1-child-1-sub-1-leaf-1",
    "node-2",
    "node-2-child-3",
    "node-2-child-4",
    "node-2-child-4-sub-1",
    "node-2-child-4-sub-2",
    "node-2-child-4-sub-2-leaf-1",
    "node-2-child-5",
  ])
  useEffect(() => {
    document.documentElement.lang = language === "zhCN" ? "zh-CN" : "en"
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 bg-background px-6 py-10 text-foreground">
      <header className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm tracking-[0.24em] text-muted-foreground uppercase">
              UI Components
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Tree + Sidebar
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              当前页面用于验证 `Tree` 和新补充的 `Sidebar` stable 封装。
            </p>
          </div>

          <DisplayControls language={language} onLanguageChange={setLanguage} />
        </div>
      </header>

      <section className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tree</CardTitle>
            <CardDescription>
              多选树组件，支持级联选择、标签回显和搜索过滤。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Tree
                data={TREE_DATA}
                value={treeValue}
                onValueChange={setTreeValue}
                defaultExpandedIds={[
                  "node-1",
                  "node-1-child-1",
                  "node-1-child-1-sub-1",
                  "node-2",
                  "node-2-child-4",
                  "node-2-child-4-sub-2",
                ]}
                placeholder="Select nodes"
                searchPlaceholder="Search nodes"
              />
              <p className="text-sm text-muted-foreground">
                当前值：{treeValue.length ? treeValue.join(", ") : "-"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sidebar</CardTitle>
            <CardDescription>
              `ui-components` 对 `ui-core/sidebar` 的 stable 封装验证。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border">
              <SidebarProvider defaultOpen>
                <div className="flex min-h-[24rem] w-full">
                  <Sidebar collapsible="icon">
                    <SidebarHeader>
                      <div className="px-2 py-1 text-sm font-semibold">Workspace</div>
                    </SidebarHeader>
                    <SidebarSeparator />
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton active tooltip="Overview">
                                Overview
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton tooltip="Orders">
                                Orders
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarContent>
                  </Sidebar>
                  <SidebarInset>
                    <div className="flex h-full min-h-[24rem] flex-1 flex-col gap-4 p-4">
                      <div className="flex items-center gap-3">
                        <SidebarTrigger />
                        <div>
                          <p className="text-sm font-medium">Sidebar Preview</p>
                          <p className="text-sm text-muted-foreground">
                            验证 `SidebarProvider`、`SidebarTrigger` 和菜单结构。
                          </p>
                        </div>
                      </div>
                    </div>
                  </SidebarInset>
                </div>
              </SidebarProvider>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
