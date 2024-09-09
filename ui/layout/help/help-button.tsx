"use client"

import { AnimatePresence, motion } from "framer-motion"
import { XIcon } from "lucide-react"
import { useRef, useState } from "react"
import { useResizeObserver } from "@/lib/hooks/use-resize-observer"
import { Popover } from "@/ui/popover"
import { ContactForm } from "./contact-form"
import MainContent from "./main-content"

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      content={<HelpSection />}
      openPopover={isOpen}
      setOpenPopover={setIsOpen}
      align="end"
      popoverContentClassName="p-4 max-w-md"
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen((o) => !o)
        }}
        className="font-lg relative h-12 w-12 overflow-hidden rounded-full border text-primary-200 border-primary-400/20 bg-white/5 shadow-md active:bg-primary-600"
      >
        <AnimatePresence>
          <motion.div
            key={isOpen ? "open" : "closed"}
            className="absolute inset-0 flex items-center justify-center font-medium text-primary-100 hover:text-primary-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {isOpen ? <XIcon className="h-4 w-4" strokeWidth={2} /> : "?"}
          </motion.div>
        </AnimatePresence>
      </button>
    </Popover>
  )
}

function HelpSection() {
  const [screen, setScreen] = useState<"main" | "contact">("main")

  const containerRef = useRef<HTMLDivElement>(null)
  const resizeObserverEntry = useResizeObserver(containerRef)

  return (
    <motion.div
      className="w-full overflow-scroll sm:w-[24rem]"
      animate={{
        height: resizeObserverEntry?.borderBoxSize[0].blockSize ?? "auto",
        maxHeight: "calc(100vh - 10rem)",
      }}
      transition={{ type: "spring", duration: 0.3 }}
    >
      <div ref={containerRef}>
        {screen === "main" && <MainContent setScreen={setScreen} />}
        {screen === "contact" && <ContactForm setScreen={setScreen} />}
      </div>
    </motion.div>
  )
}
