"use client";

import { formatPostPreview } from "@/lib/contentlayer"
import { ContentLink } from "./content-link";

export const SnippetPostPreview = (snippet: ReturnType<typeof formatPostPreview>) => {
  return (
    <div>
      <ContentLink key={snippet.slug} href={`/snippet/${snippet.slug}`}>
        <ContentLink.Title>{snippet.title}</ContentLink.Title>

        {snippet.description ? (
          <ContentLink.Text>{snippet.description}</ContentLink.Text>
        ) : null}
      </ContentLink>
    </div>
  )
}
