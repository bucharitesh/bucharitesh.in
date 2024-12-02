"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatTimeAgo } from "@/lib/utils";

export default function GuestbookEntries({ entries }: { entries: any[] }) {
  return (
    <motion.div layout className="pb-24 space-y-4">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.1,
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
      className="relative flex w-full flex-col gap-3 rounded-2xl p-5
      dark:bg-gradient-to-br dark:from-neutral-800/90 dark:via-neutral-900/90 dark:to-neutral-950/95 
      bg-gradient-to-br from-neutral-50/90 via-neutral-100/80 to-white/90
      border border-neutral-200/50 dark:border-neutral-800/50
      shadow-lg shadow-neutral-200/20 dark:shadow-neutral-950/30
      backdrop-blur-md
      hover:shadow-xl hover:shadow-neutral-200/30 dark:hover:shadow-neutral-950/40
      group
      transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left side - User info and message */}
        <div className="flex-1 space-y-2">
          {/* User info */}
          <div className="flex items-center gap-2">
            <Image
              src={comment.image}
              width="24"
              height="24"
              alt={comment.name}
              className="rounded-full shadow-sm ring-1 ring-neutral-200/50 dark:ring-neutral-700
                transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
              {comment.name}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              • {formatTimeAgo(new Date(comment.createdAt))}
            </span>
          </div>

          {/* Message */}
          <div
            className="prose-sm w-full break-words
            prose-neutral dark:prose-invert
            prose-p:text-neutral-700 dark:prose-p:text-neutral-300 
            prose-p:leading-normal"
          >
            {comment.message}
          </div>
        </div>

        {/* Right side - Signature */}
        {comment.signature && (
          <div className="relative shrink-0 self-end pl-4">
            <img
              className="h-10 w-max object-contain opacity-90
                transition-all duration-300 group-hover:opacity-100
                dark:invert dark:hue-rotate-180"
              src={comment.signature}
              alt={`${comment.name}'s signature`}
            />
          </div>
        )}
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute left-2 right-2 bottom-0 h-px bg-gradient-to-r 
          from-transparent via-neutral-200/50 dark:via-neutral-700/50 to-transparent
          opacity-0 group-hover:opacity-100 scale-x-90 group-hover:scale-x-100
          transition-all duration-300"
      />
    </div>
  );
}
