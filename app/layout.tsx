import { createOgImage } from '@/lib/createOgImage';
import { fontMono, fontX } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import type React from 'react';

import '@/styles/globals.css';

import DevTools from '@/components/dev-tools';
import Navigation from '@/components/navigation';
import { META_THEME_COLORS } from '@/config/site';
import { USER } from '@/config/user';
import { auth } from '@/lib/auth';
import { Providers } from '@/lib/providers';
import Script from 'next/script';
import type { WebSite, WithContext } from 'schema-dts';

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: USER.name,
    url: `https://${USER.domain}`,
    alternateName: [USER.username],
  };
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
  width: 'device-width',
  initialScale: 1,
};

export function generateMetadata(): Metadata {
  return {
    title: { template: `%s | ${USER.name}`, default: `${USER.name}` },
    metadataBase: new URL(`https://${USER.domain}`),
    openGraph: {
      title: USER.name,
      siteName: USER.name,
      type: 'website',
      url: `https://${USER.domain}`,
      images: [
        {
          url: createOgImage({ title: USER.name, meta: USER.tagline }),
          width: 1600,
          height: 836,
          alt: USER.name,
        },
      ],
    },
    twitter: {
      creator: USER.twitterHandle,
      card: 'summary_large_image',
    },
  };
}

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={cn(fontX.variable, fontMono.variable)}>
        <Providers session={session}>
          <Navigation />
          <main
            id="main-content"
            vaul-drawer-wrapper=""
            className="relative min-h-screen w-full bg-background"
          >
            {children}
          </main>
          <DevTools />
        </Providers>
      </body>
    </html>
  );
}
