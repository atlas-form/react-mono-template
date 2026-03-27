# @workspace/ui-components

Styled component layer on top of `@workspace/ui-core`.

## Package goal

This package is the **default UI entry** for application packages.

App code should consume `@workspace/ui-components` first.

## Position in the design system

- `@workspace/ui-core`: headless primitives and behavior contracts.
- `@workspace/ui-components`: pre-designed components for product use.

Use this package when you want ready-to-use UI with default visual decisions.

## Usage

```tsx
import "@workspace/ui-components/styles.css"
import { Button } from "@workspace/ui-components"
```

```tsx
<Button tone="primary">Submit</Button>
<Button tone="secondary">Secondary</Button>
<Button tone="subtle">Cancel</Button>
```

## Rule for future components

- Build behavior from `@workspace/ui-core` primitives.
- Keep visual decisions here.
- Do not put product styling back into `ui-core`.

## App usage policy (important)

- Default: app packages should use `@workspace/ui-components`.
- Exception: app packages may use `@workspace/ui-core` directly only for special requirements.
- If using `ui-core` directly in app code, wrap it in an app-level component and keep that decision local.
