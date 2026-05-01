import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { type HTMLElement, parse } from "node-html-parser";

const DIST = join(process.cwd(), ".vitepress", "dist");

export function distPath(...segments: string[]): string {
  return join(DIST, ...segments);
}

export function loadPage(route: string): HTMLElement {
  // Map a logical route ("/", "/blog/", "/blog/post/foo") to dist HTML.
  // VitePress emits flat .html files, not directory/index.html nests.
  let file: string;
  if (route === "/" || route === "") {
    file = distPath("index.html");
  } else {
    const trimmed = route.replace(/^\/+|\/+$/g, "");
    file = distPath(`${trimmed}.html`);
    if (!existsSync(file)) {
      file = distPath(trimmed, "index.html");
    }
  }
  if (!existsSync(file)) {
    throw new Error(
      `Built page not found for route ${route} (looked at ${file})`,
    );
  }
  return parse(readFileSync(file, "utf8"));
}

// VitePress appends a zero-width-space to header anchors. Strip it for
// readable assertions.
export function cleanText(s: string | undefined | null): string {
  return (s ?? "").replace(/​/g, "").replace(/\s+/g, " ").trim();
}
