import { describe, expect, it, vi } from "vitest";
import { loadPage } from "./_helpers";

vi.mock("vitepress", () => ({
  createContentLoader: () => ({}),
}));

const { loadPosts } = await import("../../.vitepress/data/posts");

const POSTS = loadPosts();

const tagCounts: Record<string, number> = {};
for (const p of POSTS)
  for (const t of p.meta.tags) tagCounts[t] = (tagCounts[t] ?? 0) + 1;
const SAMPLE_TAG = Object.entries(tagCounts).sort(
  (a, b) => b[1] - a[1],
)[0]?.[0];

describe("blog tag page (/blog/tag/<tag>)", () => {
  if (!SAMPLE_TAG) {
    it.skip("no tags found", () => {});
    return;
  }

  const page = loadPage(`/blog/tag/${SAMPLE_TAG}`);

  it("renders an h1 mentioning the tag", () => {
    const h1Text = page.querySelector("h1")?.textContent ?? "";
    expect(h1Text).toContain(SAMPLE_TAG);
  });

  it("links to every post that has this tag (and no others)", () => {
    const expectedSlugs = new Set(
      POSTS.filter((p) => p.meta.tags.includes(SAMPLE_TAG)).map((p) => p.slug),
    );
    const renderedHrefs = new Set(
      page
        .querySelectorAll('.vp-doc a[href^="/blog/post/"]')
        .map((a) => a.getAttribute("href") ?? ""),
    );
    for (const slug of expectedSlugs) {
      expect(
        renderedHrefs.has(`/blog/post/${slug}`) ||
          renderedHrefs.has(`/blog/post/${slug}.html`),
        `Expected /blog/post/${slug} on tag page for "${SAMPLE_TAG}"`,
      ).toBe(true);
    }
    expect(renderedHrefs.size).toBe(expectedSlugs.size);
  });
});
