import { describe, expect, it, vi } from "vitest";

vi.mock("../../.vitepress/data/posts", () => ({
  loadPosts: () => [
    {
      url: "/blog/post/a",
      slug: "a",
      meta: {
        title: "A",
        date: "2024-01-01",
        tags: ["zebra", "apple"],
        image: "",
      },
    },
    {
      url: "/blog/post/b",
      slug: "b",
      meta: {
        title: "B",
        date: "2024-02-01",
        tags: ["mango", "apple"],
        image: "",
      },
    },
    {
      url: "/blog/post/c",
      slug: "c",
      meta: { title: "C", date: "2024-03-01", tags: [], image: "" },
    },
  ],
}));

describe("[tag].paths", () => {
  it("emits one path per unique tag, alphabetically sorted", async () => {
    const mod = await import("../../blog/tag/[tag].paths");
    const result = mod.default.paths();
    expect(result).toEqual([
      { params: { tag: "apple" } },
      { params: { tag: "mango" } },
      { params: { tag: "zebra" } },
    ]);
  });
});
