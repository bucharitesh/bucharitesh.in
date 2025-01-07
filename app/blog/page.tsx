// import { ScrollArea } from "@/components/scroll-area";
import { allPosts } from "content-collections";
// import { Link } from "next-view-transitions";
import { Metadata } from "next/types";
// import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "My Blogs",
  alternates: {
    canonical: "/blog",
  },
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

// async function fetchData() {
//   return { posts: allPosts };
// }

export default async function Blogs() {
  // const { posts } = await fetchData();

  return (
    <>
      {/* <ScrollArea className="lg:hidden">
        <Suspense fallback={<p>...</p>}>
          {posts?.map((post) => {
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-1 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm hover:bg-gray-100"
              >
                <span className="font-medium">{post.title}</span>
                <span className="text-slate-500">
                  {post.readingTime}
                </span>
              </Link>
            );
          })}
        </Suspense>
      </ScrollArea> */}
    </>
  );
}
