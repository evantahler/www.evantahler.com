import { describe, expect, it, vi } from "vitest";
import { cleanText, loadPage } from "./_helpers";

vi.mock("vitepress", () => ({
  createContentLoader: () => ({}),
}));

const { loadPosts } = await import("../../.vitepress/data/posts");

describe("blog index (/blog/)", () => {
  const page = loadPage("/blog/");
  const posts = loadPosts();

  it("renders an h1", () => {
    expect(page.querySelector("h1")).toBeTruthy();
  });

  it("renders year-grouping h2 headings (4-digit years)", () => {
    const yearH2s = page
      .querySelectorAll(".vp-doc h2")
      .map((h) => cleanText(h.textContent))
      .filter((t) => /^\d{4}$/.test(t));
    expect(yearH2s.length).toBeGreaterThan(0);
  });

  it("links to every non-unlisted post", () => {
    const links = page.querySelectorAll('a[href^="/blog/post/"]');
    const hrefs = new Set(
      links.map((l) => l.getAttribute("href") ?? "").filter(Boolean),
    );
    for (const post of posts) {
      expect(
        hrefs.has(post.url) || hrefs.has(`${post.url}.html`),
        `Expected blog index to link to ${post.url}`,
      ).toBe(true);
    }
  });

  it("renders post images for posts that declare one", () => {
    const imgs = page.querySelectorAll(".vp-doc img");
    expect(imgs.length).toBeGreaterThan(0);
    for (const img of imgs) {
      expect((img.getAttribute("src") ?? "").length).toBeGreaterThan(0);
    }
  });
});
