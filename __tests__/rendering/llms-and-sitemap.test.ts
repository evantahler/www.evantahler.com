import { existsSync, readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { distPath } from "./_helpers";

describe("generated artifacts", () => {
  it("emits llms.txt with non-trivial content", () => {
    const file = distPath("llms.txt");
    expect(existsSync(file), "llms.txt should exist").toBe(true);
    expect(statSync(file).size).toBeGreaterThan(100);
  });

  it("emits llms-full.txt with substantial content", () => {
    const file = distPath("llms-full.txt");
    expect(existsSync(file), "llms-full.txt should exist").toBe(true);
    expect(statSync(file).size).toBeGreaterThan(1000);
  });

  it("emits sitemap.xml that includes the home URL", () => {
    const file = distPath("sitemap.xml");
    expect(existsSync(file), "sitemap.xml should exist").toBe(true);
    const xml = readFileSync(file, "utf8");
    expect(xml).toContain("<loc>https://www.evantahler.com/</loc>");
  });

  it("excludes per-tag pages from the sitemap (only /blog/tags index allowed)", () => {
    const xml = readFileSync(distPath("sitemap.xml"), "utf8");
    // Per-tag URLs look like /blog/tag/<name>; the tags index is /blog/tags.
    const perTag = xml.match(/\/blog\/tag\/[a-z0-9-]+/gi) ?? [];
    expect(perTag).toEqual([]);
  });

  it("excludes the 404 page from the sitemap", () => {
    const xml = readFileSync(distPath("sitemap.xml"), "utf8");
    expect(xml).not.toMatch(/\/404\b/);
  });
});
