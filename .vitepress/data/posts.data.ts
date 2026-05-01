import { type ContentData, createContentLoader } from "vitepress";

export type PostMeta = {
  title: string;
  description?: string;
  date: string;
  tags: string[];
  image: string;
  featured?: boolean;
  unlisted?: boolean;
  canonical?: string;
  author?: string;
};

export type PostSummary = {
  url: string;
  slug: string;
  meta: PostMeta;
};

declare const data: PostSummary[];

export { data };

export function transformPosts(raw: ContentData[]): PostSummary[] {
  return raw
    .filter((p) => !!p.frontmatter.title && !!p.frontmatter.date)
    .filter((p) => !p.frontmatter.unlisted)
    .map((p) => {
      const slug =
        p.url
          .replace(/^\/blog\/post\//, "")
          .replace(/\/$/, "")
          .replace(/\.html$/, "") || "";
      return {
        url: p.url,
        slug,
        meta: {
          title: p.frontmatter.title,
          description: p.frontmatter.description,
          date: p.frontmatter.date,
          tags: p.frontmatter.tags ?? [],
          image: p.frontmatter.image ?? "",
          featured: p.frontmatter.featured ?? false,
          unlisted: p.frontmatter.unlisted ?? false,
          canonical: p.frontmatter.canonical,
          author: p.frontmatter.author,
        },
      };
    })
    .sort(
      (a, b) =>
        new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf(),
    );
}

export default createContentLoader("blog/post/*.md", {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform: transformPosts,
});
