// import { SideMenu } from "@/components/bookmarks/sidebar";
// import { ListItem } from "@/components/bookmarks/list-item";
// import { allPosts } from "content-collections";
import React from "react";

// Revalidate all routes every 2 days
// export const revalidate = 60 * 60 * 24 * 2; // 2 days

// async function fetchData() {
//   return { posts: allPosts };
// }

export default async function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { posts } = await fetchData();

  return (
    <div className="h-screen w-screen">
      <div className="flex w-full h-full">
        {/* <SideMenu title="Blogs" isInner rss_url="/blog/feed.xml">
          <Suspense fallback={<p>...</p>}>
            <div className="flex flex-col gap-1 text-sm">
              {posts?.map((post) => {
                return (
                  <ListItem
                    key={post.slug}
                    path={`/blog/${post.slug}`}
                    title={post.title}
                    description={post.readingTime}
                  />
                );
              })}
            </div>
          </Suspense>
        </SideMenu> */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
