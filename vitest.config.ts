import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: false
    }
  }
});
