import Link from "next/link"
import { Craft } from "@/.contentlayer/generated"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

interface DocsPagerProps {
  doc: Craft
  all: Craft[]
}

export function DocPager({ doc, all }: DocsPagerProps) {
  const pager = getPagerForDoc(doc, all)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: "outline" })}
        >
          <ChevronLeftIcon className="mr-2 size-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "")}
        >
          {pager.next.title}
          <ChevronRightIcon className="ml-2 size-4" />
        </Link>
      )}
    </div>
  )
}

export function getPagerForDoc(doc: Craft, allDocs: any) {
  const getURLs = allDocs.map((doc) => {
    return {
      title: doc.title,
      href: doc.url,
    }
  })

  const flattenedLinks = [null, ...flatten(getURLs), null]

  const activeIndex = flattenedLinks.findIndex((link) => doc.url === link?.href)

  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null

  return {
    prev,
    next,
  }
}

export function flatten(links: any[]): any[] {
  return links
    .reduce<any[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link)
    }, [])
    .filter((link) => !link?.disabled)
}
