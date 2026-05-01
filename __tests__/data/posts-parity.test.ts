import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { ContentData } from "vitepress";
import { describe, expect, it, vi } from "vitest";

vi.mock("vitepress", () => ({
  createContentLoader: () => ({}),
}));

const { transformPosts } = await import("../../.vitepress/data/posts.data");
const { loadPosts } = await import("../../.vitepress/data/posts");

const POST_DIR = join(process.cwd(), "blog", "post");

function loadViaTransform() {
  const files = readdirSync(POST_DIR).filter((f) => f.endsWith(".md"));
  const raw: ContentData[] = files.map((file) => {
    const text = readFileSync(join(POST_DIR, file), "utf8");
    const { data } = matter(text);
    const slug = file.replace(/\.md$/, "");
    return {
      url: `/blog/post/${slug}`,
      frontmatter: data,
      src: undefined,
      html: undefined,
      excerpt: undefined,
    };
  });
  return transformPosts(raw);
}

describe("posts loader / transform parity", () => {
  it("loadPosts() and transformPosts() produce the same posts in the same order", () => {
    const fromLoader = loadPosts();
    const fromTransform = loadViaTransform();

    expect(fromLoader.length).toBe(fromTransform.length);
    expect(fromLoader.map((p) => p.slug)).toEqual(
      fromTransform.map((p) => p.slug),
    );

    for (let i = 0; i < fromLoader.length; i++) {
      const a = fromLoader[i];
      const b = fromTransform[i];
      expect(a.url).toBe(b.url);
      expect(a.meta.title).toBe(b.meta.title);
      expect(String(a.meta.date)).toBe(String(b.meta.date));
      expect(a.meta.tags).toEqual(b.meta.tags);
      expect(a.meta.featured).toBe(b.meta.featured);
      expect(a.meta.unlisted).toBe(b.meta.unlisted);
      expect(a.meta.canonical).toBe(b.meta.canonical);
    }
  });
});
