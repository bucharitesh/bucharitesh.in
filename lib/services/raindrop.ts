import { COLLECTION_IDS } from "../constants"

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.RAINDROP_API_KEY}`,
  },
}

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1"

export const getBookmarkItems = async (id, pageIndex = 0) => {
  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/raindrops/${id}?` +
        new URLSearchParams({
          page: pageIndex.toString(),
          perpage: "50",
        }),
      options,
    )
    return await response.json()
  } catch (error) {
    console.info(error)
    return null
  }
}

export const getBookmarks = async () => {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/collections`, options)
    const bookmarks = await response.json()

    const filteredBookmarks = bookmarks?.items?.filter((bookmark) =>
      COLLECTION_IDS.includes(bookmark._id),
    )

    return filteredBookmarks
  } catch (error) {
    console.info(error)
    return null
  }
}

export const getBookmark = async (id) => {
  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/collection/${id}`,
      options,
    )
    return await response.json()
  } catch (error) {
    console.info(error)
    return null
  }
}

export async function getBookmarkItemsByPageIndex(id, pageIndex) {
  return await getBookmarkItems(id, pageIndex)
}