'use client';

import { LoaderIcon } from 'lucide-react';
import { use } from 'react';

import type { Activity } from '@repo/design-system/components/ui/contribution-graph';
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from '@repo/design-system/components/ui/contribution-graph';

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  const data = use(contributions);

  return (
    <ContributionGraph
      className="mx-auto font-mono"
      data={data}
      fontSize={11}
      blockSize={9}
      blockMargin={3}
    >
      <ContributionGraphCalendar className="no-scrollbar">
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="">
        <ContributionGraphTotalCount className="text-foreground" />
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-[162px] items-center justify-center">
      <LoaderIcon className="animate-spin text-foreground" />
    </div>
  );
}
