import { defineDocumentType } from "contentlayer/source-files"

export const DesignInspirationItem = defineDocumentType(() => ({
  name: "DesignInspirationItem",
  filePathPattern: "design-inspiration/*.mdx", // Changed to target files in subdirectories
  fields: {
    name: { type: "string", required: true },
    twitter: { type: "string", required: true },
    website: { type: "string", required: true },
    images: { type: "list", of: { type: "string" }, required: true },
  },
}));