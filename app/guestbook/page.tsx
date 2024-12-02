import { Metadata } from "next/types";
import React, { Suspense } from "react";
import { Form } from "./form";
import GuestbookEntries from "./guestbook-entries";
import { getGuestbookEntries } from "@/lib/db/guestbook";

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Write anything for future visitors of this website. I'd love a random joke though.",
  alternates: {
    canonical: "/guestbook",
  },
};

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div className="layout-sm relative z-10 grid gap-y-8 px-4 pt-12 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
      <div className="sticky top-10 space-y-2 hidden h-0 xl:!col-start-2 xl:row-start-1 xl:block col-span-1">
        <h2 className="text-4xl font-bold font-ndot55 uppercase tracking-wider">Guestbook</h2>
        <p className="text-sm text-gray-500">
          Leave a message for future visitors of this website.
        </p>
      </div>
      <Suspense fallback={<div className="h-[70px]" />}>
        <GuestbookEntries entries={entries} />
      </Suspense>
      <div className="sticky top-10 hidden h-0 xl:!col-start-4 xl:row-start-1 xl:block col-span-2 max-w-md">
        <Form />
      </div>
    </div>
  );
}
