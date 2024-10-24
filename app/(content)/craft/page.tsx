import Section from "@/app/section"
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
    <div className="grid gap-2 w-full">
      {crafts.map((craft) => {
        return <SnippetPostPreview key={craft.slugAsParams} {...craft} />;
      })}

      <Section />
    </div>
    // </PageWrapper>
  );
}
