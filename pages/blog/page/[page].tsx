import { Blog } from "../../../lib/blog";
import BlogPage from "../index";

export default BlogPage;
export { getStaticProps } from "../index";

export async function getStaticPaths() {
  const tags: string[] = [];
  const posts = await Blog.getAll();

  for (const post of posts) {
    for (const tag of post.meta.tags) {
      if (!tags.includes(tag)) tags.push(tag);
    }
  }

  return {
    paths: tags.map((tag) => {
      return { params: { tag } };
    }),
    fallback: false,
  };
}
