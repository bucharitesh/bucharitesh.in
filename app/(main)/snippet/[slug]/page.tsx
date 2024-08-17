import { meta } from "@/lib/constants"
import { formatSnippet } from "@/lib/contentlayer"
import { createOgImage } from "@/lib/createOgImage"
import { allSnippets } from "contentlayer/generated"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Snippet from "@/ui/snippet/post"

export const generateStaticParams = () => {
  return allSnippets
    .map((p) => ({ slug: p.slug }))
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const snippet = allSnippets.find((post) => post.slug === params?.slug)

  if (!snippet) {
    notFound()
  }

  const url = `/blog/${snippet.slug}`
  const ogImage = createOgImage({
    title: snippet.title,
    meta: meta.domain,
  })

  return {
    title: snippet.title,
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: ogImage, width: 1600, height: 836, alt: snippet.title }],
    },
  }
}

export default async function SnippetsPage({ params }: Props) {
  const snippets = allSnippets.find((snippet) => snippet.slug === params?.slug)

  if (!snippets) {
    notFound()
  }

  const FormattedSnippet = formatSnippet(snippets)

  return <Snippet snippet={FormattedSnippet} />
}
