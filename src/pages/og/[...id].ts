import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const posts = await getCollection("blog");

const pages = Object.fromEntries(posts.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "id",
  pages,
  getImageOptions: (_, page: (typeof pages)[number]) => {
    return {
      title: page.data.title,
      bgGradient: [[28, 38, 68]],
      border: { color: [200, 168, 112], width: 10 },
      padding: 60,
      logo: {
        path: "./public/android-chrome-512x512.png",
        size: [80],
      },
      font: {
        title: {
          color: [226, 220, 208],
          size: 60,
          lineHeight: 1.25,
          families: ["Source Serif 4"],
          weight: "Bold",
        },
      },
      fonts: ["./src/assets/fonts/source-serif-4-latin-700-normal.ttf"],
    };
  },
});
