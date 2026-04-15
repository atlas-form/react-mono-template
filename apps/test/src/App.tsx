import { useEffect, useState } from "react"
import { Time, type TimeValue } from "@workspace/ui-core/components/time"
import i18n from "@workspace/services/i18n"
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
import {
  DisplayControls,
  type AppLanguage,
} from "@/components/display-controls"

const LANGUAGE_STORAGE_KEY = "test-language"

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
  const [singleDate, setSingleDate] = useState<Date>()
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>()
  const [timeValue, setTimeValue] = useState<TimeValue>({
    hour: "08",
    minute: "33",
    second: "03",
  })
  const [range, setRange] = useState<{
    from: Date | undefined
    to?: Date | undefined
  }>()

  useEffect(() => {
    document.documentElement.lang = language === "zhCN" ? "zh-CN" : "en"
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  const dateLocale = getDateLocale(language)

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 bg-background px-6 py-10 text-foreground">
      <header className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
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
          </div>

          <DisplayControls
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>
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
                locale={language}
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
                calendarProps={{ locale: language }}
              />
              <p className="text-sm text-muted-foreground">
                当前值：
                {singleDate ? singleDate.toLocaleDateString(dateLocale) : "-"}
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
                calendarProps={{ locale: language }}
              />
              <p className="text-sm text-muted-foreground">
                当前值：
                {multipleDates?.length
                  ? ` ${multipleDates
                      .map((date) => date.toLocaleDateString(dateLocale))
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
              <DateRangePicker
                value={range}
                onValueChange={setRange}
                calendarProps={{ locale: language }}
              />
              <p className="text-sm text-muted-foreground">
                当前值：
                {range?.from
                  ? ` ${range.from.toLocaleDateString(dateLocale)} - ${
                      range.to?.toLocaleDateString(dateLocale) ?? "-"
                    }`
                  : " -"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UI Core Time</CardTitle>
            <CardDescription>
              Headless 原语，测试页里加了一层 Apple 风格样式。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative mx-auto w-fit overflow-hidden rounded-[10px] bg-[color-mix(in_oklab,var(--surface)_89%,var(--foreground)_11%)] p-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
                <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center text-[14px] font-semibold leading-none text-[var(--accent-foreground)]">
                  <span className="w-[62px]" />
                  <span className="flex w-4 items-center justify-center">:</span>
                  <span className="w-[62px]" />
                  <span className="flex w-4 items-center justify-center">:</span>
                  <span className="w-[62px]" />
                </div>
                <Time
                  mode="headless"
                  value={timeValue}
                  onValueChange={setTimeValue}
                  aria-label="Apple style time"
                  hourLabel="Hour"
                  minuteLabel="Minute"
                  secondLabel="Second"
                  className="flex items-center justify-center gap-0"
                  columnClassName="relative h-[95px] w-[58px] overflow-y-auto border-r border-[color-mix(in_oklab,var(--foreground)_8%,transparent)] bg-transparent px-0 py-0 snap-y snap-mandatory overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none last:border-r-0"
                  itemClassName="pointer-events-none relative z-10 flex h-[19px] snap-center items-center justify-center text-[11px] font-semibold tracking-0 text-[var(--muted-foreground)] transition-all duration-150 aria-selected:scale-100 aria-selected:text-[var(--accent-foreground)] aria-selected:[text-shadow:0_1px_1px_rgba(0,0,0,0.08)] [&:not([aria-selected='true'])]:scale-[0.98]"
                  selectionClassName="inset-x-0 h-[17px] rounded-[5px] bg-[var(--surface-active)] shadow-[inset_0_1px_0_color-mix(in_oklab,white_12%,transparent)]"
                  itemHeight={19}
                  visibleRows={5}
                />
              </div>

              <p className="text-sm text-muted-foreground">
                当前值：
                {` ${timeValue.hour}:${timeValue.minute}:${timeValue.second ?? "00"}`}
              </p>
              <p className="text-xs text-muted-foreground">
                交互规则：只能上下滚动，中心高亮区域为当前选中值。
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
