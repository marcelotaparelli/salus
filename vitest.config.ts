import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    pool: "forks",
    hookTimeout: 10000,
    env: {
      ARGON2_PEPPER: "pepper-de-teste-para-ambiente-de-teste",
      JWT_SECRET: "secret-de-teste-para-ambiente-de-teste",
    },
  },
  resolve: {
    alias: {
      "@domain": "./src/domain",
      "@application": "./src/application",
      "@infra": "./src/infra",
      "@config": "./src/config",
      "@shared": "./src/shared",
    },
  },
});
