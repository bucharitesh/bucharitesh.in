// import Post from "@/old/ui/blog/blog-post";
import { meta } from "@/old/lib/constants";
import { formatPost } from "@/old/lib/contentlayer";
import { createOgImage } from "@/old/lib/createOgImage";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_SCRIPT_ORG } from "@/old/lib/script";

export const generateStaticParams = () => {
  return allPosts
    .filter((p) => p.status === "published")
    .map((p) => ({ slug: p.slug }));
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params?.slug);

  if (!post) {
    notFound();
  }

  const url = `/blog/${post.slug}`;

  const ogImage = createOgImage({
    title: post.title,
    meta: meta.domain + " · " + post.publishedAtFormatted,
  });

  return {
    title: post.title,
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: ogImage, width: 1600, height: 836, alt: post.title }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params?.slug);

  if (!post) {
    notFound();
  }

  const formattedPost = formatPost(post);

  return (
    <>
      <BLOG_SCRIPT_ORG
        image={createOgImage({
          title: post.title,
          meta: meta.domain + " · " + post.publishedAtFormatted,
        })}
        published_at={post.publishedAt}
        title={post.title}
        description={post.description}
        slug={post.slug}
      />
      {/* <Post post={formattedPost} /> */}
    </>
  );
}
