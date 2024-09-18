import { OOF_GRAD } from "@/lib/constants"
import { FormattedSnippet } from "@/lib/contentlayer"
import { components } from "@/ui/mdx"
import { LikeButton2 } from "@/ui/like-button-2"
import { PostMetrics } from "@/ui/blog/post-metrics"
import { ScrollToTop } from "@/ui/ScrollToTop"
import { cn } from "@/lib/utils"
import { useMDXComponent } from "next-contentlayer/hooks"
import Balancer from "react-wrap-balancer"
import { PostTableOfContents } from "../post-table-of-contents"
import { BlurImage } from "../mdx/blur-image"
import Back from "../back-button"

export default function Snippet({ snippet }: { snippet: FormattedSnippet }) {
  const MDXContent = useMDXComponent(snippet.body.code);

  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <Back />

        <h1
          className={cn(
            "flex items-center space-x-4 justify-start mt-6 text-2xl font-medium sm:text-4xl",
            OOF_GRAD,
          )}
        >
          {snippet.logo ? (
            <BlurImage
              height={40}
              width={40}
              src={snippet.logo}
              alt={snippet.title}
              className="rounded-full"
            />
          ) : null}
          <Balancer>{snippet.title}</Balancer>
        </h1>

        <div className="mt-4 flex space-x-2 text-primary-200/50">
          <div>{snippet.publishedAtFormatted}</div>
          <div className="text-primary-200/30">&middot;</div>
          <PostMetrics slug={snippet.slug} />
        </div>
      </div>

      <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block space-y-8">
        <div className="space-y-6">
          {snippet.headings ? (
            <>
              <PostTableOfContents headings={snippet.headings} />
              <div className="border-t-2 border-primary-200/5"></div>
            </>
          ) : null}

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
