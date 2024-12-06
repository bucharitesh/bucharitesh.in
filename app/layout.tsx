import { meta } from "@/old/lib/constants";
import { createOgImage } from "@/old/lib/createOgImage";
import { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { fontMono, fontNdot55, fontX } from "@/lib/fonts";

import "@/styles/globals.css";
import "@/styles/cmdk.scss";
import "@/styles/mdx.css";

import { Provider } from "../components/provider";
import BottomDock from "@/components/dock";
import { CommandMenu } from "@/components/command-menu";
import { auth } from "@/lib/auth";
import DevTools from "@/components/dev-tools";

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
          vaul-drawer-wrapper=""
          className={cn(
            "font-x overscroll-y-none z-0 bg-white h-screen w-screen dark:bg-neutral-900 text-black dark:text-white antialiased selection:bg-red-400/90 selection:text-white",
            fontX.variable,
            fontMono.variable,
            fontNdot55.variable
          )}
          suppressHydrationWarning
        >
          <Provider session={session}>
            {children}
            <BottomDock />
            <CommandMenu />
            <DevTools />
          </Provider>
        </body>
      </html>
    </ViewTransitions>
  );
}
