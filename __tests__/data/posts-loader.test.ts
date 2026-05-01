import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let originalCwd: string;
let tmpRoot: string;

beforeAll(() => {
  originalCwd = process.cwd();
  tmpRoot = mkdtempSync(join(tmpdir(), "posts-loader-"));
  const postDir = join(tmpRoot, "blog", "post");
  mkdirSync(postDir, { recursive: true });

  writeFileSync(
    join(postDir, "alpha.md"),
    [
      "---",
      "title: Alpha",
      "date: 2024-01-01",
      "tags: [a, b]",
      "image: /img/a.png",
      "featured: true",
      "description: alpha desc",
      "canonical: https://example.com/a",
      "author: Evan",
      "---",
      "body",
    ].join("\n"),
  );
  writeFileSync(
    join(postDir, "beta.md"),
    ["---", "title: Beta", "date: 2024-06-01", "---", "body"].join("\n"),
  );
  writeFileSync(
    join(postDir, "gamma.md"),
    [
      "---",
      "title: Gamma",
      "date: 2025-01-01",
      "unlisted: true",
      "---",
      "body",
    ].join("\n"),
  );
  writeFileSync(
    join(postDir, "no-title.md"),
    ["---", "date: 2024-01-01", "---", "body"].join("\n"),
  );
  writeFileSync(
    join(postDir, "no-date.md"),
    ["---", "title: NoDate", "---", "body"].join("\n"),
  );
  writeFileSync(join(postDir, "ignored.txt"), "not markdown");

  process.chdir(tmpRoot);
});

afterAll(() => {
  process.chdir(originalCwd);
  rmSync(tmpRoot, { recursive: true, force: true });
});

describe("loadPosts", () => {
  it("filters unlisted, missing-title, missing-date and sorts newest-first", async () => {
    const { loadPosts } = await import("../../.vitepress/data/posts");
    const posts = loadPosts();
    expect(posts.map((p) => p.slug)).toEqual(["beta", "alpha"]);
  });

  it("derives url from slug and applies meta defaults", async () => {
    const { loadPosts } = await import("../../.vitepress/data/posts");
    const posts = loadPosts();

    const alpha = posts.find((p) => p.slug === "alpha");
    expect(alpha).toBeDefined();
    if (!alpha) return;
    expect(alpha.url).toBe("/blog/post/alpha");
    expect(alpha.meta.tags).toEqual(["a", "b"]);
    expect(alpha.meta.image).toBe("/img/a.png");
    expect(alpha.meta.featured).toBe(true);
    expect(alpha.meta.canonical).toBe("https://example.com/a");
    expect(alpha.meta.author).toBe("Evan");

    const beta = posts.find((p) => p.slug === "beta");
    expect(beta).toBeDefined();
    if (!beta) return;
    expect(beta.meta.tags).toEqual([]);
    expect(beta.meta.image).toBe("");
    expect(beta.meta.featured).toBe(false);
    expect(beta.meta.canonical).toBeUndefined();
  });
});
