import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@workspace/ui-components/custom/data-table-inline-select",
        replacement: path.resolve(
          __dirname,
          "../ui-components/src/components/custom/data-table-inline-select/index.ts"
        ),
      },
      {
        find: "@workspace/ui-components/custom/data-table-surface",
        replacement: path.resolve(
          __dirname,
          "../ui-components/src/components/custom/data-table-surface/index.ts"
        ),
      },
      {
        find: "@workspace/ui-core/components/dropdown-menu",
        replacement: path.resolve(
          __dirname,
          "../ui-core/src/primitives/dropdown-menu/index.ts"
        ),
      },
      {
        find: "@workspace/ui-core/components/table",
        replacement: path.resolve(
          __dirname,
          "../ui-core/src/primitives/table/index.ts"
        ),
      },
      {
        find: "@workspace/ui-core/lib/utils.js",
        replacement: path.resolve(__dirname, "../ui-core/src/lib/utils.ts"),
      },
      {
        find: /^@workspace\/ui-core\/components\/(.*)$/,
        replacement: `${path.resolve(__dirname, "../ui-core/src/primitives")}/$1/index.ts`,
      },
      {
        find: /^@workspace\/ui-core\/lib\/(.*)\.js$/,
        replacement: `${path.resolve(__dirname, "../ui-core/src/lib")}/$1.ts`,
      },
      {
        find: /^@workspace\/app-components$/,
        replacement: path.resolve(__dirname, "./src/index.ts"),
      },
      {
        find: /^@workspace\/app-components\/(.*)$/,
        replacement: `${path.resolve(__dirname, "./src")}/$1`,
      },
      {
        find: /^@workspace\/shared-i18n$/,
        replacement: path.resolve(__dirname, "../shared-i18n/src/index.ts"),
      },
      {
        find: /^@workspace\/shared-i18n\/(.*)$/,
        replacement: `${path.resolve(__dirname, "../shared-i18n/src")}/$1`,
      },
      {
        find: /^@workspace\/ui-components$/,
        replacement: path.resolve(__dirname, "../ui-components/src/index.ts"),
      },
      {
        find: /^@workspace\/ui-components\/(.*)$/,
        replacement: `${path.resolve(__dirname, "../ui-components/src/components")}/$1`,
      },
      {
        find: /^@workspace\/ui-core$/,
        replacement: path.resolve(__dirname, "../ui-core/src/index.ts"),
      },
      {
        find: /^@workspace\/ui-core\/(.*)$/,
        replacement: `${path.resolve(__dirname, "../ui-core/src")}/$1`,
      },
      {
        find: /^@workspace\/ui-theme$/,
        replacement: path.resolve(__dirname, "../ui-theme/src/index.ts"),
      },
      {
        find: /^@workspace\/ui-theme\/(.*)$/,
        replacement: `${path.resolve(__dirname, "../ui-theme/src")}/$1`,
      },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
})
