import { meta } from "@/lib/constants"
import { createOgImage } from "@/lib/createOgImage"
import "@/styles/globals.css"
import { SiteFooter } from "@/ui/SiteFooter"
import localFont from "next/font/local"
import clsx from "clsx"
import { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"

export const viewport: Viewport = {
  themeColor: "#1c1917",
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { template: `${meta.name} | %s`, default: `${meta.name}` },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="[color-scheme:dark]">
      <body
        className={clsx(
          "font-sans overscroll-y-none bg-[#080B12] antialiased selection:bg-violet-600/90 selection:text-white",
          hubot.variable,
        )}
      >
        {/* <PreloadResources /> */}
        {/* <svg
          className="pointer-events-none fixed isolate z-50 mix-blend-soft-light"
          width="100%"
          height="100%"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="6"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg> */}

        <svg
          width="100%"
          height="100%"
          className="fixed z-0 pointer-events-none isolate opacity-100"
        >
          <defs>
            <filter
              id="nnnoise-filter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="linearRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="2"
                numOctaves="6"
                seed="30"
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence"
              ></feTurbulence>
              <feSpecularLighting
                surfaceScale="15"
                specularConstant="0.75"
                specularExponent="20"
                lightingColor="#7957A8"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                result="specularLighting"
              >
                <feDistantLight azimuth="3" elevation="100"></feDistantLight>
              </feSpecularLighting>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="#080b12ff"></rect>
          <rect
            width="100%"
            height="100%"
            fill="#7957a8"
            filter="url(#nnnoise-filter)"
          ></rect>
        </svg>

        <div className="layout-sm relative z-10 grid gap-y-8 px-4 pt-12 text-lavender-200/90 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
          {children}

          <SiteFooter />
        </div>

        {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="h-full bg-[url('https://res.cloudinary.com/bucharitesh/image/upload/h_500/bg_gradient_pfosr9')] bg-top bg-no-repeat opacity-[0.3]" />
        </div> */}

        <Analytics />
      </body>
    </html>
  )
}
