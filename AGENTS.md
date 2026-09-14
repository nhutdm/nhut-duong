## Design System

This project uses the DESIGN.md format to define visual rules. The `DESIGN.md` file at the repo root (Signal, synced from designmd.app/library/signal) is the source of truth for all UI decisions.

### Mandatory instructions for UI

1. BEFORE generating any visual component, read DESIGN.md completely
2. Use EXCLUSIVELY the tokens defined in the YAML front matter
3. Follow the typographic scale without inventing intermediate sizes
4. Spacing must be multiples of the base value (0.5rem / 8px)
5. Every interactive element needs: hover, focus, disabled
6. The "Do's and Don'ts" section of DESIGN.md is inviolable

### Quick token reference (DESIGN.md summary)

- Primary (deep navy): #1c2644 · Secondary (navy alt): #232f55
- Tertiary (bone/fg): #e2dcd0 · Neutral (muted gold accent): #c8a870 · Surface (bone paper): #f0ece3
- Display/serif: Source Serif 4 700 · Body/UI: DM Sans 400 · Code: IBM Plex Mono
- Typography: h1 2.5rem/700 · body-md 1rem/400
- Spacing: sm 1.0rem · md 2.0rem · lg 4.0rem (base unit 0.5rem)
- Corner radius: 4px
- The site renders a single fixed theme: navy #1c2644 page canvas with bone text; bone-paper #f0ece3 is reserved for cards/surfaces with navy text; gold only for rules and highlights

### Files that must NOT be edited

- DESIGN.md — read-only source of truth; propose changes via a report, never edit
- AGENTS.md — this file
- package-lock.json — managed by npm

## Development

Package manager: npm. Node >= 22.12.0 required.

Astro 7 static site (`site: https://nhutduong.com`). Integrations: `@astrojs/mdx`, `@astrojs/sitemap` (blog URLs get `lastmod` from frontmatter via the `serialize` hook in `astro.config.mjs`). Fonts are managed by the Astro Fonts API (`fonts` in `astro.config.mjs`, Fontsource provider): DM Sans + Source Serif 4 (variable) + IBM Plex Mono (400/500), latin subset — downloaded at build time into `dist/_astro/fonts/`, referenced via `<Font />` from `astro:assets` in `BaseLayout.astro` (with `preload` and Astro-generated metric-matched fallbacks). Builds therefore need network access on a cold cache (`.astro/fonts` / `node_modules/.astro/fonts`). Dynamic OG images via `astro-og-canvas` (`src/pages/og/[...id].ts`, Source Serif 4 font vendored at `src/assets/fonts/` — no network needed at build time).

Deployment: Cloudflare Workers static assets via `wrangler.jsonc` (`assets.directory: ./dist`, `not_found_handling: "404-page"` serves the built `404.html`). `npx wrangler dev` / `npx wrangler deploy` operate on the built `dist/` — run `npm run build` first. Wrangler local state is in `.wrangler/` (gitignored); `wrangler` is a devDependency.

Styling: Tailwind CSS v4 via the `@tailwindcss/vite` plugin (pure CSS-first config — no `tailwind.config` file). Design system: `DESIGN.md` (Signal, synced from designmd.app/library/signal — deep navy `#1c2644` primary / bone `#e2dcd0` / muted gold `#c8a870` accent on bone-paper surface `#f0ece3`; Display/serif = Source Serif 4 700, body/UI = DM Sans, code = IBM Plex Mono; 4px radii). Theme tokens are CSS variables in `:root` in `src/styles/global.css`, re-exported via `@theme inline`; typography prose overrides live in the same file as `.prose` CSS variables. Rendered Markdown is wrapped in the reusable `Prose.astro` component (per the Astro "Style rendered Markdown with Tailwind Typography" recipe) — it sets `max-w-none` so page containers control the column width (the plugin's default 65ch cap would squeeze layouts like the About page's floated avatar), and page chrome outside it carries its own utility classes, so `not-prose` escapes are never needed. Fonts are registered in that same `@theme inline` block as `--font-sans: var(--font-inter)` / `--font-serif: var(--font-newsreader)` (variables provided by the Fonts API). Gotcha: `@theme inline` does not emit theme variables as real CSS custom properties — hand-written CSS must reference the Fonts API variables directly (see the `.prose :is(h1…h6)` rule using `var(--font-newsreader)`), and the prose heading rule relies on `:is()` (specificity 0,1,1) beating the typography plugin's `:where()` rules. The site is single fixed theme (navy canvas): no `.dark` tokens, no theme toggle, no pre-paint theme script; the browser `theme-color` meta is fixed at `#1c2644`.

