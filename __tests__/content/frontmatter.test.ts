import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

const POST_DIR = join(process.cwd(), "blog", "post");
const files = readdirSync(POST_DIR).filter((f) => f.endsWith(".md"));

describe("blog post frontmatter", () => {
  it("found at least one post", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s has valid frontmatter", (file) => {
    const raw = readFileSync(join(POST_DIR, file), "utf8");
    const { data } = matter(raw);

    expect(typeof data.title).toBe("string");
    expect((data.title as string).trim()).not.toBe("");

    expect(data.date).toBeDefined();
    const date = new Date(data.date as string | number | Date);
    expect(Number.isNaN(date.valueOf())).toBe(false);
    expect(date.getFullYear()).toBeGreaterThan(2000);

    if (data.tags !== undefined) {
      expect(Array.isArray(data.tags)).toBe(true);
      for (const tag of data.tags as unknown[]) {
        expect(typeof tag).toBe("string");
        expect((tag as string).trim()).not.toBe("");
      }
    }

    if (data.canonical !== undefined) {
      expect(typeof data.canonical).toBe("string");
      expect(data.canonical as string).toMatch(/^https?:\/\//);
    }

    if (data.image !== undefined) {
      expect(typeof data.image).toBe("string");
      expect(data.image as string).toMatch(/^(\/|https?:\/\/)/);
    }

    if (data.featured !== undefined) {
      expect(typeof data.featured).toBe("boolean");
    }

    if (data.unlisted !== undefined) {
      expect(typeof data.unlisted).toBe("boolean");
    }

    if (data.description !== undefined) {
      expect(typeof data.description).toBe("string");
    }
  });
});
