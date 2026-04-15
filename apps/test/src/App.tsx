import { useEffect, useState } from "react"
import i18n from "@workspace/services/i18n"
import {
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components"
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  MultipleDatePicker,
  TimePicker,
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
  const [dateTimeValue, setDateTimeValue] = useState<Date | null>(new Date())
  const [timePickerValue, setTimePickerValue] = useState<string | null>(
    "08:33:03"
  )
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
            <CardTitle>TimePicker</CardTitle>
            <CardDescription>
              使用 app-components 的时间选择器。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <TimePicker
                label="Time"
                value={timePickerValue}
                onValueChange={setTimePickerValue}
              />
              <p className="text-sm text-muted-foreground">
                当前值：
                {timePickerValue ? ` ${timePickerValue}` : " null"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DateTimePicker</CardTitle>
            <CardDescription>
              使用 app-components 的日期时间选择器。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <DateTimePicker
                value={dateTimeValue}
                onValueChange={setDateTimeValue}
                calendarProps={{ locale: language }}
              />
              <p className="text-sm text-muted-foreground">
                当前值：
                {dateTimeValue
                  ? ` ${dateTimeValue.toLocaleString(dateLocale)}`
                  : " null"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
