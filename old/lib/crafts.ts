import { cache } from "react";
import "server-only";

import {
  allCrafts,
  allPosts,
  allUseCategories,
  allUseItems,
  UseCategory,
  UseItem,
} from "contentlayer/generated";

import { formatPostPreview } from "@/old/lib/contentlayer";

export const getAllCrafts = cache(
  async ({
    published = false,
    sorted = false,
  }: {
    sorted?: boolean;
    published?: boolean;
  }) => {
    try {
      let posts: any = [];

      posts = [...allCrafts];

      if (published) {
        posts = posts.filter((p) => p.published);
      }

      if (sorted && posts.length > 0) {
        // sort posts by published date
        posts = posts.sort(
          (a, b) =>
            Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        );
      }

      return posts ?? [];
    } catch (error) {
      console.info(error);
      return [];
    }
  }
);

export const getAllPosts = cache(async () => {
  try {
    let posts: any = [];

    let all = [
      ...allPosts
        // filter out draft posts
        .filter((p) => p.status === "published")
        .map(formatPostPreview),
    ];

    if (all.length > 0) {
      // sort posts by published date
      posts = all.sort(
        (a, b) =>
          Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
      );
    }

    return posts ?? [];
  } catch (error) {
    console.info(error);
    return [];
  }
});

export interface ProcessedUseCategory extends Omit<UseCategory, "children"> {
  children: UseItem[];
}

export function getUses(): ProcessedUseCategory[] {
  const processedCategories = allUseCategories.map((category) => ({
    ...category,
    children: category.children
      .map((childName) => allUseItems.find((item) => item.name === childName))
      .filter((item): item is UseItem => item !== undefined),
  }));

  return processedCategories;
}
