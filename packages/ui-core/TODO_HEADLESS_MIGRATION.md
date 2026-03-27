# UI Core Headless Migration TODO

Updated: 2026-03-27T03:41:36.073Z

Rules (from README):
- Generate raw with shadcn CLI into `src/components/*`.
- Refactor final API into `src/headless/*` based on `src/headless/button`.
- Keep raw files; do not delete raw by default.

Already implemented headless baseline: `button`, `input`, `select`.

| Component | Raw (src/components) | Headless (src/headless) | Notes |
|---|---|---|---|
| accordion | DONE | DONE |  |
| alert | DONE | DONE |  |
| alert-dialog | DONE | DONE |  |
| aspect-ratio | DONE | DONE |  |
| avatar | DONE | DONE |  |
| badge | DONE | DONE |  |
| breadcrumb | DONE | DONE |  |
| button-group | DONE | DONE |  |
| calendar | DONE | DONE |  |
| card | DONE | DONE |  |
| carousel | DONE | DONE |  |
| chart | DONE | DONE |  |
| checkbox | DONE | DONE |  |
| collapsible | DONE | DONE |  |
| combobox | DONE | DONE |  |
| command | DONE | DONE |  |
| context-menu | DONE | DONE |  |
| dialog | DONE | DONE |  |
| direction | DONE | DONE |  |
| drawer | DONE | DONE |  |
| dropdown-menu | DONE | DONE |  |
| empty | DONE | DONE |  |
| field | DONE | DONE |  |
| form | TODO | TODO |  |
| hover-card | DONE | DONE |  |
| input-group | DONE | DONE |  |
| input-otp | DONE | DONE |  |
| item | DONE | DONE |  |
| kbd | DONE | DONE |  |
| label | DONE | DONE |  |
| menubar | DONE | DONE |  |
| navigation-menu | DONE | DONE |  |
| native-select | DONE | DONE |  |
| pagination | DONE | DONE |  |
| popover | DONE | DONE |  |
| progress | DONE | DONE |  |
| radio-group | DONE | DONE |  |
| resizable | DONE | DONE |  |
| scroll-area | DONE | DONE |  |
| separator | DONE | DONE |  |
| sheet | DONE | DONE |  |
| sidebar | DONE | DONE |  |
| skeleton | DONE | DONE |  |
| slider | DONE | DONE |  |
| sonner | DONE | DONE |  |
| spinner | DONE | DONE |  |
| switch | DONE | DONE |  |
| table | DONE | DONE |  |
| tabs | DONE | DONE |  |
| textarea | DONE | DONE |  |
| toggle | DONE | DONE |  |
| toggle-group | DONE | DONE |  |
| tooltip | DONE | DONE |  |

## Execution Order
1. Add all raw components via CLI (skip button/input/select).
2. Migrate one by one to headless format.
3. Update package exports to point to headless interfaces.
4. Run typecheck after each batch and final pass.

Notes:
- `form` does not generate files in current `radix-nova` registry item (metadata-only), so raw/headless stay TODO until upstream provides source.
