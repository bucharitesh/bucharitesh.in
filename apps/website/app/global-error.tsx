'use client';

import { fontMono, fontX } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Button } from '@repo/design-system/components/ui/button';
import type NextError from 'next/error';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  return (
    <html lang="en" className={cn(fontX.variable, fontMono.variable)}>
      <body>
        <h1>Oops, something went wrong</h1>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
};

export default GlobalError;
