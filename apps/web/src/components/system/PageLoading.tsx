export default function PageLoading({
  label = "Loading...",
  fullscreen = false,
}: {
  label?: string
  fullscreen?: boolean
}) {
  return (
    <div
      className={`ui-page-loading ${
        fullscreen ? "ui-page-loading-full" : "ui-page-loading-block"
      }`}
    >
      <span className="ui-page-loading-chip">{label}</span>
    </div>
  )
}
