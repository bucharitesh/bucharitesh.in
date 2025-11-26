import { ENABLE_BUDDY } from '@/config/site';
import { USER } from '@/config/user';
import { BuddyOptions } from '@/features/buddy/options';
import { createMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Force static generation at build time
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: 'Buddy',
    description: `${USER.name}'s Buddy - Configure like you own it.`,
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
