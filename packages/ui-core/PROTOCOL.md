# @workspace/ui-core Protocol (Constitution)

This is the highest-priority rule set for `@workspace/ui-core`.

## Non-Negotiable Principle

Headless is the only principle. Any implementation that conflicts with headless is not allowed.

## Mandatory Enforcement

- AI must follow this protocol strictly.
- Any conflict must be resolved in favor of this protocol.
- `src/headless/*` is the only public interface of `ui-core`.
- `src/components/*` is raw generation space only, not final API.
- No dependency on upper-layer UI libraries inside `ui-core`.
- Visual/library-specific concerns must stay outside `ui-core`.

## Purpose

`ui-core` defines behavior contracts, accessibility wiring, composition APIs, and token hooks.

This package is **not** the place for product visual design decisions.

## Source Of Truth (Important)

- `src/components/*`: shadcn CLI generated **raw source**.
- `src/headless/*`: manually refactored **headless layer**, this is the **public interface** for app usage.

Do not treat `src/components/*` as final API.

## Mandatory Workflow (For AI)

When creating a new component in `ui-core`, follow this order strictly:

1. Generate baseline code with shadcn CLI first.
2. Keep generated raw files in `src/components/<component>.tsx` (or generated layout by CLI).
3. Move raw file into headless workspace first: `src/headless/<component>/<component>.tsx` (raw can still be kept in `src/components/*` for reference).
4. Split headless implementation into `*.tsx`, `*.styles.ts`, `*.types.ts`.
5. Follow existing `src/headless/button` pattern when implementing headless components.
6. Add full controllability APIs (`unstyled`, `classNameMode`, `classResolver`) when needed.
7. Run lint gate first: `pnpm -C packages/ui-core lint`. Do not continue if failed.
8. Run type gate: `pnpm -C packages/ui-core typecheck`.
9. Enforce `index.ts` explicit export style to match `button` (no wildcard `export *` in public headless entry).
10. Export headless component through package `exports` and `index.ts`.

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

## Headless Component Convention

Headless component files must follow:

```text
src/headless/component-name/
  component-name.tsx
  component-name.styles.ts
  component-name.types.ts
  index.ts
```

Use `src/headless/button` as the reference sample for coding style and controllability API design.

## Public Export Rule (Strict)

Each `src/headless/<component>/index.ts` must use explicit exports like `button`:

```ts
export { Component } from "./component"
export { componentStylesOrVariants } from "./component.styles"
export type { ComponentProps, ComponentTypes } from "./component.types"
```

Do not use wildcard exports (`export *`) in public headless `index.ts`.

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

## Output checklist

- Generated via shadcn CLI first.
- Raw file kept in `src/components/*`.
- Raw moved/copied into `src/headless/<component>/<component>.tsx` before refactor.
- Headless version implemented in `src/headless/*` using the sample pattern.
- Supports external full style control when applicable.
- Uses tokens from `globals.css` and `state.css`.
- Keeps API stable and explicit through `index.ts` and package `exports`.
- `pnpm -C packages/ui-core lint` passes.
- `pnpm -C packages/ui-core typecheck` passes.
- `index.ts` uses explicit `button`-style exports only.

## Styling inputs

- Base theme tokens come from `globals.css`.
- Interaction state tokens come from `state.css`.
- Components should consume tokens instead of hardcoded product colors.
