# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal website and blog (www.evantahler.com) built with Next.js, React, TypeScript, and React Bootstrap. The site is statically generated and deployed automatically to Vercel. It features a blog with MDX posts, tags, pagination, and a speaking engagements page.

## Package Manager

This project uses **pnpm** as the package manager. All commands should use `pnpm` instead of `npm`.

## Common Commands

### Development
- `pnpm install` - Install dependencies
- `pnpm run dev` - Start development server with file watching for blog posts
- `pnpm run build` - Build the Next.js application for production
- `pnpm start` - Start production server

### Testing & Quality
- `pnpm test` - Run full test suite (includes lint, build, and jest tests)
- `pnpm run lint` - Check code formatting with Prettier
- `pnpm run pretty` - Auto-format code with Prettier

Note: The `pretest` script automatically runs `lint`, `build`, and `postbuild` before tests.

### Other
- `pnpm run sitemap` - Generate sitemap (runs automatically after build via `postbuild`)

## Code Architecture

### Static Site Generation with Next.js

This site uses Next.js's static generation (SSG) capabilities via `getStaticProps` and `getStaticPaths`. All pages are pre-rendered at build time.

### Blog System Architecture

The blog is powered by MDX files stored in `pages/blog/*.mdx`. The blog infrastructure is structured as follows:

**Core Blog Module** (`lib/blog.ts`):
- Exports the `Blog` namespace containing all blog-related functions
- `getBySlug(slug)` - Reads and parses a single MDX post using gray-matter
- `getAll({page, tag, count, featured})` - Returns paginated posts with filtering
- `getAllTags(tag?)` - Returns tag frequency counts
- Posts contain frontmatter metadata: `title`, `description`, `canonical`, `date`, `tags`, `image`, `featured`, `unlisted`

**Blog Routes**:
- `/blog` - Main blog index showing recent posts (uses `pages/blog/index.tsx`)
- `/blog/post/[slug]` - Individual blog posts (uses `pages/blog/post/[slug].tsx`)
- `/blog/page/[page]` - Paginated blog listing
- `/blog/tag/[tag]` - Posts filtered by tag
- `/blog/tag/[tag]/[page]` - Paginated tag view

**Blog Rendering**:
- MDX content is rendered with `react-markdown`
- Syntax highlighting uses `react-syntax-highlighter` with the Nord theme
- Custom components defined in `pages/blog/post/[slug].tsx` handle images, links, and code blocks
- Supports GitHub Flavored Markdown via `remark-gfm` and raw HTML via `rehype-raw`

### Data Sources

**Talks/Speaking Data** (`data/talks.ts`):
- Array of talk objects with title, date, venue, image, description, and links
- Used by `/speaking` page

### Component Structure

**Layout Components**:
- `_app.tsx` - Root app wrapper with Header, Footer, Container, and Vercel Analytics
- `Header.tsx` - Main navigation header
- `Footer.tsx` - Site footer
- `Seo.tsx` - SEO meta tags component

**Blog Components**:
- `BlogComponents.tsx` - Namespace with tag display and canonical link helpers
- `BlogPostCard.tsx` - Card for displaying blog post previews
- `BlogSidebar.tsx` - Sidebar content for blog posts
- `FormattedDate.tsx` - Date formatting component
- `PaginationHelper.tsx` - Pagination controls
- `SeeAllPosts.tsx` - Link to return to blog index

**Other Components**:
- `ContactCards.tsx` - Contact information cards
- `JumboImage.tsx` - Large header images
- `SpeakingEngagementCard.tsx` - Card for displaying talks
- `BigGlyf.tsx` - Large glyph/icon component

### Styling

- Uses SASS/SCSS (`scss/site.scss`)
- Bootstrap 5 + Bootswatch themes via `react-bootstrap`
- Custom styles imported in `_app.tsx`

### Configuration

**Next.js Config** (`next.config.ts`):
- Configures allowed image domains for GitHub avatars and profile images

**Sitemap Config** (`next-sitemap.config.cjs`):
- Generates sitemap automatically after build
- Excludes tag and pagination routes from sitemap

**TypeScript Config** (`tsconfig.json`):
- ES5 target with Next.js defaults
- Strict mode disabled

### Testing

- Jest with jsdom environment
- Tests use React 19's `createRoot` API
- Test files in `__tests__/pages/` mirror the pages structure
- Setup file: `setup.jest.js`

### Deployment

The site is automatically deployed to Vercel on push to the `main` branch. The GitHub Actions workflow (`.github/workflows/test.yml`) runs tests on PRs and main branch pushes using Node.js 22.x.

### File Watching

The development server uses `next-remote-watch` to watch the `pages/blog` directory for changes to MDX files and automatically rebuild affected pages.

## Code Formatting

This project uses Prettier exclusively for code formatting. There are no ESLint or JSHint configurations. Prettier is enforced in CI and must pass for contributions to be accepted. Use `pnpm run pretty` to auto-format code.
