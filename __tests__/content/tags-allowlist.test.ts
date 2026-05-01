import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

const POST_DIR = join(process.cwd(), "blog", "post");
const files = readdirSync(POST_DIR).filter((f) => f.endsWith(".md"));

const ALLOWED_TAGS = new Set([
  // languages & runtimes
  "node.js",
  "javascript",
  "typescript",
  "ruby",
  // topics
  "engineering",
  "devops",
  "data-engineering",
  "ai",
  "product-management",
  "open-source",
  "frontend",
  "career",
  // companies & projects
  "actionhero",
  "grouparoo",
  "taskrabbit",
  "airbyte",
  "modcloth",
  "voom",
  // meta
  "meta",
  "speaking",
]);

const usedTags = new Set<string>();
for (const file of files) {
  const raw = readFileSync(join(POST_DIR, file), "utf8");
  const { data } = matter(raw);
  for (const tag of (data.tags ?? []) as string[]) usedTags.add(tag);
}

describe("blog post tag allowlist", () => {
  it("every tag used by a post is in the allowlist", () => {
    const disallowed = [...usedTags].filter((t) => !ALLOWED_TAGS.has(t)).sort();
    expect(disallowed).toEqual([]);
  });

  it("every tag in the allowlist is used by at least one post", () => {
    const unused = [...ALLOWED_TAGS].filter((t) => !usedTags.has(t)).sort();
    expect(unused).toEqual([]);
  });
});
