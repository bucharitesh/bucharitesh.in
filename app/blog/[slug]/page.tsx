// import { notFound } from "next/navigation";

// import { ScrollArea } from "@/components/scroll-area";
// import { RichText } from "@/components/contentful/rich-text";
// import { cn, getDateTimeFormat, isDevelopment } from "@/lib/utils";
import { allPosts } from "content-collections";
// import Balancer from "react-wrap-balancer";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

// async function fetchData(slug) {
//   const post = allPosts.find((post) => post.slug === slug);

//   if (!post) {
//     notFound();
//   }

//   return {
//     post,
//   };
// }

export default async function WritingSlug({ params }) {
  // const { slug } = params;
  // const { post } = await fetchData(slug);

  return (
    <>
      {/* <ScrollArea className="" useScrollAreaId>
        <div className="content-wrapper">
          <article className="content container">
            <div className={cn("mb-6 text-4xl font-bold font-x")}>
              <Balancer as="h1">{post.title}</Balancer>
            </div>
            <span>{post.description}</span>
          </article>
        </div>
      </ScrollArea> */}
    </>
  );
}