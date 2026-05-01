import type { ContentData } from "vitepress";
import { describe, expect, it, vi } from "vitest";

vi.mock("vitepress", () => ({
  createContentLoader: () => ({}),
}));

const { transformPosts } = await import("../../.vitepress/data/posts.data");

function fixture(
  url: string,
  frontmatter: Record<string, unknown>,
): ContentData {
  return {
    url,
    frontmatter,
    src: undefined,
    html: undefined,
    excerpt: undefined,
  };
}

describe("transformPosts", () => {
  it("filters posts missing title or date", () => {
    const out = transformPosts([
      fixture("/blog/post/no-title", { date: "2024-01-01" }),
      fixture("/blog/post/no-date", { title: "x" }),
      fixture("/blog/post/ok", { title: "Ok", date: "2024-01-01" }),
    ]);
    expect(out.map((p) => p.slug)).toEqual(["ok"]);
  });

  it("filters unlisted posts", () => {
    const out = transformPosts([
      fixture("/blog/post/visible", { title: "v", date: "2024-01-01" }),
      fixture("/blog/post/hidden", {
        title: "h",
        date: "2024-02-01",
        unlisted: true,
      }),
    ]);
    expect(out.map((p) => p.slug)).toEqual(["visible"]);
  });

  it("sorts newest-first by date", () => {
    const out = transformPosts([
      fixture("/blog/post/old", { title: "Old", date: "2020-01-01" }),
      fixture("/blog/post/new", { title: "New", date: "2025-01-01" }),
      fixture("/blog/post/mid", { title: "Mid", date: "2023-06-01" }),
    ]);
    expect(out.map((p) => p.slug)).toEqual(["new", "mid", "old"]);
  });

  it("strips /blog/post/ prefix, trailing slash, and .html suffix from slug", () => {
    const cases: Array<[string, string]> = [
      ["/blog/post/foo", "foo"],
      ["/blog/post/foo/", "foo"],
      ["/blog/post/foo.html", "foo"],
      ["/blog/post/nested-thing", "nested-thing"],
    ];
    for (const [url, expected] of cases) {
      const [out] = transformPosts([
        fixture(url, { title: "t", date: "2024-01-01" }),
      ]);
      expect(out.slug).toBe(expected);
      expect(out.url).toBe(url);
    }
  });

  it("applies meta defaults for missing optional fields", () => {
    const [out] = transformPosts([
      fixture("/blog/post/min", { title: "Min", date: "2024-01-01" }),
    ]);
    expect(out.meta).toMatchObject({
      tags: [],
      image: "",
      featured: false,
      unlisted: false,
    });
    expect(out.meta.canonical).toBeUndefined();
    expect(out.meta.author).toBeUndefined();
    expect(out.meta.description).toBeUndefined();
  });

  it("preserves frontmatter values when present", () => {
    const [out] = transformPosts([
      fixture("/blog/post/full", {
        title: "Full",
        date: "2024-01-01",
        description: "d",
        tags: ["a", "b"],
        image: "/i.png",
        featured: true,
        canonical: "https://example.com/x",
        author: "Evan",
      }),
    ]);
    expect(out.meta).toMatchObject({
      title: "Full",
      description: "d",
      tags: ["a", "b"],
      image: "/i.png",
      featured: true,
      canonical: "https://example.com/x",
      author: "Evan",
    });
  });
});
