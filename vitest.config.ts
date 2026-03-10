import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    pool: "forks",
    hookTimeout: 10000,
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
