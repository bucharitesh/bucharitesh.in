import { MDX } from '@/components/markdown/mdx';

import { CopyLink } from '@/components/copy-button';
import { FloatingHeader } from '@/components/navigation/floating-header';
import { TOCItems, TOCProvider, TOCScrollArea } from '@/components/toc';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prose } from '@/components/ui/typography';
import { USER } from '@/config/user';
import { DocsCopyPage } from '@/features/craft/components/copy-page';
import { getAllCrafts, getCraftBySlug } from '@/features/craft/data/posts';
import { createOgImage } from '@/lib/createOgImage';
import { BlogPosting, JsonLd, WithContext } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { getTableOfContents } from 'fumadocs-core/server';
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

  const { title, date, description } = post.metadata;

  const ogImage = createOgImage({
    title: title,
    meta: USER.domain + ' · ' + date,
  });

  return createMetadata({
    title: title,
    description: description,
    image: ogImage,
  });
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
    notFound();
  }

  const { title, date, description } = post.metadata;

  const toc = await getTableOfContents(post.content);

  const jsonLd: WithContext<BlogPosting> = {
    '@type': 'BlogPosting',
    '@context': 'https://schema.org',
    datePublished: dayjs(date).toISOString(),
    description: description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': new URL(`/craft/${post.slug}`, USER.website).toString(),
    },
    headline: title,
    image: post.metadata.image,
    dateModified: dayjs(date).toISOString(),
    author: USER.name,
    isAccessibleForFree: true,
  };

  return (
    <TOCProvider toc={toc}>
      <JsonLd code={jsonLd} />
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

            <div className="mb-8 flex flex-nowrap items-start justify-start">
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
                <DocsCopyPage
                  page={`https://${USER.domain}/craft/${post.slug}`}
                  url={`https://${USER.domain}/craft/${post.slug}`}
                />
              </div>
            </div>

            <Prose className="pb-12">
              <p className="lead mt-6 mb-6">{post.metadata.description}</p>

              <MDX code={post.content} />
            </Prose>
          </div>

          <div className="sticky top-14 right-0 col-span-1 hidden h-0 max-w-md space-y-4 lg:col-start-2! lg:row-start-1 lg:block">
            {/* <CraftsPager craft={post} /> */}
          </div>

          <div className="sticky top-14 left-0 col-span-1 hidden h-0 max-w-md space-y-4 lg:col-start-4! lg:row-start-1 lg:block">
            {/* <TableOfContents toc={toc} /> */}
            <p className="mb-2 text-fd-muted-foreground text-sm">
              On this page
            </p>
            <div className="flex flex-col">
              <TOCScrollArea>
                <TOCItems />
              </TOCScrollArea>
            </div>
          </div>

          {/* <CraftsPager craft={craft} /> */}
        </div>
      </ScrollArea>
    </TOCProvider>
  );
}
