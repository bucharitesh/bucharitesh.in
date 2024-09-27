import Link from "next/link"

import { getBookmarks } from "@/lib/services/raindrop"
import { sortByProperty } from "@/lib/utils"
import PageWrapper from "@/ui/layout/page-wrapper"

// Revalidate all routes every 2 days
export const revalidate = 60 * 60 * 24 * 2 // 2 days

async function fetchData() {
  const bookmarks = await getBookmarks()
  const sortedBookmarks = sortByProperty(bookmarks, "title")
  return { bookmarks: sortedBookmarks }
}

export default async function Bookmarks() {
  const { bookmarks } = await fetchData()

  return (
    <PageWrapper title={"Bookmarks"}>
      <div className="grid grid-cols-2 gap-4">
        {bookmarks?.map((bookmark) => {
          return (
            <Link
              key={bookmark._id}
              href={`/bookmarks/${bookmark.slug}`}
              className="flex flex-col gap-1 border-b p-2 text-primary-400 text-sm bg-primary-100 rounded-xl"
            >
              <span className="font-medium">{bookmark.title}</span>
              <span className="text-slate-500">{bookmark.count} bookmarks</span>
            </Link>
          )
        })}
      </div>
    </PageWrapper>
  )
}
