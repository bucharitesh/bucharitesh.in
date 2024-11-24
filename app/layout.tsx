import { meta } from "@/old/lib/constants";
import { createOgImage } from "@/old/lib/createOgImage";
import { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/old/lib/auth";
import { cn } from "@/old/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { fontMono, fontX } from "@/lib/fonts";

import "@/styles/globals.css";
import "@/styles/cmdk.scss";

import { ThemeProvider } from "../components/provider";
import BottomDock from "@/components/dock";
import { CommandMenu } from "@/components/command-menu";

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
        <SessionProvider session={session}>
          <body
            className={cn(
              "font-x overscroll-y-none bg-white dark:bg-neutral-900 text-black dark:text-white antialiased selection:bg-red-400/90 selection:text-white",
              fontX.variable,
              fontMono.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
              <BottomDock />
              <CommandMenu />
              <div className="fixed bottom-0 z-30 w-full pointer-events-none h-[clamp(80px,10vh,200px)] backdrop-blur [mask-image:linear-gradient(to_top,#000_25%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_25%,transparent)]"></div>
            </ThemeProvider>
          </body>
        </SessionProvider>
      </html>
    </ViewTransitions>
  );
}
