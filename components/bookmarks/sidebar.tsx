'use client'

import { RadioIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { LoadingSpinner } from '@/components/ui/loading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

const SubmitBookmarkDialog = dynamic(
  () => import('@/components/bookmarks/submit-bookmark/dialog').then((mod) => mod.SubmitBookmarkDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

import { cn } from '@/lib/utils'

export const SideMenu = ({ children, title, bookmarks = [], isInner } : { children: React.ReactNode, title: string, bookmarks: any[], isInner: boolean }) => {
  const pathname = usePathname()

  const isWritingPath = pathname.startsWith('/writing')
  const isBookmarksPath = pathname.startsWith('/bookmarks')
  const currentBookmark = bookmarks.find((bookmark : any) => `/bookmarks/${bookmark.slug}` === pathname)

  const memoizedScrollArea = useMemo(
    () => (
      <ScrollArea
        className={cn(
          'hidden bg-zinc-50 lg:flex lg:flex-col lg:border-r',
          isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72'
        )}
      >
        {title && (
          <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-tight">{title}</span>
              <div className="flex items-center gap-2">
                {(isWritingPath || isBookmarksPath) && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={isWritingPath ? '/writing.xml' : '/bookmarks.xml'}
                      title="RSS feed"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RadioIcon size={16} className="mr-2" />
                      RSS feed
                    </a>
                  </Button>
                )}
                {isBookmarksPath && <SubmitBookmarkDialog bookmarks={bookmarks} currentBookmark={currentBookmark} />}
              </div>
            </div>
          </div>
        )}
        <div className="bg-zinc-50 p-3">{children}</div>
      </ScrollArea>
    ),
    [isInner, title, isWritingPath, isBookmarksPath, bookmarks, currentBookmark, children]
  )

  return memoizedScrollArea
}