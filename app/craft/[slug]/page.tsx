import { meta } from "@/lib/config";
import { createOgImage } from "@/lib/createOgImage";
import { allPosts } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateStaticParams = () => {
  return allPosts.map((p) => ({ slug: p.slug }));
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params?.slug);

  if (!post) {
    notFound();
  }

  const url = `/craft/${post.slug}`;

  const ogImage = createOgImage({
    title: post.title,
    meta: meta.domain + " · " + post.date,
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

  return (
    <>
      {/* <BLOG_SCRIPT_ORG
        image={createOgImage({
          title: post.title,
          meta: meta.domain + " · " + post.publishedAtFormatted,
        })}
        published_at={post.publishedAt}
        title={post.title}
        description={post.description}
        slug={post.slug}
      /> */}
      {/* <Post post={formattedPost} /> */}
    </>
  );
}
