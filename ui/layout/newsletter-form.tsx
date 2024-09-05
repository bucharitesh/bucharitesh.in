"use client"

import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewsletterFormSchema } from "@/lib/schema"

import { subscribe } from "@/lib/resend"
import { useState, useEffect } from "react"
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/20/solid"
import { BorderBeam } from "../border-beam"
import clsx from "clsx"
import { OOF_GRAD } from "@/lib/constants"

type Inputs = z.infer<typeof NewsletterFormSchema>

export default function NewsletterForm() {
  const [success, setSuccess] = useState<boolean>(false)

  // useEffect(() => {
  //   const isSubscribed = localStorage?.getItem("subscribed") === "true"
  //   setSuccess(isSubscribed)
  // }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await subscribe(data)

    if (result?.error) {
      console.error(result?.error ?? "An error occurred! Please try again.")
      return
    }

    localStorage.setItem("subscribed", "true")

    setSuccess(true)
    reset()
  }

  if (success) {
    return (
      <section className="pointer-events-none relative my-8 p-8 bg-primary-400/40 rounded-xl border-0 dark:border items-center justify-center text-center font-bold overflow-hidden">
        <h1
          className={clsx(
            "absolute -top-1/4 left-1/2 -translate-x-1/2 text-6xl font-bold opacity-20 from-primary-200/70 to-primary-400/10",
            OOF_GRAD,
          )}
        >
          Subscribed
        </h1>
        <p className="text-sm text-primary-200">
          Amazing content is on its way!
        </p>
        <h1
          className={clsx(
            "absolute -bottom-1/4 left-1/2 -translate-x-1/2 text-6xl font-bold rotate-180 opacity-20 from-primary-200/70 to-primary-400/10",
            OOF_GRAD,
          )}
        >
          Subscribed
        </h1>
      </section>
    )
  }

  return (
    <section className="relative my-8 p-8 bg-primary-200/20 rounded-xl border-0 dark:border grid grid-cols-4 flex-col gap-8 md:flex-row md:justify-between">
      <BorderBeam colorFrom="#9f1239" colorTo="#fb7185" />

      <div className="flex flex-col gap-1 col-span-2">
        <h2 className="text-xl font-bold">Subscribe to awesomeness</h2>
        <p className="text-sm text-muted-foreground">
          I wont spam you. Pinky Promise!
        </p>
      </div>

      <form
        onSubmit={handleSubmit(processForm)}
        className="flex items-center gap-3 col-span-2"
      >
        <input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="Email"
          className="w-full rounded-md border border-input px-4 py-2 bg-primary-200 text-primary-800 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("email")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-max disabled:opacity-50 rounded-md px-4 py-2 bg-primary-400 text-primary-foreground hover:bg-primary/90"
        >
          {isSubmitting ? (
            <ArrowUpIcon className="w-4 h-4" />
          ) : (
            <ArrowRightIcon className="w-4 h-4" />
          )}
        </button>
      </form>
    </section>
  )
}
