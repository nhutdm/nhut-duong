import type { CollectionEntry } from "astro:content";
import type { Thing, WithContext } from "schema-dts";

export type { Thing, WithContext } from "schema-dts";

export type BlogPost = CollectionEntry<"blog">;

export interface BaseHeadProps extends Record<string, unknown> {
  title?: string;
  description?: string;
  author?: string;
  twitter?: string;
  image?: { src: string; alt?: string };
  pageType?: "website" | "article";
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
}

export interface PostListItemProps extends Record<string, unknown> {
  post: BlogPost;
  class?: string;
  hideTags?: boolean;
}

export interface TOCProps extends Record<string, unknown> {
  headings: readonly import("astro").MarkdownHeading[];
  class?: string;
}

export interface TocItem extends Record<string, unknown> {
  depth: number;
  slug: string;
  text: string;
  subheadings: TocItem[];
}

export type TagData = {
  name: string;
  id: string;
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface JsonLdProps {
  schema: WithContext<Thing> | WithContext<Thing>[];
}
