# @workspace/ui-components PROTOCOL

## Constitutional Position

`@workspace/ui-components` is the product-facing styled UI layer built on top of `@workspace/ui-core`.

This package is the default UI entry for app packages.

## Layer Contract

- `@workspace/ui-core`: headless primitives, structure, behavior contracts.
- `@workspace/ui-components`: visual language, theming, product-ready defaults.

No product visual decisions belong in `ui-core`.

## Public Usage Rule

Application code should import from `@workspace/ui-components` first.

```tsx
import "@workspace/ui-components/styles.css"
import { Button } from "@workspace/ui-components"
```

```tsx
<Button tone="primary">Submit</Button>
<Button tone="secondary">Secondary</Button>
<Button tone="subtle">Cancel</Button>
```

## Build Rule For New Components

Every new component in `ui-components` must follow this sequence:

1. Start from `ui-core` primitives and contracts.
2. Apply visual and product decisions in `ui-components` only.
3. Export stable, app-consumable API from `ui-components`.

## App Policy

- Default: app packages use `@workspace/ui-components`.
- Exception: app packages may use `@workspace/ui-core` directly only for special requirements.
- If app code uses `ui-core` directly, it must be wrapped in app-level components and kept local to that app.

## AI Execution Rules

For any AI agent modifying this package:

1. Treat this protocol as mandatory.
2. Do not move product styling into `ui-core`.
3. Do not bypass `ui-components` as the default app entry.
4. Keep API and visual conventions consistent with existing components.
5. If protocol conflicts with convenience, protocol wins.
