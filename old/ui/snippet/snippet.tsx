import { OOF_GRAD } from "@/old/lib/constants";
import { Mdx } from "@/ui/mdx";
import { LikeButton2 } from "@/ui/like-button-2";
import { PostMetrics } from "@/ui/blog/post-metrics";
import { ScrollToTop } from "@/ui/ScrollToTop";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import { PostTableOfContents } from "../post-table-of-contents";
import { BlurImage } from "../mdx/blur-image";
import Back from "../back-button";

export default function Craft({ snippet }: { snippet: any }) {
  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <Back href={"/craft"} />

        <h1
          className={cn(
            "flex items-center space-x-4 justify-start mt-6 text-2xl font-medium sm:text-4xl",
            OOF_GRAD
          )}
        >
          {snippet.logo ? (
            <BlurImage
              height={40}
              width={40}
              src={`/images/snippets/${snippet.logo}`}
              alt={snippet.title}
              className="rounded-full"
            />
          ) : null}
          <Balancer>{snippet.title}</Balancer>
        </h1>

        <div className="mt-4 flex space-x-2 text-primary/50">
          <div>{snippet.publishedAtFormatted}</div>
          <div className="text-primary/30">&middot;</div>
          <PostMetrics slug={snippet.slugAsParams} />
        </div>
      </div>

      <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block space-y-8">
        <div className="space-y-6">
          {snippet.headings ? (
            <>
              <PostTableOfContents headings={snippet.headings} />
              <div className="border-t-2 border-primary/5"></div>
            </>
          ) : null}

          {/* <MostViewed /> */}

          <div className="flex items-center justify-between">
            <LikeButton2 slug={snippet.slugAsParams} />
            {/* TODO: Wire this up: <ScrollProgress /> */}

            <ScrollToTop>Back to top</ScrollToTop>
          </div>
        </div>
      </div>

      <Mdx code={snippet.body.code} />
    </>
  );
}
