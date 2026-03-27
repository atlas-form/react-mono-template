# @workspace/ui-components

Styled component layer on top of `@workspace/ui-core`.

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
