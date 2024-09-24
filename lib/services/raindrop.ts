// import { cache } from "react"
// import "server-only"

export const TWEETS_COLLECTION_ID = 15896982

export const COLLECTION_IDS = [
  48069938, 48073561,
  // 15968768,
  // 23598938,
  // 16949672,
  // 15807896,
  // 15807897,
  // 15969648,
  // 16338467,
  // TWEETS_COLLECTION_ID,
  // 25589709,
  // 17139082,
  // 22029101,
  // 39696243,
]

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${"8da007a5-ea8d-46c1-a754-99f1249faf7c"}`,
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