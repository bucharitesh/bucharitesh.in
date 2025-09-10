import { MDX } from '@/components/mdx-components';

import { CopyLink } from '@/components/copy-button';
import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prose } from '@/components/ui/typography';
import { USER } from '@/config/user';
import { getAllCrafts, getCraftBySlug } from '@/features/craft/data/posts';
import { createOgImage } from '@/lib/createOgImage';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return getAllCrafts().map((p) => ({ slug: p.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getCraftBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, date } = post.metadata;

  const url = `/craft/${post.slug}`;

  const ogImage = createOgImage({
    title: title,
    meta: USER.domain + ' · ' + date,
  });

  return {
    title: title,
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: ogImage, width: 1600, height: 836, alt: title }],
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
  const post = await getCraftBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { title, date } = post.metadata;

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle={title} />
      <div className="layout relative z-10 content-wrapper">
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

          <div className="mb-8 flex flex-nowrap items-center justify-start">
            <div className="w-full">
              <h1
                className={cn('scroll-m-20 font-bold text-xl tracking-tight')}
              >
                {title}
              </h1>
              <p className="text-balance text-muted-foreground text-sm">
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CopyLink value={`https://${USER.domain}/craft/${post.slug}`} />
            </div>
          </div>

          <Prose className="pb-12">
            <p className="lead mt-6 mb-6">{post.metadata.description}</p>

            <MDX code={post.content} />
          </Prose>
        </div>

        <div className="sticky top-14 right-0 col-span-1 hidden h-0 max-w-md space-y-4 lg:col-start-2! lg:row-start-1 lg:block">
          {/* <TableOfContents toc={toc} /> */}
        </div>

        <div className="sticky top-14 left-0 col-span-1 hidden h-0 max-w-md space-y-4 lg:col-start-4! lg:row-start-1 lg:block">
          {/* <Contribute craft={post} /> */}
        </div>

        {/* <CraftsPager craft={craft} /> */}
      </div>
    </ScrollArea>
  );
}
