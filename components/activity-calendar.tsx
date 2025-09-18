'use client';

import { useState } from 'react';
import { type Activity, ActivityCalendar } from 'react-activity-calendar';

export default function MyActivityCalendar({
  data,
}: {
  data: Activity[];
}) {
  const [date, setDate] = useState<Activity | null>(null);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="h-full w-full font-mono">
      <ActivityCalendar
        data={data}
        blockSize={9}
        blockMargin={3}
        labels={{
          totalCount: date
            ? `${date.count} contributions on ${new Date(
                date.date
              ).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}`
            : 'Total {{count}} contributions in {{year}}',
        }}
        hideColorLegend
        fontSize={10}
        eventHandlers={{
          onMouseEnter: () => (activity) => {
            setDate(activity);
          },
          onMouseLeave: () => () => {
            setDate(null);
          },
        }}
      />
    </div>
  );
}
