"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"

interface CopyButtonProps extends ButtonProps {
  value: string
  src: string
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  src,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 size-6 text-zinc-50 bg-zinc-700 hover:text-zinc-50 [&_svg]:size-3",
        className,
      )}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
