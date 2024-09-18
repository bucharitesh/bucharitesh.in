"use client"

import { ChevronLeft } from "lucide-react"
import { useTransitionRouter } from "next-view-transitions"
import React from "react"

const Back = () => {
  const router = useTransitionRouter()

  return (
    <div
      onClick={() => router.back()}
      className="group inline-flex items-center space-x-2 cursor-pointer"
    >
      <div className="transition rounded-full bg-primary-200/10 p-1 text-primary-200/80 group-hover:bg-primary-200/25 group-hover:text-primary-200">
        <ChevronLeft className="w-3 h-3 group-hover:scale-125 transition-transform group-active:scale-110" />
      </div>
      <div className="mt-0.5 text-primary-200/70 group-hover:text-primary-200/90 transition">
        back
      </div>
    </div>
  )
}

export default Back
