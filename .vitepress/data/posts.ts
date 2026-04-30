import { readdirSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import matter from "gray-matter";

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

const POST_DIR = join(process.cwd(), "blog", "post");

export function loadPosts(): PostSummary[] {
  const files = readdirSync(POST_DIR).filter((f) => f.endsWith(".md"));
  const posts: PostSummary[] = [];
  for (const file of files) {
    const raw = readFileSync(join(POST_DIR, file), "utf8");
    const { data } = matter(raw);
    if (!data.title || !data.date) continue;
    if (data.unlisted) continue;
    const slug = basename(file, extname(file));
    posts.push({
      url: `/blog/post/${slug}`,
      slug,
      meta: {
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags ?? [],
        image: data.image ?? "",
        featured: data.featured ?? false,
        unlisted: data.unlisted ?? false,
        canonical: data.canonical,
        author: data.author,
      },
    });
  }
  return posts.sort(
    (a, b) => new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf(),
  );
}
