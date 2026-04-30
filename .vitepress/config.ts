import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vitepress";
import llmstxt from "vitepress-plugin-llms";

// vitepress-plugin-llms 1.12.1's dev middleware rewrites every request to
// `.md`, so /llms.txt and /llms-full.txt fall through. Serve them from the
// last build's dist folder during dev. Run `bun run build` once to populate.
const llmsTxtDevServer = {
  name: "llms-txt-dev-server",
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = (req.url || "").split("?")[0];
      if (url === "/llms.txt" || url === "/llms-full.txt") {
        const filePath = resolve(".vitepress/dist", url.slice(1));
        if (existsSync(filePath)) {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(readFileSync(filePath, "utf-8"));
          return;
        }
      }
      next();
    });
  },
};

export default defineConfig({
  title: "Evan Tahler",
  description:
    "Evan Tahler — software engineer, leader, writer. Head of engineering at Arcade.dev, creator of Actionhero.",
  cleanUrls: true,
  srcDir: ".",
  srcExclude: [
    "**/README.md",
    "**/CLAUDE.md",
    "node_modules/**",
    ".vitepress/cache/**",
  ],
  outDir: ".vitepress/dist",
  cacheDir: ".vitepress/cache",
  ignoreDeadLinks: true,

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@evantahler" }],
  ],

  sitemap: {
    hostname: "https://www.evantahler.com",
    transformItems(items) {
      return items.filter((item) => {
        const url = item.url || "";
        return (
          !url.startsWith("blog/tag/") &&
          !url.startsWith("blog/page/") &&
          url !== "404" &&
          url !== "404.html"
        );
      });
    },
  },

  markdown: {
    theme: {
      light: "github-light",
      dark: "nord",
    },
    lineNumbers: true,
  },

  transformPageData(pageData) {
    const path = pageData.relativePath;

    if (path.startsWith("blog/post/") && path.endsWith(".md")) {
      pageData.frontmatter.layout = "blog-post";
    }
    if (path.startsWith("blog/tag/")) {
      pageData.frontmatter.layout = "blog-tag";
    }
    if (path.startsWith("blog/page/")) {
      pageData.frontmatter.layout = "blog-index";
    }

    if (
      path.startsWith("blog/tag/") ||
      path.startsWith("blog/page/") ||
      path === "404.md"
    ) {
      pageData.frontmatter.sitemap = { exclude: true };
    }
  },

  vite: {
    plugins: [llmstxt(), llmsTxtDevServer],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: [
            "legacy-js-api",
            "import",
            "global-builtin",
            "color-functions",
            "if-function",
            "mixed-decls",
            "slash-div",
          ],
        },
      },
    },
  },
});
