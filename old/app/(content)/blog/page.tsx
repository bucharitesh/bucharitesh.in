import { getAllPosts } from "@/old/lib/crafts";
// import { BlogItem } from "@/old/ui/blog/blog-item";

// import MostViewed from "@/old/ui/blog/most-viewed";
// import { Button } from "@/old/ui/button";
// import PageWrapper from "@/old/ui/layout/page-wrapper";
import { Rss } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next/types";

/**
 * Aside from our home page which lists all posts, we can further filter down
 * posts by type e.g. (post or video) and tag (e.g. react or next). We can use
 * `generateStaticParams()` to generate a static list of all possible params of
 * our filters based on our database of posts.
 */

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function Page() {
  const posts = await getAllPosts();

  return (
    // <PageWrapper
    //   title="Blogs"
    //   description="Read my thoughts on software development, design, and more."
    //   action={
    //     <Button variant={"outline"} className="rounded-full h-8 w-8">
    //       <Link href="/blog/feed.xml">
    //         <Rss className="h-4 w-4" />
    //       </Link>
    //     </Button>
    //   }
    // >
    //   {posts && (
    //     <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-3 xl:block">
    //       <MostViewed />
    //     </div>
    //   )}

    //   <div className="space-y-4">
    //     {posts.map((post) => {
    //       return <BlogItem key={post.slug} {...post} />;
    //     })}
    //   </div>
    // </PageWrapper>
    <></>
  );
}
