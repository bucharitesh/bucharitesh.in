import { USER } from '@/config/user';
import type { Activity } from '@repo/design-system/components/ui/contribution-graph';

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export async function getContributions() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USER.username}?y=2025`,
    {
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    }
  );
  const data = (await res.json()) as GitHubContributionsResponse;
  return data.contributions;
}
