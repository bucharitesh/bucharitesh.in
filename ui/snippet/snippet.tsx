import { OOF_GRAD } from "@/lib/constants"
import { FormattedSnippet } from "@/lib/contentlayer"
import { components } from "@/ui/mdx"
import { LikeButton2 } from "@/ui/like-button-2"
import MostViewed from "@/ui/blog/most-viewed"
import { PostMetrics } from "@/ui/blog/post-metrics"
import { ScrollToTop } from "@/ui/ScrollToTop"
import clsx from "clsx"
import { useMDXComponent } from "next-contentlayer/hooks"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { ChevronLeft } from "lucide-react"

export default function Snippet({ snippet }: { snippet: FormattedSnippet }) {
  const MDXContent = useMDXComponent(snippet.body.code)

  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <Link
          href="/snippet"
          className="group inline-flex items-center space-x-2"
        >
          <div className="transition rounded-full bg-primary-200/10 p-1 text-primary-200/80 group-hover:bg-primary-200/25 group-hover:text-primary-200">
            <ChevronLeft className="w-4 h-4 group-hover:scale-125 transition-transform group-active:scale-110" />
          </div>
          <div className="mt-0.5 text-primary-200/70 group-hover:text-primary-200/90 transition">
            All Snipppets
          </div>
        </Link>

        <h1 className={clsx("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>{snippet.title}</Balancer>
        </h1>

        <div className="mt-4 flex space-x-2 text-primary-200/50">
          <PostMetrics slug={snippet.slug} />
        </div>
      </div>

      <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block space-y-8">
        <div className="space-y-6">
          {/* {snippet.headings ? (
            <>
              <PostTableOfContents headings={snippet.headings} />
              <div className="border-t-2 border-primary-200/5"></div>
            </>
          ) : null} */}

          {/* <MostViewed /> */}

          <div className="flex items-center justify-between">
            <LikeButton2 slug={snippet.slug} />
            {/* TODO: Wire this up: <ScrollProgress /> */}

            <ScrollToTop>Back to top</ScrollToTop>
          </div>
        </div>
      </div>

      <MDXContent components={components} />

      <div className="mt-16">
        <LikeButton2 slug={snippet.slug} />
      </div>
    </>
  )
}
