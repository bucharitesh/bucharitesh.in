import useSWR, { type SWRConfiguration } from 'swr';

const API_URL = `/api/posts/most_viewed`;

async function getTrendingPosts(): Promise<any> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  const data = await res.json();

  const trendingPosts: any = [];

  // if (allPosts.length > 0) {
  //   trendingPosts = allPosts.filter((post) =>
  //     data?.some((trendingItem) => trendingItem.slug === post.slug)
  //   );
  // }

  return trendingPosts ?? [];
}

export const useTrendingPosts = (config?: SWRConfiguration) => {
  const { data: trendingPosts, error } = useSWR<any>(
    [API_URL],
    () => getTrendingPosts(),
    {
      dedupingInterval: 60000,
      ...config,
    }
  );

  return {
    posts: trendingPosts ?? [],
    isLoading: !error && !trendingPosts,
    isError: !!error,
  };
};
