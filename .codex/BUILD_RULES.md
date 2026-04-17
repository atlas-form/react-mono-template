# Build And Script Rules

## Rule

For build, typecheck, lint, test, dev, preview, format, and clean operations in this repository:

- Always use the exact script defined in the nearest relevant `package.json`.
- At repo root, prefer root scripts such as `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm dev`, and `pnpm format`.
- For app or package scoped work, prefer `pnpm -C <dir> <script>` using the script defined in that package.
- Do not run ad hoc compile or build commands when a package script already exists.

## Forbidden Without Explicit User Request

Do not run these commands directly unless the user explicitly asks for that exact command:

```bash
tsc
pnpm exec tsc
npx tsc
vite build
vitest
eslint
```

Use the corresponding `package.json` script instead.

## TypeScript Safety

- Never run a root-level TypeScript emit command.
- Never use `tsc` in a way that can emit `.js` into `src/`.
- If diagnosing build behavior, inspect the relevant `package.json` script first, then use that script to reproduce.

## Examples

```bash
rtk pnpm build
rtk pnpm -C apps/admin build
rtk pnpm -C apps/web test
rtk pnpm typecheck
```

## Verification

Before running a build-related command, verify the script source first:

```bash
rtk cat package.json
rtk cat apps/admin/package.json
```
