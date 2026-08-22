## Development

Package manager: npm. Node >= 22.12.0 required.

Styling: Tailwind CSS v4 via the `@tailwindcss/vite` plugin (no `tailwind.config` file; customize the theme with `@theme` in `src/styles/global.css`). Import `global.css` in a shared layout.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Verification

- Build: `npm run build`
- Lint/format: `npm run check` (Biome; applies safe fixes). Non-mutating CI check: `npm run ci`
- Biome config: `biome.json` — 2-space indent, experimental `.astro` support enabled, respects `.gitignore`
- TypeScript uses the `astro/tsconfigs/strict` preset. Run `astro check` to type-check `.astro` files (requires installing `@astrojs/check` first).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
