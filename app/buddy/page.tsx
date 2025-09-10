import { ENABLE_BUDDY } from '@/config/site';
import { BuddyOptions } from '@/features/buddy/options';
import { notFound } from 'next/navigation';

const Page = () => {
  if (!ENABLE_BUDDY) {
    return notFound();
  }

  return <BuddyOptions />;
};

export default Page;
