"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { BlurImage } from "./mdx/blur-image"

import { AnimatePresence } from "framer-motion"
import Cookies from "js-cookie"
import { ReactNode, createContext, useState } from "react"
import { ClientOnly } from "./client-only"
import { createOgImage } from "@/lib/createOgImage"

const POPUP_URL = "https://bucharitesh.in/cal"

const POPUP_IMAGE_URL = createOgImage({
  title: "Book a meeting",
  meta: "bucharitesh.in",
})
const POPUP_TITLE = "Book a meeting"
const POPUP_DESCRIPTION =
  "Ready to elevate your project? 🚀 Book a meeting with me and let's turn your ideas into reality! Your journey starts here."
const POPUP_ID = "hideChangelogPopup09172024"

export const PopupContext = createContext<{
  hidePopup: () => void
}>({
  hidePopup: () => {},
})

export function Popup({
  children,
  hiddenCookieId,
}: {
  children: ReactNode
  hiddenCookieId: string
}) {
  const [hidden, setHidden] = useState(true);

  const hidePopup = () => {
    setHidden(true)
    Cookies.set(hiddenCookieId, "1")
  }

  useEffect(() => {
    let timeout;

    timeout = setTimeout(() => {
      setHidden(Cookies.get(hiddenCookieId) === "1")
    }, 10000);

    () => {
      clearTimeout(timeout);
      return setHidden(true);
    };
  }, [])

  return (
    <ClientOnly>
      <PopupContext.Provider value={{ hidePopup }}>
        <AnimatePresence>{!hidden && children}</AnimatePresence>
      </PopupContext.Provider>
    </ClientOnly>
  )
}

export default function ChangelogPopup() {
  return (
    <Popup hiddenCookieId={POPUP_ID}>
      <ChangelogPopupInner />
    </Popup>
  )
}

export function ChangelogPopupInner() {
  const { hidePopup } = useContext(PopupContext)

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      exit={{ opacity: 0, y: "100%" }}
      className="group fixed bottom-4 z-40 mx-2 overflow-hidden rounded-lg border border-primary-200 bg-primary-200 shadow-md sm:left-4 sm:mx-auto sm:max-w-sm"
    >
      <button
        className="absolute right-2.5 top-2.5 z-10 rounded-full p-1 transition-colors text-primary-100 hover:bg-primary-800 active:scale-90"
        onClick={hidePopup}
      >
        <X className="h-4 w-4 text-primary-200" />
      </button>
      <Link
        href={POPUP_URL}
        target="_blank"
        className="flex max-w-sm flex-col items-center justify-center"
        onClick={() => hidePopup()}
      >
        <div className="border-b border-primary-200">
          <BlurImage
            src={POPUP_IMAGE_URL}
            alt="Root Domain Links"
            className="aspect-[1200/630] object-cover"
            width={1200}
            height={630}
          />
        </div>
        <div className="grid max-w-sm gap-1.5 p-4 text-center">
          <p className="text-center font-semibold text-primary-800 underline-offset-4 group-hover:underline">
            {POPUP_TITLE}
          </p>
          <p className="text-pretty text-sm text-primary-800/60">
            {POPUP_DESCRIPTION}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
