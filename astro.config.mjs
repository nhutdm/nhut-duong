// @ts-check

import { readFileSync } from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

const blogDir = new URL("./src/content/blog/", import.meta.url);

function getBlogLastmod(url) {
  const match = url.match(/\/blog\/([^/]+)\/?$/);
  const slug = match?.[1];
  if (!slug) return undefined;
  try {
    const content = readFileSync(new URL(`${slug}.md`, blogDir), "utf-8");
    const updated = content.match(/^updatedDate:\s*['"]?([\d-]{10})/m)?.[1];
    const published = content.match(/^publishDate:\s*['"]?([\d-]{10})/m)?.[1];
    const date = updated ?? published;
    return date ? new Date(date) : undefined;
  } catch {
    return undefined;
  }
}

// https://astro.build/config
export default defineConfig({
  site: "https://nhutduong.com",
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Source Serif 4",
      cssVariable: "--font-source-serif",
      weights: ["200 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-ibm-plex-mono",
      weights: ["400"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const lastmod = getBlogLastmod(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
