'use client';

import { CopyButton } from '@repo/design-system/components/copy-button';
import { analytics } from '@/lib/analytics';

export function CopyButtonWithAnalytics({
  value,
  className,
  componentName,
}: {
  value: string;
  className?: string;
  componentName?: string;
}) {
  const handleCopy = () => {
    // Track component code copy
    analytics.trackComponentCodeCopy(componentName || 'code_block');
  };

  return (
    <CopyButton 
      value={value} 
      className={className} 
      onCopy={handleCopy}
    />
  );
}



