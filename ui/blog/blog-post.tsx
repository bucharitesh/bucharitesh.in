import { OOF_GRAD } from "@/lib/constants";
import { FormattedPost } from "@/lib/contentlayer";
import { components, Mdx } from "@/ui/mdx";
import { LikeButton2 } from "@/ui/like-button-2";
import MostViewed from "@/ui/blog/most-viewed";
import { PostMetrics } from "@/ui/blog/post-metrics";
import { PostTableOfContents } from "@/ui/post-table-of-contents";
import { ScrollToTop } from "@/ui/ScrollToTop";
import { cn } from "@/lib/utils";
// import { Link } from "next-view-transitions"
import Balancer from "react-wrap-balancer";
// import { ChevronLeft } from "lucide-react"
import Back from "../back-button";

export default function Post({ post }: { post: FormattedPost }) {
  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <Back href={"/blog"} />

        <h1 className={cn("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>{post.title}</Balancer>
        </h1>

        <div className="mt-4 flex space-x-2 text-primary/50">
          <div>{post.publishedAtFormatted}</div>
          <div className="text-primary/30">&middot;</div>
          <div>{post.readingTime}</div>
          <div className="text-primary/30">&middot;</div>
          <PostMetrics slug={post.slug} />
        </div>
      </div>

      <div className="sticky top-0 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block space-y-8">
        <div className="space-y-6">
          {post.headings ? (
            <>
              <PostTableOfContents headings={post.headings} />
              <div className="border-t-2 border-primary/5"></div>
            </>
          ) : null}

          <MostViewed />

          <div className="flex items-center justify-between">
            <LikeButton2 slug={post.slug} />
            <ScrollToTop>Back to top</ScrollToTop>
          </div>
        </div>
      </div>

      <Mdx code={post.body.code} />

      <div className="mt-16">
        <LikeButton2 slug={post.slug} />
      </div>
    </>
  );
}
