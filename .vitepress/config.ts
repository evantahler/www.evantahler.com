import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin, ViteDevServer } from "vite";
import { defineConfig } from "vitepress";
import llmstxt from "vitepress-plugin-llms";

// VitePress only generates llms.txt, llms-full.txt, and sitemap.xml at build
// time, and vitepress-plugin-llms 1.12.1's dev middleware rewrites every
// request to `.md` (so even /llms.txt falls through). Serve those static
// assets from the last build's dist folder during dev. Run `bun run build`
// once to populate.
const builtAssetDevServer: Plugin = {
  name: "built-asset-dev-server",
  configureServer(server: ViteDevServer) {
    const served: Record<string, string> = {
      "/llms.txt": "text/plain; charset=utf-8",
      "/llms-full.txt": "text/plain; charset=utf-8",
      "/sitemap.xml": "application/xml; charset=utf-8",
    };
    server.middlewares.use((req, res, next) => {
      const url = (req.url || "").split("?")[0];
      const contentType = served[url];
      if (contentType) {
        const filePath = resolve(".vitepress/dist", url.slice(1));
        if (existsSync(filePath)) {
          res.setHeader("Content-Type", contentType);
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
    "Evan Tahler — software engineer, leader, writer. Head of engineering at Arcade.dev, creator of Actionhero, Keryx, and more.",
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
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@evantahler" }],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-VY35SQM9Y1",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-VY35SQM9Y1');`,
    ],
  ],

  sitemap: {
    hostname: "https://www.evantahler.com",
    transformItems(items) {
      return items.filter((item) => {
        const url = item.url || "";
        return (
          !url.startsWith("blog/tag/") && url !== "404" && url !== "404.html"
        );
      });
    },
  },

  markdown: {
    theme: { light: "github-light", dark: "nord" },
    lineNumbers: true,
  },

  themeConfig: {
    siteTitle: "Evan Tahler",
    nav: [
      { text: "Resume", link: "/resume" },
      { text: "Blog", link: "/blog" },
      { text: "Open Source", link: "/open-source" },
      { text: "Speaking", link: "/speaking" },
      { text: "Contact", link: "/contact" },
    ],
    socialLinks: [
      { icon: "twitter", link: "https://twitter.com/evantahler" },
      { icon: "github", link: "https://github.com/evantahler" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.58 13.91c-.29 1.49-2.6 3.13-5.25 3.44c-1.38.16-2.74.32-4.19.25c-2.37-.11-4.24-.57-4.24-.57v.65c.31 2.34 2.32 2.48 4.22 2.55c1.92.06 3.63-.47 3.63-.47l.08 1.74s-1.34.72-3.73.85c-1.32.07-2.96-.04-4.87-.54c-4.14-1.1-4.85-5.51-4.96-9.99l-.01-3.67c0-4.57 2.99-5.91 2.99-5.91C6.75.75 9.32.5 11.99.5h.06c2.67 0 5.24.25 6.74.94c0 0 2.99 1.34 2.99 5.91c0 0 .04 3.37-.42 6.56h.22zm-3.54-7.36v5.6h-2.21V6.71c0-.97-.4-1.46-1.21-1.46c-.89 0-1.34.58-1.34 1.72v2.49h-2.2V6.97c0-1.14-.45-1.72-1.34-1.72c-.81 0-1.21.49-1.21 1.46v4.94H6.32v-5.6c0-.97.25-1.74.74-2.31c.51-.57 1.18-.86 2-.86c.96 0 1.68.37 2.16 1.1L12 4.7l.78-1.32c.48-.73 1.2-1.1 2.16-1.1c.83 0 1.49.29 2 .86c.49.57.74 1.34.74 2.31z"/></svg>',
        },
        link: "https://mastodon.social/@evantahler",
        ariaLabel: "Mastodon",
      },
    ],
    search: { provider: "local" },
    outline: { level: [2, 3] },
    footer: {
      message:
        '<img src="/images/dog.png" alt="dog" class="footer-dog" /><br /><a href="https://github.com/evantahler/www.evantahler.com" target="_blank">source for this site</a>',
      copyright: `Copyright © ${new Date().getFullYear()} Evan Tahler`,
    },
    lastUpdated: { text: "Last updated" },
  },

  transformPageData(pageData) {
    const path = pageData.relativePath;
    if (path.startsWith("blog/tag/") || path === "404.md") {
      pageData.frontmatter.sitemap = { exclude: true };
    }
  },

  vite: {
    plugins: [
      llmstxt({
        ignoreFiles: ["blog/tag/**", "blog/tags.md", "404.md"],
      }),
      builtAssetDevServer,
    ],
  },
});
