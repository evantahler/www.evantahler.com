import { loadPosts } from "../../.vitepress/data/posts";

export default {
  paths() {
    const posts = loadPosts();
    const tags = new Set<string>();
    for (const p of posts) for (const t of p.meta.tags) tags.add(t);
    return [...tags].sort().map((tag) => ({ params: { tag } }));
  },
};
