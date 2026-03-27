import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import vitest from "@vitest/eslint-plugin"
import prettier from "eslint-config-prettier"

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_"
      }]
    }
  },
  {
    files: ["tests/**/*.ts"],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  }
)
