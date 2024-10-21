import { getAllPosts } from "@/lib/crafts";
import { BlogItem } from "@/ui/blog/blog-item";
import { ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

const RecentBlogs = async () => {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="font-semibold space-y-10">
      <h3 className="text-2xl">Recent Blogs</h3>
      <div className="space-y-4">
        {recentPosts.map((post) => {
          return <BlogItem key={post.slug} {...post} />;
        })}
      </div>
      <Link
        href="/blog"
        className="flex font-bold items-center justify-end hover:underline transition-all hover:underline-offset-4 text-primary/90 text-xs self-center gap-2 group"
      >
        view all
        <ArrowRight className="w-2 h-2 group-hover:translate-x-1 transition-all" />
      </Link>
    </div>
  );
};

export default RecentBlogs;
