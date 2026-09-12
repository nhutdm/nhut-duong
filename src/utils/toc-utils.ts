import type { MarkdownHeading } from "astro";
import type { TocItem } from "@/types";

function diveChildren(item: TocItem, depth: number): TocItem[] {
  if (depth === 1 || !item.subheadings.length) {
    return item.subheadings;
  }
  return diveChildren(
    item.subheadings[item.subheadings.length - 1] as TocItem,
    depth - 1,
  );
}

export function generateToc(headings: readonly MarkdownHeading[]): TocItem[] {
  const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
  const toc: TocItem[] = [];

  bodyHeadings.forEach((h) => {
    const heading: TocItem = { ...h, subheadings: [] };

    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      // biome-ignore lint/style/noNonNullAssertion: an h2 is always pushed before any deeper heading
      const lastItemInToc = toc[toc.length - 1]!;
      if (heading.depth < lastItemInToc.depth) {
        throw new Error(`Orphan heading found: ${heading.text}.`);
      }

      const gap = heading.depth - lastItemInToc.depth;
      const target = diveChildren(lastItemInToc, gap);
      target.push(heading);
    }
  });

  return toc;
}
