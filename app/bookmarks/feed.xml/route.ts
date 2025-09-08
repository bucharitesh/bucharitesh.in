import { Feed } from 'feed'

import { getBookmarkItems, getBookmarks } from '@/lib/services/raindrop'
import { USER } from '@/config/user'

export async function GET() {
  const bookmarks = await getBookmarks()
  const date = new Date()
  const siteURL = `https://${USER.domain}`
  const author = {
    name: USER.name,
    link: `https://${USER.domain}`
  }

  const feed = new Feed({
    title: `Bookmarks RSS feed by ${author.name}`,
    description: 'Stay up to date with my latest selection of various handpicked bookmarks',
    id: siteURL,
    link: `${siteURL}/bookmarks`,
    language: 'en',
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    author,
    feedLinks: {
      rss2: `${siteURL}/bookmarks/rss.xml`
    }
  })

  const bookmarkList: any = []
  for (const bookmark of bookmarks) {
    const bookmarkItems = await getBookmarkItems(bookmark._id)
    const { items = [] } = bookmarkItems ?? {}

    console.log(items);

    items?.slice(0, 10).forEach((bookmark) => {
      bookmarkList.push({
        id: bookmark._id,
        guid: bookmark._id,
        title: bookmark.title,
        link: bookmark.link,
        description: bookmark.excerpt,
        content: bookmark.excerpt,
        image: bookmark.cover,
        date: new Date(bookmark.created),
        updated: new Date(bookmark.lastUpdate),
        author: [author],
        contributor: [author]
      })
    })
  }

  const sortedBookmarks = bookmarkList.sort((a, b) => {
    const dateA = new Date(a.updated || a.created).getTime();
    const dateB = new Date(b.updated || b.created).getTime();
    return dateB - dateA;
  });

  sortedBookmarks.forEach((bookmark) => {
    feed.addItem({ ...bookmark });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  })
}