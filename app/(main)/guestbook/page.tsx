import PageWrapper from "@/ui/layout/page-wrapper"
import React from "react"
import PageClient from "./page-client"
import { auth } from "@/lib/auth"
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Write anything for future visitors of this website. I'd love a random joke though.",
}

export default async function Page() {
  const session = await auth()

  return (
    <PageWrapper
      title="Words"
      description="Write anything for future visitors of this website. I'd love a random
        joke though."
    >
      <div className="space-y-10">
        <PageClient session={session} />
      </div>
    </PageWrapper>
  )
}
