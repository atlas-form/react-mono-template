import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStoredThemeMode, setThemeMode, type ThemeMode } from "@workspace/ui-theme";

const THEME_OPTIONS: Array<{ value: ThemeMode; key: string }> = [
  { value: "system", key: "header.theme.system" },
  { value: "light", key: "header.theme.light" },
  { value: "dark", key: "header.theme.dark" },
];

export default function HeaderThemeSwitcher() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(getStoredThemeMode());
  const menuRef = useRef<HTMLDivElement>(null);

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

  const currentOption =
    THEME_OPTIONS.find((item) => item.value === theme) ?? THEME_OPTIONS[0];

  return (
    <div className="ui-header-dropdown-wrap" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="ui-header-trigger"
      >
        <span>{t(currentOption.key)}</span>
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
          {THEME_OPTIONS.map((item) => {
            const active = theme === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setTheme(item.value);
                  setThemeMode(item.value);
                  setOpen(false);
                }}
                className={`ui-header-item ${active ? "ui-header-item-active" : ""}`}
              >
                {t(item.key)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
