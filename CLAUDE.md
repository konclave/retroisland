# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server on port 4000
pnpm build        # Production build
pnpm start        # Serve production build

pnpm generate:types         # Regenerate Contentful TypeScript types
pnpm content:fetch          # Fetch content from Contentful to local JSON
pnpm content:merge          # Merge scraped data into Contentful export
pnpm content:publish        # Publish singers to Contentful
```

Linting uses ESLint (`@remix-run/eslint-config`), formatting uses Prettier (2-space indent, single quotes).

## Architecture

Remix v2 app (React 18, TypeScript) serving a music archive of Soviet-era vocal-instrumental ensembles. Content is managed in Contentful CMS.

**Data flow:** Contentful → `app/data-fetch/` (mappers/DTOs) → `app/loaders/` (Remix server loaders) → routes → UI components.

### Key layers

**`app/data-fetch/`** — Contentful API integration. Each file fetches one content type and maps raw Contentful entries to typed DTOs. Markdown news content is converted to HTML here using `remark` + `remark-html`.

**`app/loaders/`** — Remix loader functions (server-side). The index loader runs all fetches in parallel. Loaders are imported by route files.

**`app/routes/`** — File-based routing:
- `_index.tsx` — homepage (news, catalogue index, tracks on request, communities)
- `catalogue._index.tsx` — full catalogue listing
- `catalogue.$slug.tsx` — individual catalogue entry
- `[rss.xml].tsx` — RSS feed endpoint
- `about-author.tsx`, `about-project.tsx`, `news-archive.tsx`

**`app/ui/`** — Components organized by feature (`index/`, `catalogue/`, `catalogue-entry/`, `shared/`, etc.). Each component exports a React component and a `links()` function for its scoped CSS imports (Remix convention).

**`app/styles/`** — Global CSS (normalize, colors, fonts, layout). Responsive breakpoints: desktop 811px, tablet 480px. The `app/utils/style-links.ts` helper generates conditional stylesheet links for responsive loading.

### TypeScript path alias

`~/*` resolves to `app/*` (configured in `tsconfig.json`).

### Environment variables

Contentful credentials are required (see `.env`). The `app/data-fetch/contentful-client.ts` creates the client from env vars. `getContentfulEnvironment.js` is used by content scripts.
