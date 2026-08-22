# nhut-duong

Personal site built with [Astro](https://astro.build) — static output, TypeScript (strict preset).

## Tech Stack

- [Astro](https://astro.build) ^7.2.4 (static output)
- [Biome](https://biomejs.dev) 2.x for linting and formatting (incl. `.astro` files)
- TypeScript with the `astro/tsconfigs/strict` preset

## Prerequisites

- Node.js `>= 22.12.0`
- npm

## Project Structure

```text
/
├── public/            # Static assets (favicon, images)
├── src/
│   └── pages/         # File-based routes
│       └── index.astro
├── astro.config.mjs   # Astro configuration
├── tsconfig.json      # Extends astro/tsconfigs/strict
└── dist/              # Build output (generated)
```

Astro looks for `.astro` or `.md` files in `src/pages/`. Each page is exposed as a route based on its file name.

## Commands

All commands are run from the root of the project:

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installs dependencies                       |
| `npm run dev`     | Starts local dev server at `localhost:4321` |
| `npm run build`   | Builds the production site to `./dist/`     |
| `npm run preview` | Previews the build locally                  |
| `npm run check`   | Lints + formats (Biome, applies safe fixes) |
| `npm run ci`      | Non-mutating Biome check for CI             |

## Learn More

- [Astro documentation](https://docs.astro.build)
