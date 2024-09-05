import { getSnippets } from "@/lib/snippets";
import PageWrapper from "@/ui/layout/page-wrapper";
import { SnippetPostPreview } from "@/ui/snippet/snippet-preview"
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Snippets",
  description: "A collection of snippets that I've written.",
}

export default async function Page() {
  const { snippets } = await getSnippets();

  return (
    <PageWrapper title="Snippets">
      <div className="grid grid-cols-2 space-y-10">
        {snippets.map((snippet) => {
          return <SnippetPostPreview key={snippet.slug} {...snippet} />
        })}
      </div>
    </PageWrapper>
  )
}
