import { useState } from "react"
import { Textarea } from "@workspace/ui-core/components/textarea"
import { Label } from "@workspace/ui-core/components/label"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@workspace/ui-core/components/field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui-core/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui-core/components/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui-core/components/tooltip"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui-core/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-core/components/table"
import { Badge } from "@workspace/ui-core/components/badge"
import { Separator } from "@workspace/ui-core/components/separator"
import { Skeleton } from "@workspace/ui-core/components/skeleton"
import { Progress } from "@workspace/ui-core/components/progress"
import { Alert, AlertDescription, AlertTitle } from "@workspace/ui-core/components/alert"
import { Spinner } from "@workspace/ui-core/components/spinner"

export function App() {
  const [progressValue, setProgressValue] = useState(42)

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 p-6" lang="zh-CN">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">UI Core P0 Test Page</h1>
        <p className="text-sm text-muted-foreground">
          已完成组件已移出。当前页面仅保留“未完成测试”的组件，并按组件分类。
        </p>
      </header>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">测试组件：Textarea</h2>
        <Label htmlFor="test-textarea">Description</Label>
        <Textarea id="test-textarea" placeholder="Long text..." />
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">测试组件：Label</h2>
        <Label htmlFor="test-label-input">Label for native input</Label>
        <input
          id="test-label-input"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Native input for label binding test"
        />
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">测试组件：Field</h2>
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="field-email">Email</FieldLabel>
            <FieldContent>
              <input
                id="field-email"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="name@example.com"
              />
              <FieldDescription>Field + FieldLabel + FieldDescription 组合验证。</FieldDescription>
            </FieldContent>
          </Field>
        </FieldSet>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3 rounded-lg border p-3">
          <h2 className="text-base font-medium">测试组件：Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-md border px-3 py-2 text-sm">Open Dialog</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Dialog content from ui-core.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <button className="rounded-md border px-3 py-2 text-sm">Close</button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-medium">测试组件：Dropdown Menu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md border px-3 py-2 text-sm">Open Menu</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-base font-medium">测试组件：Popover</h2>
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-md border px-3 py-2 text-sm">Open Popover</button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Popover</PopoverTitle>
                <PopoverDescription>Popover description.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <h2 className="text-base font-medium">测试组件：Tooltip</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-md border px-3 py-2 text-sm">Hover Me</button>
              </TooltipTrigger>
              <TooltipContent>Tooltip Content</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">测试组件：Card</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description text.</CardDescription>
          </CardHeader>
          <CardContent>Card content area</CardContent>
          <CardFooter>Card footer area</CardFooter>
        </Card>
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="text-base font-medium">测试组件：Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Textarea</TableCell>
              <TableCell>Testing</TableCell>
              <TableCell>P0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dialog</TableCell>
              <TableCell>Testing</TableCell>
              <TableCell>P0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Badge</h2>
          <div className="flex items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Separator</h2>
          <div className="space-y-2">
            <span className="text-sm">Top</span>
            <Separator />
            <span className="text-sm">Bottom</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Skeleton</h2>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Progress</h2>
          <Progress value={progressValue} />
          <div className="flex gap-2">
            <button
              className="rounded-md border px-3 py-1 text-sm"
              onClick={() => setProgressValue((prev) => Math.max(0, prev - 10))}
            >
              -10%
            </button>
            <button
              className="rounded-md border px-3 py-1 text-sm"
              onClick={() => setProgressValue((prev) => Math.min(100, prev + 10))}
            >
              +10%
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Alert</h2>
          <Alert>
            <AlertTitle>P0 Alert</AlertTitle>
            <AlertDescription>Progress value: {progressValue}%</AlertDescription>
          </Alert>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-medium">测试组件：Spinner</h2>
          <div className="flex items-center gap-3">
            <Spinner />
            <span className="text-sm text-muted-foreground">Loading status</span>
          </div>
        </div>
      </section>

      <footer className="text-xs text-muted-foreground">
        当前页面展示的是尚未勾选完成的组件，已完成组件不再放在这里。
      </footer>
    </main>
  )
}