Zero-JS architecture: no framework islands and no React. All UI is `.astro` components; interactivity (TOC progress) is vanilla `<script>` / custom elements. The only shipped JS is the `ClientRouter` view-transition script. `cn()` (clsx + tailwind-merge) is the only export of `src/lib/utils.ts`, used by `Badge.astro` / `Breadcrumbs.astro` for class merging. If a truly interactive component is ever needed, re-add a framework integration rather than hydrating static markup.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Layout

- `src/content.config.ts` — content collection schemas (blog + pages). Zod is imported from `astro/zod`.
- `src/data/site-config.ts` — single source of truth for title, nav, social links, hero.
- `src/layouts/BaseLayout.astro` — wraps every page; emits JSON-LD, breadcrumbs, and `<ClientRouter />` view transitions.
- `src/utils/toc-utils.ts` — `generateToc` throws at build time on orphan headings (e.g. an `h3` with no preceding `h2`).
- `src/pages/[...id].astro` — catch-all for MDX pages from `src/content/pages/`.
- `src/pages/blog/[...page].astro` and `src/pages/tags/[id]/[...page].astro` — paginated (pageSize 10, `Pagination.astro` renders prev/next when a second page exists; note Astro 7's `Page` uses `lastPage`, not `totalPages`).
- `src/components/TOC.astro` — custom element (`toc-heading`); scroll progress is rAF-throttled (no polling interval), listeners are cleaned up in `disconnectedCallback` for view transitions.
- Content dates are ISO (`YYYY-MM-DD`) in frontmatter and rendered with `timeZone: "UTC"` (`FormattedDate.astro`) so output is independent of the build machine's locale.
- `src/utils/schema-utils.ts` — JSON-LD factories; site URLs derive from `import.meta.env.SITE` (the `site` config value), not hand-rolled env vars; `dateModified` only comes from real content dates (via BaseLayout's `lastModified` prop), never build time.
- Path alias: `@/*` → `src/*` (tsconfig).

## Conventions

- `compressHTML` defaults to `'jsx'` (Astro 7): put explicit `{' '}` between adjacent inline expressions (see `Footer.astro`).
- Decorative SVGs carry `aria-hidden="true"` (Biome `noSvgWithoutTitle`).
- Biome suppressions are targeted comments; `useAnchorContent` is disabled for `.astro` files (slot-based anchors).
- Static assets in `public/` are excluded from Biome.

## Verification

- Build: `npm run build` (static output to `dist/`)
- Lint/format: `npm run check` (Biome; applies safe fixes). Non-mutating CI check: `npm run ci`
- Local production preview on the Workers runtime: `npm run build && npx wrangler dev` (serves `dist/`, including 404 handling). `npm run preview` uses Astro's own preview server instead.
- Deploy: `npm run build && npx wrangler deploy`
- Biome config: `biome.json` — 2-space indent, double quotes, experimental `.astro` support, `css.parser.tailwindDirectives` enabled, respects `.gitignore`
- TypeScript uses the `astro/tsconfigs/strict` preset. Run `astro check` to type-check `.astro` files (requires installing `@astrojs/check` first — it is not a dependency).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Scripts and event handling / view transitions](https://docs.astro.build/en/guides/client-side-scripts/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Using custom fonts (Fonts API)](https://docs.astro.build/en/guides/fonts/)
