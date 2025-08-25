import { Mdx } from "@/components/mdx-components";
import { meta } from "@/lib/config";
import { createOgImage } from "@/lib/createOgImage";
import { getTableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { allCrafts } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraftsPager } from "@/components/pager";
import { CopyLinkButton } from "./copy-button";

export const generateStaticParams = () => {
  return allCrafts.map((p) => ({ slug: p.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = allCrafts.find((post) => post.slug === slug);

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

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const craft = await allCrafts.find((post) => post.slug === slug);

  if (!craft) {
    notFound();
  }

  const toc = await getTableOfContents(craft.body.raw || "");

  return (
    <div className="layout-sm mb-40 relative z-10 grid gap-y-2 px-4 pt-12 lg:layout-craft lg:gap-x-9 lg:px-0 [&>*]:col-start-2 lg:[&>*]:col-start-3">
      <div className="mx-auto w-full">
        {/* <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <Link
            href="/craft"
            className="truncate hover:underline underline-offset-4 transition-all duration-300"
          >
            Craft
          </Link>
          <ChevronRightIcon className="size-4" />
          <div className="font-medium text-foreground">{craft.title}</div>
        </div> */}
        {/* <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {craft.title}
          </h1>
          {craft.description && (
            <p className="text-balance text-lg text-muted-foreground">
              {craft.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
            <CopyLinkButton />
        </div> */}

        <div className="mb-8 justify-start flex-nowrap items-center flex">
            <div className="w-full">
              <h1 className={cn("scroll-m-20 text-xl font-bold tracking-tight")}>
                {craft.title}
              </h1>
              <p className="text-balance text-sm text-muted-foreground">
                {craft.date.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
                <CopyLinkButton />
            </div>
        </div>

        <div className="pb-12">
          <Mdx code={craft.body.code || ""} />
        </div>
      </div>

      <div className="sticky space-y-4 top-14 right-0 hidden h-0 lg:!col-start-2 lg:row-start-1 lg:block col-span-1 max-w-md">
        {/* <TableOfContents toc={toc} /> */}
        {/* <Contribute craft={craft} /> */}
      </div>

      <CraftsPager craft={craft} />
    </div>
  );
}
