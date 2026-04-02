export default function PageLoading({
  label = "Loading...",
  fullscreen = false,
}: {
  label?: string
  fullscreen?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullscreen ? "min-h-svh w-full" : "w-full py-12"
      }`}
    >
      <span className="rounded-full border border-(--app-border) bg-(--app-surface) px-4 py-2 text-sm text-(--app-muted-text) shadow-[var(--ui-shadow-soft)]">
        {label}
      </span>
    </div>
  )
}
