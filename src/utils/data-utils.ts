import type { BlogPost, TagData } from "@/types";
import { slugify } from "@/utils/common-utils";

export function sortItemsByDateDesc(itemA: BlogPost, itemB: BlogPost): number {
  return (
    new Date(itemB.data.publishDate).getTime() -
    new Date(itemA.data.publishDate).getTime()
  );
}

export function getAllTags(posts: BlogPost[]): TagData[] {
  const tags: string[] = [
    ...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean)),
  ];

  return tags
    .map((tag) => ({
      name: tag,
      id: slugify(tag),
    }))
    .filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
    });
}

export function getPostsByTag(posts: BlogPost[], tagId: string): BlogPost[] {
  return posts.filter((post) =>
    (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId),
  );
}
