import { defineDocumentType } from "contentlayer/source-files"

export const UseItem = defineDocumentType(() => ({
  name: "UseItem",
  filePathPattern: "uses/*/*.mdx", // Changed to target files in subdirectories
  fields: {
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    link: { type: "string", required: true },
  },
}))

export const UseCategory = defineDocumentType(() => ({
  name: "UseCategory",
  filePathPattern: "uses/*.mdx", // This now correctly targets category files
  fields: {
    title: { type: "string", required: true },
    children: { type: "list", of: { type: "string" }, required: true },
  },
}))