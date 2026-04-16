import { useEffect, useState } from "react"
import i18n from "@workspace/services/i18n"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

function getDateLocale(language: AppLanguage) {
  return language === "zhCN" ? "zh-CN" : "en-US"
}

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
              Tree
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              这里暂时只保留 `Tree` 组件测试，方便单独验证级联多选、折叠展开和搜索。
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
      </section>
    </main>
  )
}
