import { Blog } from "../../../lib/blog";
import BlogPage from "../index";

export default BlogPage;
export { getStaticProps } from "../index";

export async function getStaticPaths({ params }) {
  const { posts, total, page, tag, count } = await Blog.getAll({
    tag: params?.tag,
  });

  const pageCount = Math.ceil(total / count);

  return {
    paths: Array.from(Array(pageCount + 1).keys()).map((page) => {
      return { params: { page: page.toString() } };
    }),
    fallback: false,
  };
}
