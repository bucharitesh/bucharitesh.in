"use client";

import { ContentLink } from "./content-link";
import { BlurImage } from "../mdx/blur-image";
import { cn } from "@/lib/utils";

export const SnippetPostPreview = (snippet: ReturnType<any>) => {
  return (
    <div>
      <ContentLink
        className="flex justify-between"
        href={`/craft/${snippet.slugAsParams}`}
      >
        <div className="flex flex-col gap-4">
          <ContentLink.Title>{snippet.title}</ContentLink.Title>

          {snippet.description ? (
            <ContentLink.Text className="mt-0 text-sm">
              {snippet.description}
            </ContentLink.Text>
          ) : null}
        </div>

        <h1 className={cn("text-2xl font-medium sm:text-4xl")}>
          {snippet.logo ? (
            <BlurImage
              height={40}
              width={40}
              src={`/images/snippets/${snippet.logo}`}
              alt={snippet.title}
              className="rounded-full"
            />
          ) : null}
        </h1>
      </ContentLink>
    </div>
  );
};
