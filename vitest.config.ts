import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      "@domain": "./src/domain",
      "@application": "./src/application",
      "@infra": "./src/infra",
      "@config": "./src/config",
    },
  },
});
