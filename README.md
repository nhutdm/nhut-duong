# nhut-duong

Personal site built with [Astro](https://astro.build) — static output, TypeScript (strict preset).

## Tech Stack

- [Astro](https://astro.build) ^7.2.9 (static output, zero-JS) — MDX, sitemap, RSS, Fonts API (self-hosted Inter + Newsreader via the Fontsource provider), dynamic OG images (`astro-og-canvas`)
- [Tailwind CSS](https://tailwindcss.com) v4 via the `@tailwindcss/vite` plugin (+ `@tailwindcss/typography`, shadcn-style theme tokens in `src/styles/global.css`)
- [Biome](https://biomejs.dev) 2.x for linting and formatting (incl. `.astro` files)
- TypeScript with the `astro/tsconfigs/strict` preset
- Deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/) as static assets (Wrangler)

Content: Markdown blog (`src/content/blog`) + MDX pages (`src/content/pages`), validated by Zod schemas in `src/content.config.ts`.

Note: builds fetch fonts (Fontsource) and the OG-image font from CDNs on a cold cache — see `.astro/fonts` / `node_modules/.astro/fonts`.

## Prerequisites

- Node.js `>= 22.12.0`
- npm

## Project Structure

```text
/
├── public/            # Static assets (favicons, manifest, og.png, avatar, robots.txt)
├── src/
│   ├── components/    # Astro components (Badge, Breadcrumbs, TOC, ThemeToggle, ...)
│   ├── content/       # Content collections (blog/*.md, pages/*.mdx)
│   ├── content.config.ts  # Collection schemas (Zod via astro/zod)
│   ├── data/          # site-config.ts (nav, social, hero)
│   ├── icons/         # Astro icon components
│   ├── layouts/       # BaseLayout.astro (head, JSON-LD, breadcrumbs, view transitions)
│   ├── lib/           # cn() helper
│   ├── pages/         # File-based routes (index, blog/, tags/, og/, rss.xml, 404)
│   ├── styles/
│   │   └── global.css # Tailwind v4 entry: theme tokens, @theme inline fonts, prose overrides
│   ├── types/         # Shared types
│   └── utils/         # data, schema (JSON-LD), breadcrumb, toc helpers
├── astro.config.mjs   # Astro configuration (site, fonts, mdx/sitemap integrations)
├── biome.json         # Biome lint/format configuration
├── tsconfig.json      # Extends astro/tsconfigs/strict, @/* path alias
├── wrangler.jsonc     # Cloudflare Workers static assets config (serves ./dist)
└── dist/              # Build output (generated)
```

Astro looks for `.astro`, `.md(x)`, or endpoint `.js` files in `src/pages/`. Each is exposed as a route based on its file name.

## Commands

All commands are run from the root of the project:

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Installs dependencies                           |
| `npm run dev`     | Starts local dev server at `localhost:4321`     |
| `npm run build`   | Builds the production site to `./dist/`         |
| `npm run preview` | Previews the build locally                      |
| `npm run check`   | Lints + formats (Biome, applies safe fixes)     |
| `npm run ci`      | Non-mutating Biome check for CI                 |
| `npx wrangler dev`    | Serves `./dist` on a local Workers runtime (build first) |
| `npx wrangler deploy` | Deploys `./dist` to Cloudflare Workers (build first)    |

## Deployment

The site deploys to Cloudflare Workers as static assets, configured in `wrangler.jsonc`:

- `assets.directory` points at the Astro build output (`./dist`) — always run `npm run build` before `npx wrangler dev` or `npx wrangler deploy`.
- `assets.not_found_handling: "404-page"` serves the built `404.html` for unknown routes.
- Wrangler local state lives in `.wrangler/` (gitignored).

## Learn More

- [Astro documentation](https://docs.astro.build)
