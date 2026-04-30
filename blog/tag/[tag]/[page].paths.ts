import { loadPosts } from "../../../.vitepress/data/posts";

const PER_PAGE = 10;

export default {
  paths() {
    const posts = loadPosts();
    const counts: Record<string, number> = {};
    for (const p of posts) {
      for (const t of p.meta.tags) counts[t] = (counts[t] || 0) + 1;
    }
    const out: { params: { tag: string; page: string } }[] = [];
    for (const [tag, count] of Object.entries(counts)) {
      const totalPages = Math.max(1, Math.ceil(count / PER_PAGE));
      for (let p = 2; p <= totalPages; p++) {
        out.push({ params: { tag, page: String(p) } });
      }
    }
    return out;
  },
};
