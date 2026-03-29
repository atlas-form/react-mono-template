import { useState } from "react"

import { Alert } from "@workspace/ui-components/stable/alert"
import { Badge } from "@workspace/ui-components/stable/badge"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Checkbox } from "@workspace/ui-components/stable/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@workspace/ui-components/stable/field"
import { Input } from "@workspace/ui-components/stable/input"
import { Label } from "@workspace/ui-components/stable/label"
import { NativeSelect } from "@workspace/ui-components/stable/native-select"
import { Progress } from "@workspace/ui-components/stable/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui-components/stable/radio-group"
import { Select } from "@workspace/ui-components/stable/select"
import { Separator } from "@workspace/ui-components/stable/separator"
import { Skeleton } from "@workspace/ui-components/stable/skeleton"
import { Spinner } from "@workspace/ui-components/stable/spinner"
import { Switch } from "@workspace/ui-components/stable/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components/stable/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui-components/stable/tabs"
import { Textarea } from "@workspace/ui-components/stable/textarea"

import { DemoSection } from "./shared"

export function FoundationDemo() {
  const [inputValue, setInputValue] = useState("Alice")
  const [textareaValue, setTextareaValue] = useState("Initial note")
  const [checked, setChecked] = useState(true)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [radioValue, setRadioValue] = useState("standard")
  const [selectValue, setSelectValue] = useState("shanghai")
  const [nativeSelectValue, setNativeSelectValue] = useState("react")
  const [tabValue, setTabValue] = useState("overview")

  return (
    <>
      <DemoSection title="Button / Badge / Alert / Spinner / Skeleton">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Danger</Badge>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <Alert variant="success" title="Saved" description="The record has been updated." />
            <Alert variant="warning" title="Draft" description="This item is not published." />
          </div>

          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="default" />
            <Spinner size="lg" />
            <Skeleton size="sm" />
            <Skeleton size="default" />
            <Skeleton size="lg" />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Input / Textarea / Label / Field">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={inputValue} onValueChange={setInputValue} placeholder="Type a name" />
            <Input
              value="readonly@example.com"
              onValueChange={() => {}}
              type="email"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={textareaValue}
              onValueChange={setTextareaValue}
              rows={5}
              placeholder="Write notes"
            />
          </div>
        </div>

        <div className="mt-4">
          <Field>
            <FieldSet>
              <FieldLegend>Profile Field</FieldLegend>
              <FieldGroup>
                <FieldContent>
                  <FieldLabel>Username</FieldLabel>
                  <FieldTitle>Required</FieldTitle>
                  <FieldDescription>Use 4-16 characters</FieldDescription>
                  <FieldError>Already taken</FieldError>
                </FieldContent>
              </FieldGroup>
            </FieldSet>
          </Field>
        </div>
      </DemoSection>

      <DemoSection title="Checkbox / Switch / Radio / Select / Native Select">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <Checkbox checked disabled />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
              <Switch checked size="sm" />
            </div>

            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <div className="flex gap-4">
                <RadioGroupItem value="standard">Standard</RadioGroupItem>
                <RadioGroupItem value="pro">Pro</RadioGroupItem>
                <RadioGroupItem value="enterprise" disabled>
                  Enterprise
                </RadioGroupItem>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Select
              value={selectValue}
              onValueChange={setSelectValue}
              placeholder="Select city"
              list={[
                { value: "shanghai", label: "Shanghai" },
                { value: "beijing", label: "Beijing" },
                { value: "shenzhen", label: "Shenzhen", disabled: true },
              ]}
            />

            <NativeSelect
              value={nativeSelectValue}
              onValueChange={setNativeSelectValue}
              placeholder="Select framework"
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "svelte", label: "Svelte" },
              ]}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Tabs / Card / Table / Progress / Separator">
        <div className="space-y-4">
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="settings" disabled>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Overview panel</TabsContent>
            <TabsContent value="metrics">Metrics panel</TabsContent>
            <TabsContent value="settings">Settings panel</TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Starter Plan</CardTitle>
              <CardDescription>Best for small teams</CardDescription>
              <CardAction>
                <Button size="xs">Upgrade</Button>
              </CardAction>
            </CardHeader>
            <CardContent>Includes analytics and alerts.</CardContent>
            <CardFooter>Updated 5 min ago</CardFooter>
          </Card>

          <Table>
            <TableCaption>Account Status</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob</TableCell>
                <TableCell>Member</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>2</TableCell>
                <TableCell>Users</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Progress value={68} max={100} />
          <Separator />
          <div className="flex h-6 items-center gap-2">
            <span>Left</span>
            <Separator orientation="vertical" />
            <span>Right</span>
          </div>
        </div>
      </DemoSection>
    </>
  )
}
