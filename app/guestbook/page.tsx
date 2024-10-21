import PageWrapper from "@/ui/layout/page-wrapper";
import React, { Suspense } from "react";
import { Metadata } from "next/types";
import { Form } from "./form";
import { getGuestbookEntries } from "@/lib/db/guestbook";
import Image from "next/image";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Write anything for future visitors of this website. I'd love a random joke though.",
  alternates: {
    canonical: "/guestbook",
  },
};

export default async function Page() {
  return (
    <PageWrapper
      title="Guestbook"
      description="Sign my guestbook and leave your mark"
    >
      <div className="space-y-10">
        <Suspense fallback={<div className="h-[70px]" />}>
          <Form />
        </Suspense>
        <GuestbookEntries />
      </div>
    </PageWrapper>
  );
}

async function GuestbookEntries() {
  const entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => <WordsEntry key={entry.id} comment={entry} />);
}

function WordsEntry({ comment }: any) {
  return (
    <div className="relative flex w-full flex-col space-y-4">
      <div className="prose w-full break-words prose-dark text-primary">
        {comment.message}
      </div>
      <div className="flex items-center space-x-3">
        <Image
          src={comment.image}
          width="20"
          height="20"
          objectFit="cover"
          className="rounded-full border-none outline-none ring-1 ring-primary-400 ring-offset-1 ring-offset-transparent"
          alt=""
        />

        <p className="text-sm text-primary/90">{comment.name}</p>

        <span className="text-primary-400">/</span>

        <p className="text-sm text-primary/90">
          {format(new Date(comment.createdAt), "d MMM yyyy 'at' h:mm bb")}
        </p>
      </div>
    </div>
  );
}
