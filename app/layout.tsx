import { meta, META_THEME_COLORS } from "@/lib/config";
import { createOgImage } from "@/lib/createOgImage";
import { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { fontMono, fontX } from "@/lib/fonts";

import "@/styles/globals.css";
import "@/styles/mdx.css";

import { auth } from "@/lib/auth";
import DevTools from "@/components/dev-tools";
import Navigation from "@/components/navigation";
import { Providers } from "@/lib/providers";
import Script from "next/script";
import { WebSite, WithContext } from "schema-dts";

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: meta.name,
    url: `https://${meta.domain}`,
    alternateName: [meta.username],
  };
}

export const viewport: Viewport = {
  themeColor: "#1c1917",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { template: `%s | ${meta.name}`, default: `${meta.name}` },
    metadataBase: new URL(`https://${meta.domain}`),
    openGraph: {
      title: meta.name,
      siteName: meta.name,
      type: "website",
      url: `https://${meta.domain}`,
      images: [
        {
          url: createOgImage({ title: meta.name, meta: meta.tagline }),
          width: 1600,
          height: 836,
          alt: meta.name,
        },
      ],
    },
    twitter: {
      creator: meta.twitterHandle,
      card: "summary_large_image",
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
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: darkModeScript }}
          />
          <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getWebSiteJsonLd()).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        </head>
        <body
          className={cn(
            "flex font-x overscroll-y-none z-0 h-[100dvh] w-[100dvw] antialiased selection:bg-blue-400/90 selection:text-white",
            fontX.variable,
            fontMono.variable
          )}
        >
          <Providers session={session}>
            <Navigation />
            <main
              id="main-content"
              vaul-drawer-wrapper=""
              className="relative mt-12 md:mt-0 h-[calc(100dvh-3rem)] md:h-full w-full flex-1 overflow-y-auto"
            >
              {children}
            </main>
            <DevTools />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
