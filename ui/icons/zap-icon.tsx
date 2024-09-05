"use client"

import React from "react"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export const ZapIcon = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
        transition={{
          duration: 0.5,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        <motion.div
          initial={{ pathLength: 0, fill: "rgba(255, 255, 0, 0)" }}
          animate={{ pathLength: 1, fill: "rgba(255, 255, 0, 1)" }}
          transition={{
            pathLength: { type: "spring", duration: 0.5, bounce: 0 },
            fill: { delay: 0.2, type: "spring", duration: 0.3, bounce: 0 },
          }}
        >
          <Zap className="h-3 w-3 text-yellow-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ZapIcon
