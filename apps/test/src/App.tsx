import { useEffect, useState } from "react"
import i18n from "@workspace/services/i18n"
import {
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Time,
  type TimeValue,
} from "@workspace/ui-components"
import {
  DatePicker,
  DateRangePicker,
  MultipleDatePicker,
} from "@workspace/app-components"
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
            <p className="text-sm tracking-[0.24em] text-muted-foreground uppercase">
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

          <DisplayControls language={language} onLanguageChange={setLanguage} />
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
            <CardTitle>DatePicker</CardTitle>
            <CardDescription>点击触发弹层，选择单个日期。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <DatePicker
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
              `ui-components` Time，分别展示 `sm / md / lg` 三种大小。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Small
                </p>
                <div className="relative mx-auto w-fit overflow-hidden rounded-[10px] bg-[color-mix(in_oklab,var(--surface)_89%,var(--foreground)_11%)] p-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center text-[12px] leading-none font-semibold text-[var(--accent-foreground)]">
                    <span className="w-[58px]" />
                    <span className="flex w-3 items-center justify-center">
                      :
                    </span>
                    <span className="w-[58px]" />
                    <span className="flex w-3 items-center justify-center">
                      :
                    </span>
                    <span className="w-[58px]" />
                  </div>
                  <Time
                    size="sm"
                    value={timeValue}
                    onValueChange={setTimeValue}
                    ariaLabel="Small time"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Medium
                </p>
                <div className="relative mx-auto w-fit overflow-hidden rounded-[10px] bg-[color-mix(in_oklab,var(--surface)_89%,var(--foreground)_11%)] p-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center text-[14px] leading-none font-semibold text-[var(--accent-foreground)]">
                    <span className="w-[64px]" />
                    <span className="flex w-4 items-center justify-center">
                      :
                    </span>
                    <span className="w-[64px]" />
                    <span className="flex w-4 items-center justify-center">
                      :
                    </span>
                    <span className="w-[64px]" />
                  </div>
                  <Time
                    size="md"
                    value={timeValue}
                    onValueChange={setTimeValue}
                    ariaLabel="Medium time"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Large
                </p>
                <div className="relative mx-auto w-fit overflow-hidden rounded-[12px] bg-[color-mix(in_oklab,var(--surface)_89%,var(--foreground)_11%)] p-0 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center text-[16px] leading-none font-semibold text-[var(--accent-foreground)]">
                    <span className="w-[72px]" />
                    <span className="flex w-4 items-center justify-center">
                      :
                    </span>
                    <span className="w-[72px]" />
                    <span className="flex w-4 items-center justify-center">
                      :
                    </span>
                    <span className="w-[72px]" />
                  </div>
                  <Time
                    size="lg"
                    value={timeValue}
                    onValueChange={setTimeValue}
                    ariaLabel="Large time"
                  />
                </div>
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
