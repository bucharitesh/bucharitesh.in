import { meta } from "@/lib/constants"
import { IntersectionSwap } from "@/ui/intersection-swap"
import { Nav } from "@/ui/Nav"
import { ProfileImageLarge } from "@/ui/ProfileImage"
import { SiteHeader } from "@/ui/SiteHeader"
import { Metadata } from "next"
import FlamMark from "@/ui/icons/FlamMark"
import { getAllPosts } from "@/lib/posts"
import { COMMON_SCRIPT_ORG } from "../lib/script"
import { BlogItem } from "../ui/blog/blog-item"
import { Link } from "next-view-transitions"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: meta.tagline,
  description: meta.description,
  alternates: {
    canonical: "/",
  },
}

export default async function Page() {
  const posts = await getAllPosts();

  const recentPosts = posts.slice(0, 3);

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
        <div className="flex flex-col space-y-10">
          {/* Recent Blogs */}
          <div className="font-semibold flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="mt-10 text-base text-primary-500/90 mb-6">
                Recent Blogs
              </h3>
            </div>
            {recentPosts.map((post) => {
              return <BlogItem key={post.slug} {...post} />
            })}
          </div>
          <Link
            href="/blog"
            className="flex w-max items-center justify-end hover:underline transition-all hover:underline-offset-4 text-primary-300/90 text-xs self-center gap-2 group"
          >
            view all
            <ArrowRight className="w-2 h-2 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </>
  )
}
