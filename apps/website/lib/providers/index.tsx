'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Provider as JotaiProvider } from 'jotai';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { DesignSystemProvider } from '@repo/design-system';

export function Providers({
  children,
  session,
  ...props
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <JotaiProvider>
        <DesignSystemProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </DesignSystemProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
