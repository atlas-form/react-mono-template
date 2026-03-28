import {
  Tabs as HeadlessTabs,
  TabsContent as HeadlessTabsContent,
  TabsList as HeadlessTabsList,
  TabsTrigger as HeadlessTabsTrigger,
  type TabsContentProps as HeadlessTabsContentProps,
  type TabsListProps as HeadlessTabsListProps,
  type TabsProps as HeadlessTabsProps,
  type TabsTriggerProps as HeadlessTabsTriggerProps,
} from "@workspace/ui-core/components/tabs"

export type TabsProps = HeadlessTabsProps
export type TabsListProps = HeadlessTabsListProps
export type TabsTriggerProps = HeadlessTabsTriggerProps
export type TabsContentProps = HeadlessTabsContentProps

export function Tabs(props: TabsProps) {
  return <HeadlessTabs {...props} />
}

export function TabsList(props: TabsListProps) {
  return <HeadlessTabsList {...props} />
}

export function TabsTrigger(props: TabsTriggerProps) {
  return <HeadlessTabsTrigger {...props} />
}

export function TabsContent(props: TabsContentProps) {
  return <HeadlessTabsContent {...props} />
}
