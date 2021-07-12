import matter from "gray-matter";
import path from "path";
import fs from "fs";
import glob from "glob";

const blogDirectory = path.join(process.cwd(), "pages", "blog");

export namespace Blog {
  export interface PostMeta {
    title: string;
    description?: string;
    date: string;
    tags: string[];
    image: string;
  }
  export interface PostData {
    slug: string;
    markdown: string;
    meta: PostMeta;
  }

  export const perPage = 10;

  export async function getBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "").replace(/\.md$/, "");
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // @ts-ignore
    const { data, content: markdown }: { data: PostMeta; content: string } =
      matter(fileContents);

    return { slug: realSlug, meta: data, markdown };
  }

  export async function getAll({
    page,
    tag,
    count,
  }: {
    page?: number;
    tag?: string;
    count?: number;
  }) {
    if (!count) count = perPage;
    if (!page) page = 1;
    if (!tag) tag = null;

    page = parseInt(page.toString());
    count = parseInt(count.toString());

    const slugs = (glob.sync(path.join(blogDirectory, "**/*.mdx")) as string[])
      .map((p) => p.replace(`${blogDirectory}/`, ""))
      .map((p) => p.replace(/\.mdx/, ""));

    const posts: {
      slug: string;
      meta: PostMeta;
      markdown: string;
    }[] = [];

    for (const slug of slugs.reverse()) {
      const post = await getBySlug(slug);
      if (!post.meta) continue;
      if (!post.meta.title) continue;
      if (!post.meta.date) continue;
      if (tag && !post.meta.tags.includes(tag)) continue;

      posts.push(post);
    }

    const start = (page - 1) * count;
    const end = page * count;

    return {
      posts: posts.slice(start, end),
      total: posts.length,
      page,
      tag,
      count,
    };
  }
}
