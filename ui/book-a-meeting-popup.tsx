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
  title: "Let's Discuss",
  meta: "bucharitesh.in",
})

const POPUP_TITLE = "Book a meeting"
const POPUP_DESCRIPTION =
  "🚀 Schedule a meeting with me to discuss anything from design to engineering to business to anything else."
const POPUP_ID = "hideBookaMeetingPopup"

const SHOW_POPUP_AFTER = 25000

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
  const [hidden, setHidden] = useState(true)

  const hidePopup = () => {
    setHidden(true)
    Cookies.set(hiddenCookieId, "1")
  }

  useEffect(() => {
    let timeout

    timeout = setTimeout(() => {
      setHidden(Cookies.get(hiddenCookieId) === "1")
    }, SHOW_POPUP_AFTER);

    return () => {
      clearTimeout(timeout)
      setHidden(true)
    }
  }, [])

  return (
    <ClientOnly>
      <PopupContext.Provider value={{ hidePopup }}>
        <AnimatePresence>{!hidden && children}</AnimatePresence>
      </PopupContext.Provider>
    </ClientOnly>
  )
}

export default function BookaMeetingPopup() {
  return (
    <Popup hiddenCookieId={POPUP_ID}>
      <BookaMeetingPopupInner />
    </Popup>
  )
}

export function BookaMeetingPopupInner() {
  const { hidePopup } = useContext(PopupContext)

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      exit={{ opacity: 0, y: "100%" }}
      className="group fixed bottom-4 z-40 mx-2 overflow-hidden rounded-xl border border-black/40 bg-black/40 shadow-md sm:left-4 sm:mx-auto sm:max-w-sm"
    >
      <button
        className="absolute right-2.5 top-2.5 z-10 rounded-full p-1 transition-colors text-primary-100 hover:text-black hover:bg-white active:scale-90"
        onClick={hidePopup}
      >
        <X className="h-4 w-4" />
      </button>
      <Link
        href={POPUP_URL}
        target="_blank"
        className="flex max-w-sm flex-col items-center justify-center"
        onClick={() => hidePopup()}
      >
        <div className="border-b border-black/80">
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
          <p className="text-pretty text-sm text-primary-100">
            {POPUP_DESCRIPTION}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
