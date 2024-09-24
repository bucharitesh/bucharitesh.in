"use server"

import { cookies } from "next/headers"

const MAX_BOOKMARK_SUBMISSIONS_PER_DAY = "";
const BOOKMARK_SUBMISSION_COUNT_COOKIE_NAME = "";

export async function submitBookmark(formData) {
  const cookieStore = cookies()

  // Fake promise to simulate submitting the form
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const formSubmissionCountCookie: any = cookieStore.get(
    BOOKMARK_SUBMISSION_COUNT_COOKIE_NAME,
  );

  if (formSubmissionCountCookie?.value >= MAX_BOOKMARK_SUBMISSIONS_PER_DAY) {
    throw new Error(
      "You have already Subscribed.",
    )
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_BOOKMARKS_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          fields: {
            URL: formData.url,
            Email: formData.email,
            Date: new Date().toISOString(),
            Type: formData.type || "Other",
          },
        }),
        signal: AbortSignal.timeout(5000),
      },
    )

    cookieStore.set(
      formSubmissionCountCookie?.name ?? BOOKMARK_SUBMISSION_COUNT_COOKIE_NAME, // Name
      Number(formSubmissionCountCookie?.value ?? 0) + 1, // Value
      {
        maxAge: 60 * 60 * 24, // 24 hours
      },
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.info(error)
    throw new Error("Failed to submit bookmark")
  }
}