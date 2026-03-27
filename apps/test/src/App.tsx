import { useState } from "react"
import { Button } from "@workspace/ui-core/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui-core/components/card"
import { Input } from "@workspace/ui-core/components/input"
import { Switch } from "@workspace/ui-core/components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui-core/components/tabs"
import { Textarea } from "@workspace/ui-core/components/textarea"

export function App() {
  const [enabled, setEnabled] = useState(false)
  const [note, setNote] = useState("")

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">组件测试台</h1>
        <p className="text-sm text-muted-foreground">
          所有新组件、重写组件、改动组件都先在这里验证交互和样式，再进入正式页面。
        </p>
      </header>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">基础组件</TabsTrigger>
          <TabsTrigger value="form">表单组件</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="pt-2">
          <Card>
            <CardHeader>
              <CardTitle>按钮与开关</CardTitle>
              <CardDescription>快速检查常见状态和交互是否正常。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button>默认按钮</Button>
                <Button variant="secondary">次级按钮</Button>
                <Button variant="outline">描边按钮</Button>
                <Button variant="destructive">危险按钮</Button>
                <Button disabled>禁用按钮</Button>
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={enabled} onCheckedChange={setEnabled} />
                <span className="text-sm text-muted-foreground">
                  当前开关状态：{enabled ? "开启" : "关闭"}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form" className="pt-2">
          <Card>
            <CardHeader>
              <CardTitle>输入类组件</CardTitle>
              <CardDescription>用于检查输入框、文本域在不同内容长度下的表现。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="请输入测试标题" />
              <Textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="记录测试过程、问题和结论"
                className="min-h-28"
              />
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                当前输入长度：{note.length}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="text-xs text-muted-foreground">
        提示：按 <kbd>d</kbd> 可切换明暗主题，方便检查主题兼容性。
      </footer>
    </main>
  )
}
