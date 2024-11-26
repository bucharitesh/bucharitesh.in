import {
  allUseCategories,
  allUseItems,
  UseCategory,
  UseItem,
} from "@/old/.contentlayer/generated";

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
