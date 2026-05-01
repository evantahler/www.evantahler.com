import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["__tests__/**/*.test.ts"],
    globalSetup: ["__tests__/rendering/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      include: [
        ".vitepress/data/**/*.ts",
        ".vitepress/theme/**/*.{ts,vue}",
        "data/**/*.ts",
        "blog/tag/**/*.ts",
      ],
      exclude: [
        ".vitepress/cache/**",
        ".vitepress/dist/**",
        // Live GitHub API loader — covered by the integration build, not unit tests.
        ".vitepress/data/github.data.ts",
        // Theme entry — Vercel Analytics injection runs only in a real browser.
        ".vitepress/theme/index.ts",
      ],
    },
  },
});
