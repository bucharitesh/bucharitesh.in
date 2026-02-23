import { ENABLE_BUDDY } from '@/config/site';
import { USER } from '@/config/user';
import { BuddyOptions } from '@/features/buddy/options';
import { createOgImage } from '@/lib/createOgImage';
import { createMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Force static generation at build time
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Buddy';
  const description = `${USER.name}'s Buddy - Configure like you own it.`;

  return createMetadata({
    title: title,
    description: description,
    image: createOgImage({
      title: title,
      meta: description,
    }),
  });
}

const Page = () => {
  if (!ENABLE_BUDDY) {
    notFound();
  }

  return (
    <>
      <BuddyOptions />
    </>
  );
};

export default Page;
