import { allUseCategories, allUseItems } from "contentlayer/generated"

export function getUses() {
  const processedCategories = allUseCategories.map((category) => ({
    ...category,
    children: category.children
      .map((childName) => allUseItems.find((item) => item.name === childName))
      .filter(Boolean),
  }))
  return processedCategories
}