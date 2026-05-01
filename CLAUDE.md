# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal site and blog (www.evantahler.com) built with **VitePress 1.x** and Vue 3. Static-generated and deployed automatically to Vercel on push to `main`. The package manager and runtime is **bun**.

## Common Commands

- `bun install` — install dependencies
- `bun run dev` — start the VitePress dev server
- `bun run build` — build static site to `.vitepress/dist`
- `bun run preview` — preview the built site
- `bun run lint` — Biome check (run in CI; must pass)
- `bun run format` — Biome auto-format

There is no test runner. CI (`.github/workflows/test.yml`) runs only `bun run lint` and `bun run build` on Ubuntu with the latest bun.

## Architecture

### VitePress layout — repo root is `srcDir`

`.vitepress/config.ts` sets `srcDir: "."`, so top-level Markdown files (`index.md`, `resume.md`, `contact.md`, `speaking.md`, `open-source.md`, `404.md`) are pages. `srcExclude` keeps `README.md`, `CLAUDE.md`, and `node_modules` out of the build. Output goes to `.vitepress/dist`; cache to `.vitepress/cache` (both gitignored).

### Two parallel post loaders — pick the right one

Blog posts live in `blog/post/*.md` as plain Markdown with gray-matter frontmatter (`title`, `date`, `tags`, `image`, `description`, `featured`, `unlisted`, `canonical`, `author`). There are two loaders that exist for different VitePress lifecycles — they must be kept in sync:

- `.vitepress/data/posts.data.ts` — uses `createContentLoader`. This is the runtime/SSG loader; import as `import { data as posts } from "../.vitepress/data/posts.data"` from `<script setup>` in `.md` files (used by `index.md`, `blog/index.md`, `blog/tag/[tag].md`, etc.).
- `.vitepress/data/posts.ts` — exports `loadPosts()` which reads `blog/post/` directly with `fs` + `gray-matter`. This is for **build-time** code that runs before VitePress's content loader is available, specifically `blog/tag/[tag].paths.ts` (the dynamic-route `paths()` function).

Both loaders filter `unlisted`, sort by date desc, and produce the same `PostSummary` shape. If you change the shape in one, change the other.

`tags.data.ts` is a similar `createContentLoader` that aggregates tag counts.

### Dynamic tag routes

`blog/tag/[tag].md` + `blog/tag/[tag].paths.ts` generate one page per unique tag at build time. The `paths()` function uses `loadPosts()` (the fs-based loader) — not the content loader — because `paths()` runs before `createContentLoader` is ready.

### Custom theme

`.vitepress/theme/index.ts` extends `DefaultTheme` and injects `BlogPostHeader.vue` into the `doc-before` slot. The header component conditionally renders only when `route.path.startsWith("/blog/post/")` — so it appears on posts but not other pages, even though the slot is global. It also injects Vercel Analytics client-side via `enhanceApp`.

### llms.txt and dev-server gotcha

`vitepress-plugin-llms` generates `llms.txt`, `llms-full.txt`, and per-page `.md` companions at **build time only**. The plugin's dev middleware rewrites every request to `.md`, which would shadow `/llms.txt` in dev. To work around this, `.vitepress/config.ts` registers a `builtAssetDevServer` Vite plugin that serves `llms.txt`, `llms-full.txt`, and `sitemap.xml` from `.vitepress/dist` during dev. **You must `bun run build` once before these URLs work in dev.** Tag pages, `blog/tags.md`, and `404.md` are excluded from llms.txt via `ignoreFiles`.

### GitHub data loader

`.vitepress/data/github.data.ts` fetches repo metadata from the GitHub API at build time for the open-source page. It honors `GITHUB_TOKEN` if set (recommended to avoid rate limits in CI/Vercel) and silently warns + skips on failure rather than failing the build.

### Sitemap

Configured in `.vitepress/config.ts`. `transformItems` excludes `blog/tag/*` and `404`; `transformPageData` additionally sets `frontmatter.sitemap = { exclude: true }` on those pages. Keep both in sync if you add new excluded route patterns.

### Vercel deploy

`vercel.json` installs bun via curl and runs `bun run build`; output dir is `.vitepress/dist`. Set `framework: null` so Vercel does not auto-detect.

## Code formatting / linting

Biome (`biome.json`) is the single source of truth — Prettier and ESLint are not used. Notable config:

- Formats `**/*.{ts,js,vue,json}` only; **`blog/post/` is excluded** so post markdown isn't reformatted.
- Lint rules: `recommended` plus `noUnusedImports` / `noUnusedVariables` / `noTsIgnore` turned **off**.
- Vue files have linting disabled (formatting only) via the override.
- Style: 2-space indent, 80-char line width, double quotes, trailing commas, semicolons.

## Adding a blog post

1. **Create the post file** at `blog/post/YYYY-MM-DD-slug.md`. The full filename (minus `.md`) becomes the URL slug — i.e. `/blog/post/2026-03-13-announcing-keryx`. The date prefix is **not** stripped; it is part of the canonical URL. Pick a filename you're willing to live with forever.
2. **Add the image assets** under `public/images/posts/YYYY-MM-DD-slug/` (one folder per post, mirroring the filename). Reference them with absolute paths starting at `/images/posts/...` — `public/` is the VitePress static root and is stripped from URLs.
3. **Write the frontmatter.** Required: `title`, `date` (ISO `YYYY-MM-DD`), `tags`, `image`, `description`. Optional: `featured: true` (surfaces on the home page — keep the list short), `unlisted: true` (hides from both loaders entirely), `canonical` (renders an "Originally posted at…" line in `BlogPostHeader.vue`), `author`.
4. **Repeat the hero image in the body** as the first content line — the convention across existing posts is `![title](/images/posts/.../image.png)` right under the frontmatter, since `BlogPostHeader.vue` renders the title/date/tags but not the image.
5. **Tags are free-form strings.** New tags automatically get a tag page generated by `blog/tag/[tag].paths.ts` — no registration needed. Reuse existing tags where possible (run `bun run dev` and visit `/blog/tags` to see the current set).

Example frontmatter (from `2026-03-13-announcing-keryx.md`):

```yaml
---
title: "Announcing Keryx: A Full-Stack TypeScript Framework for APIs and MCP Servers"
date: "2026-03-13"
author: Evan Tahler
description: >-
  After 14 years of building Actionhero, I built a new framework from scratch.
image: /images/posts/2026-03-13-announcing-keryx/image.png
tags:
  - engineering
  - typescript
  - mcp
featured: true
---
```

Markdown is plain CommonMark + GFM (no MDX, no Vue components inside posts unless you opt in via VitePress's markdown features). Code blocks use the `github-light` / `nord` Shiki themes with line numbers enabled globally. **Biome does not format `blog/post/`** — write the post however reads cleanly.
