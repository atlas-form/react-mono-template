# Styles Guide

Use this directory as the single source of truth for reusable UI styles.

## Directories

- `tokens/`: design tokens by concern
  - `color-semantic.css`
  - `radius.css`
  - `shadow.css`
  - `typography.css`
- `recipes/`: semantic component classes (`ui-*`) by component type
  - `base/`
    - `button.css`
    - `input.css`
    - `text.css`
  - `auth.css`
  - `header.css`
  - `modal.css`
  - `panel.css`
  - `system.css`

## Rules

1. Prefer semantic `ui-*` classes from `recipes/*.css` in pages/components.
2. Keep Tailwind utility strings in page files for layout only (`grid`, `flex`, `gap`, `mt-*`).
3. For new component types, add a new file under `recipes/` first, then use it in pages.
4. Avoid hardcoded colors and arbitrary values in page files. Use theme variables/tokens.
