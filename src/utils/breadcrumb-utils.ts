import { getCollection } from "astro:content";
import type { BreadcrumbItem } from "@/types";
import { slugify } from "@/utils/common-utils";

export async function generateBreadcrumbItems(
  path: string,
): Promise<BreadcrumbItem[]> {
  const items: BreadcrumbItem[] = [];

  const pathSegments = path.replace(/\/$/, "").split("/").filter(Boolean);

  items.push({
    label: "Home",
    href: "/",
  });

  if (pathSegments.length === 0) {
    return items;
  }

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const isLast = i === pathSegments.length - 1;
    const prevSegment = pathSegments[i - 1];

    if (segment === "blog") {
      items.push({
        label: "Blog",
        href: isLast ? undefined : "/blog",
      });
    } else if (prevSegment === "blog" && isLast) {
      const postTitle = await getPostTitle(segment);
      items.push({
        label: postTitle || formatLabel(segment),
        href: undefined,
      });
    } else if (segment === "tags") {
      items.push({
        label: "Tags",
        href: isLast ? undefined : "/tags",
      });
    } else if (prevSegment === "tags" && isLast) {
      const tagName = await getTagName(segment);
      items.push({
        label: tagName || formatLabel(segment),
        href: undefined,
      });
    } else if (/^\d+$/.test(segment)) {
      items.push({
        label: `${segment}`,
        href: undefined,
      });
    } else {
      items.push({
        label: formatLabel(segment),
        href: isLast ? undefined : `/${pathSegments.slice(0, i + 1).join("/")}`,
      });
    }
  }

  if (items.length > 3) {
    return [items[0], items[items.length - 2], items[items.length - 1]];
  }

  return items;
}

async function getPostTitle(slug: string): Promise<string | null> {
  try {
    const posts = await getCollection("blog");
    const post = posts.find((p) => p.id === slug);
    return post?.data.title || null;
  } catch {
    return null;
  }
}

async function getTagName(slug: string): Promise<string | null> {
  try {
    const posts = await getCollection("blog");
    const tags = posts
      .flatMap((post) => post.data.tags || [])
      .map((tag) => ({ id: slugify(tag), name: tag }));

    const tag = tags.find((t) => t.id === slug);
    return tag?.name || null;
  } catch {
    return null;
  }
}

function formatLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function shouldShowBreadcrumbs(path: string): boolean {
  return path !== "/" && path !== "";
}

export function generateBreadcrumbStructuredData(
  items: BreadcrumbItem[],
  currentPath: string,
  baseUrl?: string,
) {
  const siteUrl = baseUrl || import.meta.env.SITE || "https://nhutduong.com";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const listItem: {
        "@type": "ListItem";
        position: number;
        name: string;
        item: string;
      } = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.href
          ? new URL(item.href, siteUrl).toString()
          : new URL(currentPath, siteUrl).toString(),
      };
      return listItem;
    }),
  };
}
