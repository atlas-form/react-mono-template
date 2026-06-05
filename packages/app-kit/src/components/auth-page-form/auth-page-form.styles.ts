import { linkClassName } from "@workspace/ui-components/stable/link"

export const authPageFormClassNames = {
  shell:
    "relative mx-auto max-h-full w-full max-w-5xl overflow-hidden rounded-xl shadow-[var(--ui-shadow-soft)] [&>[data-slot=card]]:gap-0 [&>[data-slot=card]]:overflow-hidden [&>[data-slot=card]]:rounded-xl [&>[data-slot=card]]:bg-(--surface) [&>[data-slot=card]]:py-0 [&>[data-slot=card]]:ring-0",
  panel: "grid max-h-full overflow-hidden rounded-xl bg-(--surface) sm:grid-cols-2",
  aside:
    "relative hidden flex-col justify-between bg-(--surface) p-8 text-(--app-text) sm:flex",
  brand: "text-xs tracking-[0.22em] text-(--app-muted-text)",
  heroTitle: "mt-4 text-3xl/tight font-semibold",
  heroDescriptions: "space-y-3 text-sm text-(--app-muted-text)",
  content: "bg-(--surface) p-6 sm:p-8",
  header: "space-y-3",
  welcome: "text-xs font-medium tracking-[0.16em] text-(--app-muted-text)",
  title: "text-3xl font-semibold text-(--app-text)",
  subtitle: "text-sm text-(--app-muted-text)",
  notice: "mt-6 rounded-lg bg-(--app-panel) p-4",
  noticeTitle: "text-sm font-medium text-(--app-text)",
  noticeDescription: "mt-1 text-sm text-(--app-muted-text)",
  form: "mt-6 [&_[data-slot=field-group]]:gap-3",
  footer: "mt-4 text-sm text-(--app-muted-text)",
  link: linkClassName,
}
