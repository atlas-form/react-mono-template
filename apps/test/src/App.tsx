import { useState } from "react"
import {
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DateRangePicker,
  MultipleDatePicker,
  SingleDatePicker,
} from "@workspace/ui-components"

export function App() {
  const [singleDate, setSingleDate] = useState<Date>()
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>()
  const [range, setRange] = useState<{
    from: Date | undefined
    to?: Date | undefined
  }>()

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 bg-background px-6 py-10 text-foreground">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
          UI Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Calendar / Single / Multi / Range
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          这里直接测试 `ui-components` 里的最基础日期能力，包括裸
          `Calendar`、单选、多选和范围选择。
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>基础 Calendar</CardTitle>
            <CardDescription>最底层日历面板，直接展示。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                captionMode="dropdown"
                startMonth={new Date(2020, 0, 1)}
                endMonth={new Date(2030, 11, 1)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SingleDatePicker</CardTitle>
            <CardDescription>点击触发弹层，选择单个日期。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <SingleDatePicker
                value={singleDate}
                onValueChange={setSingleDate}
              />
              <p className="text-sm text-muted-foreground">
                当前值：
                {singleDate ? singleDate.toLocaleDateString("zh-CN") : "-"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MultipleDatePicker</CardTitle>
            <CardDescription>支持选择多个日期。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <MultipleDatePicker
                value={multipleDates}
                onValueChange={setMultipleDates}
              />
              <p className="text-sm text-muted-foreground">
                当前值：
                {multipleDates?.length
                  ? ` ${multipleDates
                      .map((date) => date.toLocaleDateString("zh-CN"))
                      .join(" / ")}`
                  : " -"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DateRangePicker</CardTitle>
            <CardDescription>默认双月视图，适合范围选择。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <DateRangePicker value={range} onValueChange={setRange} />
              <p className="text-sm text-muted-foreground">
                当前值：
                {range?.from
                  ? ` ${range.from.toLocaleDateString("zh-CN")} - ${
                      range.to?.toLocaleDateString("zh-CN") ?? "-"
                    }`
                  : " -"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
