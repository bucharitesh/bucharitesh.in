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
      bg-gradient-to-br from-neutral-50/90 via-neutral-100/80 to-white/90
      dark:bg-gradient-to-br dark:from-neutral-800/80 dark:via-neutral-900/90 dark:to-neutral-950
      border border-neutral-200/50 dark:border-neutral-800/50
      shadow-lg shadow-neutral-200/20 dark:shadow-neutral-950/50
      backdrop-blur-md
      group
      transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left side - User info and message */}
        <div className="flex-1 space-y-2">
          {/* User info */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src={comment.image}
                width="24"
                height="24"
                alt={comment.name}
                className="rounded-full shadow-sm ring-1 ring-neutral-200/50 dark:ring-neutral-700
                  transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-400/10 to-neutral-300/10 dark:from-neutral-600/20 dark:to-neutral-700/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            </div>
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
            <div className="absolute inset-0 blur-[2px] bg-gradient-to-b from-transparent via-neutral-300/5 to-neutral-300/10 dark:via-neutral-600/10 dark:to-neutral-500/20 opacity-0 transition-opacity duration-300" />
            <img
              className="relative h-10 w-max object-contain opacity-90
                transition-all duration-300
                dark:invert dark:contrast-125 dark:brightness-125"
              src={comment.signature}
              alt={`${comment.name}'s signature`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
