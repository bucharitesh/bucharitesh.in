"use client"

import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewsletterFormSchema } from "@/lib/schema"

import { subscribe } from "@/lib/resend"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { OOF_GRAD } from "@/lib/constants"
import { Send, SendHorizonal } from "lucide-react"
import { Input } from "../input"
import { Button } from "../button"
import { LoadingDots } from "../loading-dots"

type Inputs = z.infer<typeof NewsletterFormSchema>

export default function NewsletterForm() {
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const isSubscribed = localStorage?.getItem("subscribed") === "true"
    setSuccess(isSubscribed)
  }, [])

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
          className={cn(
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
          className={cn(
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
    <section className="relative my-8 p-6 md:p-8 bg-primary-200/20 rounded-xl border-0 dark:border md:grid grid-cols-4 flex flex-col gap-8 md:flex-row md:justify-between">
      <div className="flex flex-col gap-1 col-span-2">
        <h2 className="text-xl font-bold">Subscribe to awesomeness</h2>
        <p className="text-sm text-primary-300">
          I wont spam you. Pinky Promise!
        </p>
      </div>

      <form
        onSubmit={handleSubmit(processForm)}
        className="flex items-center gap-3 col-span-2"
      >
        <Input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="Email"
          {...register("email")}
        />

        <Button type="submit" disabled={isSubmitting} className="group">
          {isSubmitting ? (
            <LoadingDots />
          ) : (
            <SendHorizonal className="w-4 h-4 group-hover:-rotate-45 transition-all" />
          )}
        </Button>
      </form>
    </section>
  )
}
