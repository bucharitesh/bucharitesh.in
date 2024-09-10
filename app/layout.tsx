import { meta } from "@/lib/constants"
import { createOgImage } from "@/lib/createOgImage"
import "@/styles/globals.css"
import { Footer } from "@/ui/layout/footer"
import localFont from "next/font/local"
import { Metadata, Viewport } from "next"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"
// import Toolbar from "@/ui/layout/help"
import { ViewTransitions } from "next-view-transitions"

export const viewport: Viewport = {
  themeColor: "#1c1917",
}

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
  }
}

const hubot = localFont({
  src: "../public/assets/HubotSans.woff2",
  variable: "--font-hubot",
  weight: "400 900",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  console.log(createOgImage({ title: meta.name, meta: meta.tagline }))

  return (
    <ViewTransitions>
      <html className="[color-scheme:dark]">
        <SessionProvider session={session}>
          <body
            className={cn(
              "font-sans overscroll-y-none bg-background antialiased selection:bg-primary-600/90 selection:text-white",
              hubot.variable,
            )}
          >
            <svg
              className="pointer-events-none fixed isolate z-50 mix-blend-soft-light"
              width="100%"
              height="100%"
            >
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.80"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            <div className="layout-sm relative z-10 grid gap-y-8 px-4 pt-12 text-primary-200/90 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
              {children}

              <Footer />
            </div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-blend-overlay">
              <div className="h-full bg-[url('https://res.cloudinary.com/bucha/image/upload/h_500/bg_gradient_fmgwrc')] bg-top bg-no-repeat opacity-[0.3]" />
            </div>

            {/* <UserSurveyPopup /> */}
            {/* <Toolbar /> */}
          </body>
        </SessionProvider>
      </html>
    </ViewTransitions>
  )
}
