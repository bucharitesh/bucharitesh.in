import { meta } from "@/lib/constants"
import { IntersectionSwap } from "@/ui/intersection-swap"
import { Nav } from "@/ui/Nav"
import { ProfileImageLarge } from "@/ui/ProfileImage"
import { SiteHeader } from "@/ui/SiteHeader"
import { Metadata } from "next"
import FlamMark from "@/ui/icons/FlamMark"
import { COMMON_SCRIPT_ORG } from "../lib/script"
import { CraftShowcase } from "./craft-showcase"
import RecentBlogs from "./recent-blogs"

export const metadata: Metadata = {
  title: meta.tagline,
  description: meta.description,
  alternates: {
    canonical: "/",
  },
}

export default async function Page() {
  return (
    <>
      <COMMON_SCRIPT_ORG />
      <IntersectionSwap nav={<SiteHeader />}>
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <ProfileImageLarge />

            <div className="mt-2 space-y-1">
              <h1 className="text-3xl font-semibold leading-none text-primary-100/90">
                {meta.name}
              </h1>

              <h2 className="mt-2 items-center space-y-2 text-lg font-medium leading-none text-primary-100/50 lg:mt-0 lg:flex lg:space-y-0 lg:space-x-2">
                <div className="whitespace-nowrap">User Experience at</div>
                <div className="flex space-x-2">
                  <a
                    className="group flex items-center space-x-1.5"
                    href="https://flamapp.ai"
                  >
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-black p-[7px] text-white shadow-lg shadow-green-900/60 ring-2 ring-green-400/20 group-hover:shadow-xl group-hover:shadow-green-700 group-hover:ring-green-400/30">
                      <FlamMark />
                    </div>
                    <div className="group-hover:text-green-100/90">Flam</div>
                  </a>
                </div>
              </h2>
            </div>
          </div>
          <div className="text-xl text-primary-100/90">{meta.description}</div>
          <Nav />
        </div>
      </IntersectionSwap>

      <div className="mt-12">
        <div className="space-y-20">
          {/* <div className="text-gray-200 space-y-4 leading-snug">
            <p>
              I'm a frontend developer, optimist, and community builder. I work
              at{" "}
              <Link href="/work" className="text-blue-500 hover:text-blue-700">
                Vercel
              </Link>
              , where I teach the{" "}
              <Link
                href="/n/stack"
                className="text-blue-500 hover:text-blue-700"
              >
                Next.js
              </Link>{" "}
              community, an open-source web framework built with React.
            </p>
            <p>
              I create educational content for developers, teaching them about
              TypeScript, React and Next.js, and more. I write about{" "}
              <Link href="/n/dx" className="text-blue-500 hover:text-blue-700">
                developer experience
              </Link>
              ,{" "}
              <Link
                href="/n/developer-marketing"
                className="text-blue-500 hover:text-blue-700"
              >
                developer marketing
              </Link>
              ,{" "}
              <Link
                href="/n/devrel"
                className="text-blue-500 hover:text-blue-700"
              >
                developer relations
              </Link>
              , building{" "}
              <Link
                href="/n/devtools"
                className="text-blue-500 hover:text-blue-700"
              >
                developer tools
              </Link>
              , and{" "}
              <Link
                href="/n/moderation"
                className="text-blue-500 hover:text-blue-700"
              >
                open-source
              </Link>
              .
            </p>
            <p>
              I invest small angel checks into early stage startups building
              tools for developers.
            </p>
          </div> */}

          <RecentBlogs />

          {/* <CraftShowcase /> */}
        </div>
      </div>
    </>
  )
}
