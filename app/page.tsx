import { meta } from "@/lib/constants"
import { getPosts } from "@/lib/posts"
import { BlogPostPreview } from "@/ui/blog/blog-post-preview"
import { IntersectionSwap } from "@/ui/intersection-swap"
import { Nav } from "@/ui/Nav"
import { ProfileImageLarge } from "@/ui/ProfileImage"
import { SiteHeader } from "@/ui/SiteHeader"

import { Metadata } from "next"
import FlamMark from "@/ui/icons/FlamMark"

export const metadata: Metadata = {
  title: meta.tagline,
  description: meta.description,
}

export default async function Page() {
  const { posts } = await getPosts();

  return (
    <>
      <IntersectionSwap nav={<SiteHeader />}>
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <ProfileImageLarge />

            <div className="mt-2 space-y-1">
              <h1 className="text-3xl font-semibold leading-none text-lavender-100/90">
                {meta.name}
              </h1>

              <h2 className="mt-2 items-center space-y-2 text-lg font-medium leading-none text-lavender-100/50 lg:mt-0 lg:flex lg:space-y-0 lg:space-x-2">
                <div className="whitespace-nowrap">User Experience at</div>
                <div className="flex space-x-2">
                  <a
                    className="group flex items-center space-x-1.5"
                    href="https://flamapp.ai"
                  >
                    <div className="mb-1 h-6 w-6 rounded-md bg-black p-[7px] text-white shadow-lg shadow-green-900/60 ring-2 ring-green-400/20 group-hover:shadow-xl group-hover:shadow-green-700 group-hover:ring-green-400/30">
                      <FlamMark />
                    </div>
                    <div className=" group-hover:text-green-100/90">Flam</div>
                  </a>
                </div>
              </h2>
            </div>
          </div>

          <div className="text-xl text-lavender-100/90">{meta.description}</div>

          <Nav />
        </div>
      </IntersectionSwap>

      <div className="mt-24 space-y-10">
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
        <p>Main content</p>
      </div>
    </>
  )
}
