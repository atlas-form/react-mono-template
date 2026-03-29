import {
  Tabs as CoreTabs,
  TabsContent as CoreTabsContent,
  TabsList as CoreTabsList,
  TabsTrigger as CoreTabsTrigger,
  type TabsContentProps as CoreTabsContentProps,
  type TabsListProps as CoreTabsListProps,
  type TabsProps as CoreTabsProps,
  type TabsTriggerProps as CoreTabsTriggerProps,
} from "@workspace/ui-core/components/tabs"

export type TabsProps = CoreTabsProps
export type TabsListProps = CoreTabsListProps
export type TabsTriggerProps = CoreTabsTriggerProps
export type TabsContentProps = CoreTabsContentProps

export function Tabs(props: TabsProps) {
  return <CoreTabs {...props} />
}

export function TabsList(props: TabsListProps) {
  return <CoreTabsList {...props} />
}

export function TabsTrigger(props: TabsTriggerProps) {
  return <CoreTabsTrigger {...props} />
}

export function TabsContent(props: TabsContentProps) {
  return <CoreTabsContent {...props} />
}
