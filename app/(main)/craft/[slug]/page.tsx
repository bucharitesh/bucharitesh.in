import { meta } from "@/lib/constants"
import { getAllCrafts } from "@/lib/crafts"
import { createOgImage } from "@/lib/createOgImage"
import { SNIPPET_SCRIPT_ORG } from "@/lib/script"
import Snippet from "@/ui/snippet/snippet"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const generateStaticParams = async () => {
  const allCrafts = await getAllCrafts({})
  return allCrafts?.map((p) => ({ slug: p.slugAsParams }))
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allCrafts = await getAllCrafts({})

  const craft = allCrafts.find((post) => post.slugAsParams === params?.slug)

  if (!craft) {
    notFound()
  }

  const url = `/craft/${craft.slug}`

  const ogImage = createOgImage({
    title: craft.title,
    meta: meta.domain + " · " + craft.publishedAtFormatted,
  })

  return {
    title: craft.title,
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: ogImage, width: 1600, height: 836, alt: craft.title }],
    },
  }
}

export default async function CraftPage({ params }: Props) {
  const allCrafts = await getAllCrafts({})
  const craft = allCrafts.find((post) => post.slugAsParams === params?.slug)

  if (!craft) {
    notFound()
  }

  return (
    <>
      <SNIPPET_SCRIPT_ORG
        image={createOgImage({
          title: craft.title,
          meta: meta.domain,
        })}
        published_at={craft.publishedAt}
        title={craft.title}
        description={craft.description}
        slug={craft.slugAsParams}
      />
      <Snippet snippet={craft} />
    </>
  )
}
