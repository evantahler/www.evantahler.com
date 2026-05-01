import { describe, expect, it, vi } from "vitest";
import { loadPage } from "./_helpers";

vi.mock("vitepress", () => ({
  createContentLoader: () => ({}),
}));

const { loadPosts } = await import("../../.vitepress/data/posts");

const POSTS = loadPosts();
const allTags = new Set<string>();
for (const p of POSTS) for (const t of p.meta.tags) allTags.add(t);

describe("tags index (/blog/tags)", () => {
  const page = loadPage("/blog/tags");

  it("links to every distinct tag's tag page", () => {
    const renderedHrefs = new Set(
      page
        .querySelectorAll('a[href^="/blog/tag/"]')
        .map((a) => a.getAttribute("href") ?? ""),
    );
    for (const tag of allTags) {
      expect(
        renderedHrefs.has(`/blog/tag/${tag}`) ||
          renderedHrefs.has(`/blog/tag/${tag}.html`),
        `Expected tag link for "${tag}"`,
      ).toBe(true);
    }
  });
});
