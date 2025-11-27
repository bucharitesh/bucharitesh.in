'use client';

import { analytics } from '@/lib/analytics';
import { isExternalLink } from '@/lib/utils';

export function MDXLinkWithAnalytics({
  href,
  ...props
}: React.ComponentProps<'a'>) {
  const handleClick = () => {
    if (href && isExternalLink(href)) {
      analytics.trackExternalLinkClick(href, 'mdx_content');
    }
  };

  return <a href={href} onClick={handleClick} {...props} />;
}

