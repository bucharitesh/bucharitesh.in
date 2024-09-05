"use client";

import { formatSnippetsPreview } from "@/lib/contentlayer"
import { ContentLink } from "./content-link";
import { BlurImage } from "../mdx/blur-image";

export const SnippetPostPreview = (
  snippet: ReturnType<typeof formatSnippetsPreview>,
) => {
  return (
    <div>
      <ContentLink className="flex justify-between" key={snippet.slug} href={`/snippet/${snippet.slug}`}>
        <div className="flex flex-col gap-4">
          <ContentLink.Title>{snippet.title}</ContentLink.Title>

          {snippet.description ? (
            <ContentLink.Text className="mt-0 text-sm">{snippet.description}</ContentLink.Text>
          ) : null}
        </div>

        {snippet.logo ? (
          <img src={snippet.logo} alt={snippet.title} className="h-8 w-8" />
        ) : null}
      </ContentLink>
    </div>
  )
}
