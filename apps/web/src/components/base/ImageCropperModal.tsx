import { createPortal } from "react-dom"
import Cropper from "react-easy-crop"
import type { Area, Point } from "react-easy-crop"
import "react-easy-crop/react-easy-crop.css"

interface ImageCropperModalProps {
  open: boolean
  imageUrl: string
  crop: Point
  zoom: number
  minZoom?: number
  maxZoom?: number
  confirming?: boolean
  onCropChange: (value: Point) => void
  onZoomChange: (value: number) => void
  onCropComplete: (areaPixels: Area) => void
  onCancel: () => void
  onConfirm: () => void
  title?: string
  description?: string
  zoomLabel?: string
  cancelLabel?: string
  confirmLabel?: string
  confirmingLabel?: string
}

export default function ImageCropperModal({
  open,
  imageUrl,
  crop,
  zoom,
  minZoom = 1,
  maxZoom = 4,
  confirming = false,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onCancel,
  onConfirm,
  title = "Adjust Image",
  description = "Drag and zoom. The circle is the visible area.",
  zoomLabel = "Zoom",
  cancelLabel = "Cancel",
  confirmLabel = "Save",
  confirmingLabel = "Uploading...",
}: ImageCropperModalProps) {
  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div className="ui-modal-backdrop">
      <div className="ui-modal-card">
        <h3 className="ui-modal-title">{title}</h3>
        <p className="ui-modal-desc">{description}</p>

        <div className="ui-modal-crop-area">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            objectFit="cover"
            minZoom={minZoom}
            maxZoom={maxZoom}
            cropShape="round"
            showGrid={false}
            classes={{
              containerClassName: "cursor-grab active:cursor-grabbing",
            }}
            style={{
              cropAreaStyle: {
                border: "2px solid rgba(255,255,255,0.95)",
                color: "rgba(0, 0, 0, 0.72)",
              },
            }}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={(_, areaPixels) => onCropComplete(areaPixels)}
          />
        </div>

        <div className="ui-modal-section">
          <label className="ui-modal-label">{zoomLabel}</label>
          <input
            type="range"
            min={minZoom}
            max={maxZoom}
            step={0.01}
            value={zoom}
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="ui-modal-range"
          />
        </div>

        <div className="ui-modal-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={confirming}
            className="ui-btn-muted"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirming}
            className="ui-btn-brand"
          >
            {confirming ? confirmingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
