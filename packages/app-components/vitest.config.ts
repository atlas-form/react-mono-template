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
          "../ui-core/src/components/dropdown-menu/index.ts"
        ),
      },
      {
        find: "@workspace/ui-core/components/table",
        replacement: path.resolve(
          __dirname,
          "../ui-core/src/components/table/index.ts"
        ),
      },
      {
        find: "@workspace/ui-core/lib/utils.js",
        replacement: path.resolve(__dirname, "../ui-core/src/lib/utils.ts"),
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
        replacement: `${path.resolve(__dirname, "../ui-components/src")}/$1`,
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
