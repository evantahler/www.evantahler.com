import { createContentLoader } from "vitepress";

export type TagCount = { tag: string; count: number };

declare const data: TagCount[];

export { data };

export default createContentLoader("blog/post/*.md", {
  transform(raw): TagCount[] {
    const counts: Record<string, number> = {};
    for (const p of raw) {
      if (p.frontmatter.unlisted) continue;
      const tags: string[] = p.frontmatter.tags ?? [];
      for (const t of tags) counts[t] = (counts[t] || 0) + 1;
    }
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  },
});
