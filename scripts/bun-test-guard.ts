// Bun's built-in test runner doesn't support this project's tests
// (Vitest's vi.mock semantics, @vue/test-utils + happy-dom). Loaded via
// `bunfig.toml` [test] preload so `bun test` exits before discovering
// any test files.

console.error(
  [
    "",
    "\x1b[31m[bun test] This project uses Vitest, not Bun's built-in test runner.\x1b[0m",
    "",
    "  \x1b[32mbun run test\x1b[0m         — full suite (builds the site, runs all 242 tests)",
    "  \x1b[32mbun run test:unit\x1b[0m    — fast suite (data + content + component, no build)",
    "  \x1b[32mbun run test:coverage\x1b[0m",
    "",
  ].join("\n"),
);
process.exit(1);
