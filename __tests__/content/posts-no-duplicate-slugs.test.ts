import { readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { describe, expect, it } from "vitest";

describe("blog post slugs", () => {
  it("no two posts share the same slug", () => {
    const dir = join(process.cwd(), "blog", "post");
    const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
    const slugs = files.map((f) => basename(f, extname(f)));
    const seen = new Map<string, number>();
    for (const slug of slugs) seen.set(slug, (seen.get(slug) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, n]) => n > 1);
    expect(dupes).toEqual([]);
  });
});
