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
      <div className="flex space-y-4 flex-col lowercase items-start mt-24 mb-4 xl:!col-end-5">
        <div className="flex items-center justify-center space-x-4">
          <h1 className={cn("text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
            {title}
          </h1>
          {action}
        </div>
        <p className="text-sm font-bold text-primary-100/40">
          {description}
        </p>
      </div>
      {children}
    </>
  );
}
