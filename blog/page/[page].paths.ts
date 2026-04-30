import { loadPosts } from "../../.vitepress/data/posts";

const PER_PAGE = 10;

export default {
  paths() {
    const posts = loadPosts();
    const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
    const out: { params: { page: string } }[] = [];
    for (let p = 2; p <= totalPages; p++) {
      out.push({ params: { page: String(p) } });
    }
    return out;
  },
};
