# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Astro dev server on port 4000
npm run build        # Astro static build → dist/
npm run preview      # Preview the built site

# Data extraction (run once, requires .env with Contentful credentials)
npm run content:export     # Dump Contentful → generated/contentful-data.json
npm run content:transform  # Transform dump → src/content/**/*.json
```

Linting uses ESLint (`@remix-run/eslint-config`), formatting uses Prettier (2-space indent, single quotes).

## Architecture

Astro static site (React islands, TypeScript) serving a music archive of Soviet-era vocal-instrumental ensembles. Content is stored as pre-generated local JSON files under `src/content/` — **no live CMS calls at runtime**.

### Data flow (build time only)

```
Contentful export (one-time)
  → scripts/transform-content.mjs
  → src/content/catalogue/{slug}.json   (one file per singer)
  → src/content/catalogue-list.json
  → src/content/news.json
  → src/content/requested.json
  → src/content/pages/{about-author,about-project,index}.json
```

Pages read JSON directly with `readFileSync` in Astro frontmatter — no loaders, no API calls.

### Key layers

**`src/pages/`** — Astro file-based routes. Each page reads its JSON in the frontmatter and passes data to components.

**`src/layouts/Layout.astro`** — Base HTML shell. Imports global CSS, includes Navigation and About, initialises jQuery + Jouele audio player via a module `<script>`.

**`src/components/`** — Static `.astro` components (Navigation, About, Header, Gallery, Track, NewsList, CommunitiesList, etc.)

**`src/components/islands/`** — React islands, hydrated with `client:load`:

- `TracksOnRequest.tsx` — shelf animation with custom hooks
- `CatalogueGallery.tsx` — alice-carousel image carousel
- `Videos.tsx` — yet-another-react-lightbox video player
- `CatalogueWithFilter.tsx` — search + sort for the catalogue

**`src/styles/`** — CSS bundles:

- `global.css` — concatenation of `app/styles/` (normalize, colors, fonts, main)
- `components.css` — concatenation of all `app/ui/**/*.css` (mobile-first)
- `public/styles/desktop.css` — concatenation of all `app/ui/**/*.d.css` + `app/styles/desktop.css`, served with `media="(min-width: 811px)"`
- `public/styles/tablet.css` — tablet-only overrides
- `public/styles/*.css` — vendor CSS (jouele, alice-carousel, lightbox)

### TypeScript path alias

`~/` resolves to `src/` (configured in `astro.config.mjs` via Vite alias).

### Content data shapes (post-transform)

Images are `{url, title, description, width, height}` — **not** Contentful `Asset` objects.
Rich text (description, about pages) is **pre-rendered HTML string**, not a Document object.
All file links have `FILE_STORAGE` base URL already applied.

### Environment variables

Only needed to run the transform script (one-time data extraction):

- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENV`
- `FILE_STORAGE` — base URL for relative audio file links

The built site has zero runtime environment dependencies.
