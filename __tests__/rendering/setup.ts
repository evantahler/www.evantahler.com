export default async function setup() {
  // Real implementation lives below. The rendering suite needs the
  // VitePress build output in .vitepress/dist/. Set SKIP_BUILD=1 to
  // reuse an existing build (e.g. CI's prior `bun run build` step).
  // Set SKIP_RENDERING=1 to skip building entirely (e.g. when running
  // only data/content/component suites locally).
  if (process.env.SKIP_RENDERING === "1" || process.env.SKIP_BUILD === "1") {
    return;
  }

  const { existsSync } = await import("node:fs");
  const { join } = await import("node:path");
  const { spawnSync } = await import("node:child_process");

  const distIndex = join(process.cwd(), ".vitepress", "dist", "index.html");

  // eslint-disable-next-line no-console
  console.log("[vitest setup] Running `vitepress build` for rendering tests…");
  const result = spawnSync("bunx", ["vitepress", "build"], {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });
  if (result.status !== 0) {
    throw new Error(
      `vitepress build failed (exit ${result.status}). Cannot run rendering tests.`,
    );
  }
  if (!existsSync(distIndex)) {
    throw new Error(
      `Build completed but ${distIndex} is missing — vitepress output layout may have changed.`,
    );
  }
}
