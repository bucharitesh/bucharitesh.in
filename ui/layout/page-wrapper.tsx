import { OOF_GRAD } from "@/lib/constants"
import { cn } from "@/lib/utils"
import React from "react"
import Balancer from "react-wrap-balancer"

export default function PageWrapper({
  children,
  title,
  description,
  action,
}: {
  children: React.ReactNode
  title: string
  description?: string
  action?: any
}) {
  return (
    <>
      <div className="flex justify-between items-center mt-24 mb-4 xl:!col-end-5">
        <div>
          <h1 className={cn("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
            <Balancer>{title}</Balancer>
          </h1>

          <p className="mt-6 text-sm font-bold text-primary-100/40">
            {description}
          </p>
        </div>
        {action}
      </div>

      {children}
    </>
  )
}
