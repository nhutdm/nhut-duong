import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import siteConfig from "@/data/site-config.ts";
import { sortItemsByDateDesc } from "@/utils/data-utils.ts";

export async function GET(context) {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);

  const container = await AstroContainer.create();
  const items = await Promise.all(
    posts.map(async (item) => {
      const { Content } = await render(item);
      const content = await container.renderToString(Content);
      return {
        title: item.data.title,
        description: item.data.excerpt,
        link: `/blog/${item.id}/`,
        pubDate: item.data.publishDate,
        categories: item.data.tags,
        content,
      };
    }),
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
