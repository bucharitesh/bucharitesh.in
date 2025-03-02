import { meta } from "@/lib/config";
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

// import { EasterEggs } from "@/components/layout/info";
// import ConsoleEasterEgg from "@/components/layout/console-easter-egg";
// import DartImpact from "@/components/layout/dart-easter-egg";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "flex font-x overscroll-y-none z-0 h-[100dvh] w-[100dvw] antialiased selection:bg-blue-400/90 selection:text-white",
            fontX.variable,
            fontMono.variable,
          )}
        >
          <Providers session={session}>
            <Navigation />
            <main
              id="main-content"
              vaul-drawer-wrapper=""
              className="relative mt-12 md:mt-0 h-[calc(100dvh-3rem)] md:h-full w-full flex-1 overflow-y-auto bg-[#f9f9f9] dark:bg-[#161616]"
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
