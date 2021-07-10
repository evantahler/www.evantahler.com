import { Blog } from "../../../lib/blog";
import BlogPage from "../index";

export default BlogPage;
export { getStaticProps } from "../index";

export async function getStaticPaths() {
  const tags: string[] = [];
  const postSlugs = await Blog.getAll();
  for (const slug of postSlugs) {
    const { meta } = await Blog.geBySlug(slug);
    for (const tag of meta.tags) {
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
