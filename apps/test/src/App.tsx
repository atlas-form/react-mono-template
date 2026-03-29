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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui-components/stable/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui-components/stable/dropdown-menu"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@workspace/ui-components/stable/field"
import { Input } from "@workspace/ui-components/stable/input"
import { Label } from "@workspace/ui-components/stable/label"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui-components/stable/popover"
import { Progress } from "@workspace/ui-components/stable/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui-components/stable/radio-group"
import { Select } from "@workspace/ui-components/stable/select"
import { Separator } from "@workspace/ui-components/stable/separator"
import { Skeleton } from "@workspace/ui-components/stable/skeleton"
import { Slider } from "@workspace/ui-components/stable/slider"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui-components/stable/tooltip"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border p-4">
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function App() {
  const [inputValue, setInputValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [checked, setChecked] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [sliderValue, setSliderValue] = useState<number[]>([40])
  const [radioValue, setRadioValue] = useState("a")
  const [selectValue, setSelectValue] = useState("shanghai")
  const [tabValue, setTabValue] = useState("overview")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [dropdownRadio, setDropdownRadio] = useState("member")
  const [dropdownChecked, setDropdownChecked] = useState(true)

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-4 p-6" lang="zh-CN">
      <Section title="Button Variants">
        <div className="flex flex-wrap gap-2">
          <Button variant="default">default</Button>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button size="default">default</Button>
          <Button size="lg">lg</Button>
          <Button size="icon">+</Button>
          <Button disabled>disabled</Button>
        </div>
      </Section>

      <Section title="Badge Variants">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="destructive">destructive</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="ghost">ghost</Badge>
          <Badge variant="link">link</Badge>
        </div>
      </Section>

      <Section title="Alert Variants">
        <div className="grid gap-2">
          <Alert variant="default" title="Default" description="默认提示样式" />
          <Alert variant="success" title="Success" description="成功提示样式" />
          <Alert variant="warning" title="Warning" description="警告提示样式" />
          <Alert variant="error" title="Error" description="错误提示样式" />
        </div>
      </Section>

      <Section title="Input / Textarea / Label">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Input</Label>
            <Input value={inputValue} onValueChange={setInputValue} placeholder="输入文本" />
          </div>
          <div className="grid gap-2">
            <Label>Textarea</Label>
            <Textarea
              value={textareaValue}
              onValueChange={setTextareaValue}
              placeholder="输入多行文本"
            />
          </div>
        </div>
      </Section>

      <Section title="Checkbox / Switch / RadioGroup / Select">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-6">
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
          </div>

          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex gap-4">
              <RadioGroupItem value="a">Option A</RadioGroupItem>
              <RadioGroupItem value="b">Option B</RadioGroupItem>
              <RadioGroupItem value="c">Option C</RadioGroupItem>
            </div>
          </RadioGroup>

          <Select
            value={selectValue}
            onValueChange={setSelectValue}
            placeholder="选择城市"
            list={[
              { value: "shanghai", label: "Shanghai" },
              { value: "beijing", label: "Beijing" },
              { value: "shenzhen", label: "Shenzhen" },
            ]}
          />
        </div>
      </Section>

      <Section title="Slider / Progress / Spinner / Skeleton / Separator">
        <div className="grid gap-4">
          <Slider value={sliderValue} onValueChange={setSliderValue} />
          <Progress value={sliderValue[0] ?? 0} />

          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="default" />
            <Spinner size="lg" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton size="sm" />
            <Skeleton size="default" />
            <Skeleton size="lg" />
          </div>

          <Separator />
          <div className="flex h-6 items-center gap-3">
            <span>A</span>
            <Separator orientation="vertical" />
            <span>B</span>
          </div>
        </div>
      </Section>

      <Section title="Tabs">
        <Tabs value={tabValue} onValueChange={setTabValue}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview Content</TabsContent>
          <TabsContent value="metrics">Metrics Content</TabsContent>
          <TabsContent value="settings">Settings Content</TabsContent>
        </Tabs>
      </Section>

      <Section title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Button size="xs">Action</Button>
            </CardAction>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      </Section>

      <Section title="Table">
        <Table>
          <TableCaption>Table Styles</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Alice</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bob</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Member</TableCell>
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
      </Section>

      <Section title="Dialog / Popover / Tooltip / DropdownMenu">
        <div className="flex flex-wrap items-center gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>Open Dialog</DialogTrigger>
            <DialogPortal>
              <DialogOverlay />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>Dialog Description</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </DialogPortal>
          </Dialog>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverAnchor>
              <span className="inline-block" />
            </PopoverAnchor>
            <PopoverTrigger>Open Popover</PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Popover Title</PopoverTitle>
                <PopoverDescription>Popover Description</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Hover Tooltip</TooltipTrigger>
              <TooltipContent side="top">Tooltip Content</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent>
                <DropdownMenuLabel inset>Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                  <DropdownMenuCheckboxItem
                    checked={dropdownChecked}
                    onCheckedChange={setDropdownChecked}
                  >
                    Enable notifications
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={dropdownRadio}
                  onValueChange={setDropdownRadio}
                >
                  <DropdownMenuRadioItem value="member">
                    Member
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </Section>

      <Section title="Field">
        <Field>
          <FieldSet>
            <FieldLegend>Profile Form</FieldLegend>
            <FieldGroup>
              <FieldContent>
                <FieldLabel>Username</FieldLabel>
                <FieldTitle>Required</FieldTitle>
                <FieldDescription>Use 4-16 characters</FieldDescription>
                <FieldError />
              </FieldContent>
              <FieldSeparator />
              <FieldContent>
                <FieldLabel>Email</FieldLabel>
                <FieldTitle>Optional</FieldTitle>
                <FieldDescription>For notifications</FieldDescription>
              </FieldContent>
            </FieldGroup>
          </FieldSet>
        </Field>
      </Section>
    </main>
  )
}
