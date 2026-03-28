import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui-core/components/tabs"

export function UiCoreTabsSection() {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-base font-medium">Default Tabs (ui-core)</h2>
      <p className="text-sm text-muted-foreground">
        使用 @workspace/ui-core 的默认 styled 模式。
      </p>
      <Tabs defaultValue="account" className="w-full max-w-xl">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="rounded-md border p-3 text-sm">
          Manage your account settings.
        </TabsContent>
        <TabsContent value="password" className="rounded-md border p-3 text-sm">
          Update your password here.
        </TabsContent>
      </Tabs>
    </section>
  )
}
