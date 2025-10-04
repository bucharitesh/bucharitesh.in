import { Suspense } from 'react';

import { getContributions } from '@/features/home/data/graph';
import { GitHubContributionFallback, GitHubContributionGraph } from './graph';

export function GitHubContribution() {
  const contributions = getContributions();

  return (
    <>
      <h2 className="sr-only">GitHub Contribution</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>
    </>
  );
}
