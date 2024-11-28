"use client";

import { format } from "date-fns";
import Image from "next/image";
// import { getGuestbookEntries } from "@/lib/db/guestbook";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formatTimeAgo } from "@/lib/utils";

export default function GuestbookEntries({ entries }: { entries: any[] }) {
  const [visibleEntries, setVisibleEntries] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (isInView) {
      const nextBatch: any = entries.slice(0, currentPage * 10);
      setVisibleEntries(nextBatch);
      setCurrentPage((prev) => prev + 1);
    }
  }, [isInView, entries]);

  return (
    <motion.div
      layout
      className="pb-32 space-y-6" // Add bottom padding
      ref={containerRef}
    >
      {visibleEntries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.15,
            type: "spring",
            bounce: 0.2,
          }}
        >
          <WordsEntry comment={entry} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function WordsEntry({ comment }: any) {
  return (
    <div
      className="relative flex w-full flex-col gap-2 rounded-[2.8rem] p-8
      dark:bg-gradient-to-br dark:from-neutral-800/90 dark:via-neutral-900/90 dark:to-neutral-950/95 
      bg-gradient-to-br from-neutral-50/90 via-neutral-100/80 to-white/90
      border border-neutral-200/50 dark:border-neutral-800/50
      shadow-xl shadow-neutral-200/20 dark:shadow-neutral-950/30
      backdrop-blur-md
      hover:shadow-2xl hover:shadow-neutral-200/30 dark:hover:shadow-neutral-950/40
      transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src={comment.image}
            width="30"
            height="30"
            objectFit="cover"
            className="rounded-full shadow-md ring-2 ring-neutral-200/50 dark:ring-neutral-700"
            alt=""
          />
          <p className="font-bold text-md tracking-wide text-neutral-800 dark:text-neutral-100">
            {comment.name}
          </p>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {formatTimeAgo(new Date(comment.createdAt))}
        </p>
      </div>
      <div
        className="prose w-full break-words 
        prose-neutral dark:prose-invert
        prose-p:text-neutral-700 dark:prose-p:text-neutral-300 
        prose-p:leading-relaxed
        ml-10"
      >
        {comment.message}
      </div>
    </div>
  );
}