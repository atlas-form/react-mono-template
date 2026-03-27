import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import type { Area, Point } from "react-easy-crop"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  getUploadAvatarSignApi,
  meApi,
  updateProfileApi,
  uploadWithSignedUrlApi,
} from "@/api"
import ImageCropperModal from "@/components/base/ImageCropperModal"
import type { RootState } from "@/store"
import { updateUser } from "@/store/authSlice"
import { createCroppedImageFile } from "@/utils/imageCrop"

export default function HeaderMe() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const me = useSelector((state: RootState) => state.auth.user)
  const [menuOpen, setMenuOpen] = useState(false)
  const [savingAvatar, setSavingAvatar] = useState(false)

  const [cropOpen, setCropOpen] = useState(false)
  const [cropImageUrl, setCropImageUrl] = useState("")
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1.2)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", onClickOutside)
    return () => {
      document.removeEventListener("mousedown", onClickOutside)
    }
  }, [])

  const closeCropModal = () => {
    setCropOpen(false)
    setCrop({ x: 0, y: 0 })
    setZoom(1.2)
    setCroppedAreaPixels(null)

    if (cropImageUrl) {
      URL.revokeObjectURL(cropImageUrl)
      setCropImageUrl("")
    }
  }

  const startCropAvatar = (file: File) => {
    if (!file.type.startsWith("image/")) return

    const nextUrl = URL.createObjectURL(file)
    if (cropImageUrl) {
      URL.revokeObjectURL(cropImageUrl)
    }

    setCropImageUrl(nextUrl)
    setCrop({ x: 0, y: 0 })
    setZoom(1.2)
    setCroppedAreaPixels(null)
    setCropOpen(true)
  }

  const onConfirmUploadAvatar = async () => {
    if (!cropImageUrl || !croppedAreaPixels) return

    setSavingAvatar(true)
    try {
      const avatarFile = await createCroppedImageFile(
        cropImageUrl,
        croppedAreaPixels,
        {
          outputSize: 512,
          mimeType: "image/png",
          fileName: `avatar-${Date.now()}.png`,
        }
      )
      const sign = await getUploadAvatarSignApi()
      await uploadWithSignedUrlApi(avatarFile, sign, {
        contentType: avatarFile.type || "image/png",
      })
      await updateProfileApi({ avatar: sign.key })
      const nextUser = await meApi()
      dispatch(updateUser(nextUser))
      closeCropModal()
      setMenuOpen(false)
    } finally {
      setSavingAvatar(false)
    }
  }

  if (!me) {
    return null
  }

  const displayName = me.name || t("header.me.fallbackName")
  const avatarText = displayName.charAt(0).toUpperCase()
  const avatarUrl = me.avatar || ""

  return (
    <>
      <div className="ui-header-dropdown-wrap" ref={menuRef}>
        <button
          type="button"
          onClick={() => {
            setMenuOpen((prev) => !prev)
          }}
          className="ui-header-profile-trigger"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="ui-header-avatar-img"
            />
          ) : (
            <span className="ui-header-avatar-fallback">{avatarText}</span>
          )}
          <span className="ui-header-profile-name">{displayName}</span>
          <svg
            className={`ui-header-trigger-icon ${menuOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 011.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {menuOpen && (
          <div className="ui-header-menu ui-header-menu-md">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="ui-hidden"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0]
                if (file) {
                  startCropAvatar(file)
                }
                e.currentTarget.value = ""
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={savingAvatar}
              className="ui-header-item"
            >
              {t("header.me.uploadAvatar")}
            </button>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="ui-header-item"
            >
              {t("header.me.profile")}
            </Link>
            <Link
              to="/logout"
              onClick={() => setMenuOpen(false)}
              className="ui-header-item ui-header-item-danger"
            >
              {t("header.me.logout")}
            </Link>
          </div>
        )}
      </div>

      <ImageCropperModal
        open={cropOpen}
        imageUrl={cropImageUrl}
        crop={crop}
        zoom={zoom}
        confirming={savingAvatar}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={setCroppedAreaPixels}
        onCancel={closeCropModal}
        onConfirm={() => void onConfirmUploadAvatar()}
        title={t("header.me.crop.title")}
        description={t("header.me.crop.description")}
        zoomLabel={t("header.me.crop.zoom")}
        cancelLabel={t("header.me.crop.cancel")}
        confirmLabel={t("header.me.crop.confirm")}
        confirmingLabel={t("header.me.crop.confirming")}
      />
    </>
  )
}
