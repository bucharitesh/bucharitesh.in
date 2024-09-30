import { getSnippets } from "@/lib/snippets";
import { Button } from "@/ui/button";
import PageWrapper from "@/ui/layout/page-wrapper";
import { SnippetPostPreview } from "@/ui/snippet/snippet-preview"
import { Rss } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Snippets",
  description: "A collection of snippets that I've written.",
  alternates: {
    canonical: "/snippet",
  },
}

export default async function Page() {
  const { snippets } = await getSnippets();

  return (
    <PageWrapper
      title="Snippets"
      description="A collection of snippets that I've written."
      action={
        <Button variant={"secondary"} className="py-5">
          <Link href="/snippet/feed.xml">
            <Rss className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-10">
        {snippets.map((snippet) => {
          return <SnippetPostPreview key={snippet.slug} {...snippet} />
        })}
      </div>
    </PageWrapper>
  )
}
