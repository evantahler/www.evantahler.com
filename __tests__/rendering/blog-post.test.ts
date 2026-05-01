import { describe, expect, it, vi } from "vitest";
import { cleanText, loadPage } from "./_helpers";

vi.mock("vitepress", () => ({
  createContentLoader: () => ({}),
}));

const { loadPosts } = await import("../../.vitepress/data/posts");

const POSTS = loadPosts();
// Pick the most-recent post that has both tags and an image so we can
// assert against the full BlogPostHeader + content surface.
const SAMPLE = POSTS.find(
  (p) => (p.meta.tags?.length ?? 0) > 0 && p.meta.image,
);

describe("blog post (/blog/post/<slug>)", () => {
  if (!SAMPLE) {
    it.skip("no suitable sample post found", () => {});
    return;
  }

  const page = loadPage(SAMPLE.url);

  it("renders the BlogPostHeader with the post title", () => {
    expect(page.querySelector(".post-header")).toBeTruthy();
    expect(cleanText(page.querySelector(".post-header h1")?.textContent)).toBe(
      SAMPLE.meta.title,
    );
  });

  it("renders a formatted date in the meta block", () => {
    const meta = cleanText(
      page.querySelector(".post-header .meta")?.textContent,
    );
    const year = String(new Date(SAMPLE.meta.date).getFullYear());
    expect(meta).toContain(year);
  });

  it("renders a tag pill linking to /blog/tag/<tag> for every tag", () => {
    const renderedTags = page
      .querySelectorAll(".post-header a.tag")
      .map((a) => ({
        text: cleanText(a.textContent),
        href: a.getAttribute("href") ?? "",
      }));
    for (const tag of SAMPLE.meta.tags) {
      const match = renderedTags.find((r) => r.text === tag);
      expect(match, `Expected rendered tag pill for "${tag}"`).toBeDefined();
      expect(match?.href).toBe(`/blog/tag/${tag}`);
    }
  });

  it("renders body content with at least one heading and paragraph", () => {
    const headings = page.querySelectorAll(".vp-doc h2, .vp-doc h3");
    const paragraphs = page.querySelectorAll(".vp-doc p");
    expect(headings.length).toBeGreaterThan(0);
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("renders at least one image", () => {
    const imgs = page.querySelectorAll(".vp-doc img");
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0].getAttribute("src")).toBeTruthy();
  });

  it("emits a <title> and meta description that reflect the post", () => {
    expect(cleanText(page.querySelector("title")?.textContent)).toContain(
      SAMPLE.meta.title,
    );
    if (SAMPLE.meta.description) {
      expect(
        page.querySelector('meta[name="description"]')?.getAttribute("content"),
      ).toBe(SAMPLE.meta.description);
    }
  });
});

describe("blog post with canonical link", () => {
  const sampleWithCanonical = POSTS.find((p) => p.meta.canonical);

  if (!sampleWithCanonical) {
    it.skip("no post with canonical found", () => {});
    return;
  }

  it("renders 'Originally posted at' with the canonical URL", () => {
    const page = loadPage(sampleWithCanonical.url);
    const meta = page.querySelector(".post-header .meta");
    expect(cleanText(meta?.textContent)).toContain("Originally posted at");
    const link = meta?.querySelector(
      `a[href="${sampleWithCanonical.meta.canonical}"]`,
    );
    expect(link, "canonical link should appear in meta").toBeTruthy();
    expect(link?.getAttribute("target")).toBe("_blank");
  });
});
