import { useTranslation } from "react-i18next";
import { Button } from "@workspace/ui-core/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Stack,
  Text,
} from "@atlas-art/ui-react";

export default function GuidePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10 py-4">
      <section className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-6">
        <Stack gap="md">
          <Text as="h1" variant="title">
            {t("guide.title")}
          </Text>
          <Text variant="muted">{t("guide.subtitle")}</Text>
        </Stack>
      </section>

      <section className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-6">
        <Stack gap="lg">
          <Card shadow="sm" padding="lg">
            <CardHeader>
              <CardTitle>{t("guide.buttons.title")}</CardTitle>
              <Text variant="muted">{t("guide.buttons.subtitle")}</Text>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="button" variant="destructive" size="lg">
                  {t("guide.buttons.danger")}
                </Button>
                <Button type="button" variant="default" size="lg">
                  {t("guide.buttons.primary")}
                </Button>
                <Button type="button" variant="secondary" size="lg">
                  {t("guide.buttons.secondary")}
                </Button>
                <Button type="button" variant="outline" size="lg">
                  {t("guide.buttons.outline")}
                </Button>
                <Button type="button" variant="ghost" size="lg">
                  {t("guide.buttons.ghost")}
                </Button>
                <Button
                  type="button"
                  unstyled
                  className="inline-flex h-9 items-center justify-center bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] disabled:bg-[var(--primary-disabled)] [clip-path:polygon(12%_0,100%_0,88%_100%,0_100%)]"
                >
                  左斜按钮
                </Button>
                <Button
                  type="button"
                  unstyled
                  className="inline-flex h-9 items-center justify-center bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] disabled:bg-[var(--primary-disabled)] [clip-path:polygon(0_0,88%_0,100%_100%,12%_100%)]"
                >
                  右斜按钮
                </Button>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-6">
        <Stack gap="md">
          <Text as="h2" variant="title">
            {t("guide.guide.title")}
          </Text>
          <Text variant="muted">{t("guide.guide.intro")}</Text>
          <Text variant="muted">{t("guide.guide.step1")}</Text>
          <Text variant="muted">{t("guide.guide.step2")}</Text>
          <Text variant="muted">{t("guide.guide.step3")}</Text>
          <Text variant="muted">{t("guide.guide.template")}</Text>
          <Text variant="muted">{t("guide.guide.tip")}</Text>
        </Stack>
      </section>
    </div>
  );
}
