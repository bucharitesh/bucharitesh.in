"use client";

import { saveGuestbookEntry } from "@/lib/db/guestbook";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, memo, useRef, useState } from "react";
import { SignaturePad, SignaturePadRef } from "@/components/ui/signature-pad";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const LoginButton = memo(function LoginButton() {
  return (
    <motion.button
      className="group w-full relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5
        bg-white dark:bg-neutral-800/90 overflow-hidden
        text-neutral-900 dark:text-neutral-100
        border border-neutral-200 dark:border-neutral-700
        hover:border-neutral-300 dark:hover:border-neutral-600
        shadow-sm hover:shadow-md
        transition-all duration-300"
      onClick={() => signIn("github")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neutral-100/0 via-neutral-100/50 dark:from-neutral-700/0 dark:via-neutral-700/50 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <GitHubLogoIcon className="h-4 w-4" />
      <span className="font-medium text-sm">Sign in with GitHub</span>
    </motion.button>
  );
});

const UserImage = memo(function UserImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Image
      src={src}
      width="24"
      height="24"
      alt={alt}
      className="rounded-full shadow-sm ring-1 ring-neutral-200/50 dark:ring-neutral-700"
    />
  );
});

export function Form() {
  const signaturePadRef = useRef<SignaturePadRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localSignature, setLocalSignature] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const formData = new FormData(e.currentTarget);
        await saveGuestbookEntry(formData, localSignature || "");
        formRef.current?.reset();
        signaturePadRef.current?.clear();
        setLocalSignature(null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [localSignature]
  );

  if (!session?.user) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center w-full"
      >
        <LoginButton />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative w-full"
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <form
          ref={formRef}
          className="relative flex justify-between w-full flex-col space-y-4 rounded-2xl p-5
           dark:bg-gradient-to-br dark:from-neutral-800/90 dark:via-neutral-900/90 dark:to-neutral-950/95 
            bg-gradient-to-br from-neutral-50/90 via-neutral-100/80 to-white/90
            border border-neutral-200/50 dark:border-neutral-800/50
            shadow-lg shadow-neutral-200/20 dark:shadow-neutral-950/30
            backdrop-blur-md
            group
            transition-all duration-300"
          onSubmit={handleSubmit}
        >
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Message input area */}
            <div className="flex w-full items-start gap-2">
              {session.user.image && (
                <UserImage
                  src={session.user.image}
                  alt={session.user.name || "Avatar"}
                />
              )}
              <textarea
                aria-label="Your message"
                placeholder="Write your message..."
                name="entry"
                rows={2}
                required
                autoComplete="off"
                className="w-full p-0 border-none text-sm outline-none bg-transparent 
                  focus:outline-none focus:ring-0 text-neutral-900 dark:text-neutral-100 
                  placeholder:text-neutral-500 dark:placeholder:text-neutral-400 
                  transition-colors duration-200
                  resize-none
                  border border-transparent"
              />
            </div>

            {/* Signature area */}
            <div className="w-full space-y-1.5">
              <p className="text-xs text-right text-neutral-500 dark:text-neutral-400">
                Add your signature
              </p>
              <SignaturePad
                ref={signaturePadRef}
                className="h-32 w-full rounded-xl border bg-white dark:bg-neutral-800"
                containerClassName="dark:hue-rotate-180 dark:invert"
                onChange={setLocalSignature}
                onClear={() => setLocalSignature(null)}
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-1">
              <motion.button
                className="text-xs font-medium
                text-neutral-600 dark:text-neutral-400 
                hover:text-neutral-900 dark:hover:text-neutral-100 
                transition-colors duration-200"
                onClick={() => signOut()}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign out
              </motion.button>
              <motion.button
                className="flex items-center justify-center rounded-xl 
                dark:bg-neutral-800/80 bg-neutral-100/80 px-5 py-2 text-sm font-medium
                disabled:opacity-50 disabled:cursor-not-allowed 
                hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80
                transition-colors duration-200"
                disabled={isSubmitting}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Signing..." : "Sign"}
              </motion.button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
