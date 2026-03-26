import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "zhCN", label: "简体中文" },
];

export default function HeaderLanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentLang = i18n.language || "en";
  const currentOption =
    LANGUAGE_OPTIONS.find((item) => item.value === currentLang) ??
    LANGUAGE_OPTIONS.find((item) => currentLang.startsWith(item.value)) ??
    LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div className="ui-header-dropdown-wrap" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="ui-header-trigger"
      >
        <span>{currentOption.label}</span>
        <svg
          className={`ui-header-trigger-icon ${open ? "rotate-180" : ""}`}
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

      {open && (
        <div className="ui-header-menu ui-header-menu-sm">
          {LANGUAGE_OPTIONS.map((item) => {
            const active =
              currentLang === item.value || currentLang.startsWith(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  void i18n.changeLanguage(item.value);
                  setOpen(false);
                }}
                className={`ui-header-item ${active ? "ui-header-item-active" : ""}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
