import { Blog } from "../../../../lib/blog";
export { default, getStaticProps } from "../../index";

export async function getStaticPaths() {
  const { posts: allPosts } = await Blog.getAll({ count: 9999 });
  const tags = [
    ...new Set(allPosts.map((post) => [...post.meta.tags]).flat(1)),
  ];

  return {
    paths: tags.map((tag) => {
      return { params: { tag } };
    }),
    fallback: false,
  };
}
