import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { HiNewspaper } from 'react-icons/hi2';
import type { CommandGroup } from '../types';

interface CraftCommandProps {
  setOpen: (open: boolean) => void;
  searchQuery: string;
}

export const useCraftsCommand = ({
  setOpen,
  searchQuery,
}: CraftCommandProps): CommandGroup => {
  const router = useRouter();
  const commands = useMemo(() => {
    // Filter published posts and sort by publishedAt
    // const sortedPosts = allPosts
    //   .filter((post) => post.status === "published")
    //   .sort((a, b) =>
    //     compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    //   );
    const sortedPosts: any = [];

    // Filter posts based on search query
    const filteredPosts = sortedPosts.filter((post: any) => {
      if (!searchQuery) return true;

      const searchLower = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.description?.toLowerCase().includes(searchLower)
      );
    });

    // Take top 5 if no search query, otherwise show all matches
    const postsToShow = searchQuery ? filteredPosts : filteredPosts.slice(0, 5);

    return postsToShow.map((post: any) => ({
      id: post._id,
      name: post.title,
      description: (
        <div className="line-clamp-1 truncate">{post.description}</div>
      ),
      icon: HiNewspaper,
      action: () => {
        router.push(`/blog/${post.slug}`);
        setOpen(false);
      },
    }));
  }, [setOpen, searchQuery]);

  return {
    name: 'Crafts',
    commands,
  };
};
