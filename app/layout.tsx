import { meta } from "@/lib/constants";
import { createOgImage } from "@/lib/createOgImage";
import { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { hubot } from "@/lib/fonts";

import "@/styles/globals.css";
import "@/styles/mdx.css";
import { ThemeProvider } from "./provider";
import BottomDock from "../ui/layout/bottom-dock";

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
              "font-sans overscroll-y-none bg-white dark:bg-neutral-900 text-black dark:text-white antialiased selection:bg-red-400/90 selection:text-white",
              hubot.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
              <BottomDock />
            </ThemeProvider>
          </body>
        </SessionProvider>
      </html>
    </ViewTransitions>
  );
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
