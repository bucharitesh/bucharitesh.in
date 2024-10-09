import { getAllCrafts } from "@/lib/crafts"
import { Button } from "@/ui/button"
import PageWrapper from "@/ui/layout/page-wrapper"
import { SnippetPostPreview } from "@/ui/snippet/snippet-preview"
import { Rss } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Craft",
  description: "A collection of craft that I've written.",
  alternates: {
    canonical: "/craft",
  },
}

export default async function Page() {
  const crafts = await getAllCrafts({ published: true, sorted: true })

  return (
    <PageWrapper
      title="Craft"
      description="A collection of craft that I've written."
      action={
        <Button variant={"secondary"} className="py-5">
          <Link href="/craft/feed.xml">
            <Rss className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-1 space-y-10">
        {crafts.map((craft) => {
          return <SnippetPostPreview key={craft.slugAsParams} {...craft} />
        })}
      </div>
    </PageWrapper>
  )
}
