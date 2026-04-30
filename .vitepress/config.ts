import { defineConfig } from "vitepress";
import llmstxt from "vitepress-plugin-llms";

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
    plugins: [llmstxt()],
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
