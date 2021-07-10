import matter from "gray-matter";
import path from "path";
import fs from "fs";
import glob from "glob";

const blogDirectory = path.join(process.cwd(), "pages", "blog");

export namespace Blog {
  export async function geBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "").replace(/\.md$/, "");
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content: markdown } = matter(fileContents);

    return { slug: realSlug, meta: data, markdown };
  }

  export async function getAll(offset = 0, limit = Infinity) {
    const files = (glob.sync(path.join(blogDirectory, "**/*.mdx")) as string[])
      .map((p) => p.replace(`${blogDirectory}/`, ""))
      .map((p) => p.replace(/\.mdx/, ""));

    return files.slice(offset, offset + limit);
  }
}
