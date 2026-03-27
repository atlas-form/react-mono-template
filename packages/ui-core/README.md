# @workspace/ui-core

Headless UI primitives for the workspace.

## Purpose

`ui-core` only defines behavior contracts, accessibility wiring, composition APIs, and token hooks.

This package is **not** the place for product visual design decisions.

## Mandatory Workflow (For AI)

When creating a new component in `ui-core`, follow this order strictly:

1. Generate baseline code with shadcn CLI first.
2. Refactor generated files into the `ui-core` headless convention.
3. Add full controllability APIs (`unstyled`, `classNameMode`, `classResolver`) when needed.
4. Export through package `exports` and component `index.ts`.

Do **not** start from scratch for standard components that exist in shadcn.

### CLI command

Run from this workspace:

```bash
pnpm -C packages/ui-core exec shadcn add <component-name>
```

Examples:

```bash
pnpm -C packages/ui-core exec shadcn add button
pnpm -C packages/ui-core exec shadcn add input
pnpm -C packages/ui-core exec shadcn add select
```

## Design boundaries

- Put logic and primitive building blocks in `ui-core`.
- Keep components fully controllable by callers.
- Keep default classes minimal and override-friendly.
- Do not add product-specific branding styles here.
- Do not place product branding or business visual decisions here.

## Where styled components should live

Use `@workspace/ui-components` for pre-designed, opinionated components.

- `ui-core`: headless primitives.
- `ui-components`: styled wrappers built on `ui-core`.

## App consumption policy (important)

- Default: application packages should consume `@workspace/ui-components`.
- `@workspace/ui-core` is not the default app-facing layer.
- Exception: direct app usage of `ui-core` is allowed only for special requirements.
- In that exception case, keep it wrapped in app-local components instead of spreading raw headless usage.

## Structure convention

Each component should use this layout:

```text
component-name/
  component-name.tsx
  component-name.styles.ts
  component-name.types.ts
  index.ts
```

## Output checklist

- Generated via shadcn CLI first.
- Moved into folder-based structure.
- Supports external full style control when applicable.
- Uses tokens from `globals.css` and `state.css`.
- Keeps API stable and explicit through `index.ts`.

## Styling inputs

- Base theme tokens come from `globals.css`.
- Interaction state tokens come from `state.css`.
- Components should consume tokens instead of hardcoded product colors.
