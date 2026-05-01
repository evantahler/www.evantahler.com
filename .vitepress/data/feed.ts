import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { Feed } from "feed";
import { loadPosts } from "./posts";
import {
  SITE_AUTHOR_EMAIL,
  SITE_AUTHOR_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "./site";

function absolute(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function generateFeed(outDir: string): void {
  const posts = loadPosts();
  const feed = new Feed({
    id: `${SITE_URL}/`,
    link: `${SITE_URL}/`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    language: "en",
    image: `${SITE_URL}/images/dog.png`,
    favicon: `${SITE_URL}/favicon-32x32.png`,
    copyright: `Copyright © ${new Date().getFullYear()} ${SITE_AUTHOR_NAME}`,
    feedLinks: { rss: `${SITE_URL}/feed.xml` },
    author: {
      name: SITE_AUTHOR_NAME,
      email: SITE_AUTHOR_EMAIL,
      link: SITE_URL,
    },
  });

  for (const post of posts) {
    const link = `${SITE_URL}${post.url}`;
    feed.addItem({
      title: post.meta.title,
      id: link,
      link,
      description: post.meta.description,
      date: new Date(post.meta.date),
      category: post.meta.tags.map((name) => ({ name })),
      image: absolute(post.meta.image),
      author: [{ name: post.meta.author ?? SITE_AUTHOR_NAME }],
    });
  }

  writeFileSync(join(outDir, "feed.xml"), feed.rss2(), "utf8");
}
