import type { ContentData } from "vitepress";
import { describe, expect, it, vi } from "vitest";

vi.mock("vitepress", () => ({
  createContentLoader: () => ({}),
}));

const { transformTags } = await import("../../.vitepress/data/tags.data");

function fixture(frontmatter: Record<string, unknown>): ContentData {
  return {
    url: "/blog/post/x",
    frontmatter,
    src: undefined,
    html: undefined,
    excerpt: undefined,
  };
}

describe("transformTags", () => {
  it("returns [] for empty input", () => {
    expect(transformTags([])).toEqual([]);
  });

  it("counts tag occurrences across posts", () => {
    const out = transformTags([
      fixture({ tags: ["js", "node"] }),
      fixture({ tags: ["js", "redis"] }),
      fixture({ tags: ["js"] }),
    ]);
    const map = Object.fromEntries(out.map((t) => [t.tag, t.count]));
    expect(map).toEqual({ js: 3, node: 1, redis: 1 });
  });

  it("excludes unlisted posts from tag counts", () => {
    const out = transformTags([
      fixture({ tags: ["a"] }),
      fixture({ tags: ["a", "b"], unlisted: true }),
    ]);
    const map = Object.fromEntries(out.map((t) => [t.tag, t.count]));
    expect(map).toEqual({ a: 1 });
  });

  it("tolerates posts with no tags field", () => {
    const out = transformTags([fixture({}), fixture({ tags: ["a"] })]);
    expect(out).toEqual([{ tag: "a", count: 1 }]);
  });

  it("sorts by count desc, then tag asc as tiebreaker", () => {
    const out = transformTags([
      fixture({ tags: ["zebra", "apple", "mango"] }),
      fixture({ tags: ["apple", "mango"] }),
      fixture({ tags: ["mango"] }),
    ]);
    expect(out).toEqual([
      { tag: "mango", count: 3 },
      { tag: "apple", count: 2 },
      { tag: "zebra", count: 1 },
    ]);
  });
});
