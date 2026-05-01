# www.evantahler.com

[![test](https://github.com/evantahler/www.evantahler.com/actions/workflows/test.yml/badge.svg)](https://github.com/evantahler/www.evantahler.com/actions/workflows/test.yml)

## Install
This is a [VitePress](https://vitepress.dev/) site styled with the [Bootswatch Zephyr](https://bootswatch.com/zephyr/) theme. It is built and run with [Bun](https://bun.sh).

- `bun install`

## Running in Development
- `bun run dev`

## Building for Production

This site is deployed automatically to Vercel. The build outputs static files to `.vitepress/dist`.

- `bun run build`
- `bun run preview`

## Linting

We use [Biome](https://biomejs.dev) for formatting and linting. CI runs `bun run lint`; auto-format with `bun run format`.

## LLMs.txt

The build emits `llms.txt`, `llms-full.txt`, and a per-page `.md` companion for every page via [`vitepress-plugin-llms`](https://github.com/okineadev/vitepress-plugin-llms).
