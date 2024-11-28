"use client";

import { saveGuestbookEntry } from "@/lib/db/guestbook";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStatus } from "react-dom";
import { useRef } from "react";

export function Form() {
  const { data: session } = useSession();
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  if (!session?.user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="my-4 flex w-64 items-center justify-center rounded-lg px-4 py-2 
            bg-white dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            border border-neutral-200 dark:border-neutral-700
            hover:bg-neutral-50 dark:hover:bg-neutral-700
            transition-colors duration-200"
          onClick={() => signIn("github")}
        >
          Login to write
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative w-full mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <form
          ref={formRef}
          className="relative flex justify-between w-full flex-col space-y-4 rounded-[2.8rem] p-8
           dark:bg-gradient-to-br dark:from-neutral-800/90 dark:via-neutral-900/90 dark:to-neutral-950/95 
      bg-gradient-to-br from-neutral-50/90 via-neutral-100/80 to-white/90
      border border-neutral-200/50 dark:border-neutral-800/50
      shadow-xl shadow-neutral-200/20 dark:shadow-neutral-950/30
            backdrop-blur-md
            transition-all duration-300"
          action={async (formData: FormData) => {
            await saveGuestbookEntry(formData);
            formRef.current?.reset();
          }}
        >
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {session.user.image && (
              <Image
                src={session.user.image}
                width="30"
                height="30"
                alt={session.user.name || "Avatar"}
                className="rounded-full shadow-md ring-2 ring-neutral-200/50 dark:ring-neutral-700"
              />
            )}
            <input
              aria-label="Your message"
              placeholder="Your message..."
              name="entry"
              required
              className="w-full rounded-lg p-4 text-sm border-none outline-none bg-transparent focus:outline-none focus:ring-0text-neutral-900 dark:text-neutral-100placeholder:text-neutral-500 dark:placeholder:text-neutral-400 transition-colors duration-200"
            />
            <button
              className="flex items-center justify-center rounded-full bg-neutral-800/80 px-6 py-2.5 font-medium"
              disabled={pending}
              type="submit"
            >
              Sign
            </button>
          </motion.div>
          <button
            className="text-sm w-full items-start text-start font-medium
                text-neutral-600 dark:text-neutral-400 
                hover:text-neutral-900 dark:hover:text-neutral-100 
                transition-colors duration-200"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
