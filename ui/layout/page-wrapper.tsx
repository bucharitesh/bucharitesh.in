import { OOF_GRAD } from "@/lib/constants"
import clsx from "clsx"
import React from "react"
import Balancer from "react-wrap-balancer"

export default function PageWrapper({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title: string
  description?: string
}) {
  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <h1 className={clsx("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>{title}</Balancer>
        </h1>
        <p className="mt-6 text-sm font-bold text-primary-100/40">
          {description}
        </p>
      </div>
      
      {children}
    </>
  )
}
