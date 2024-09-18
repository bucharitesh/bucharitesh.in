"use client"

import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewsletterFormSchema } from "@/lib/schema"

import { subscribe } from "@/lib/resend"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { OOF_GRAD } from "@/lib/constants"
import { Send, SendHorizonal } from "lucide-react"
import { Input } from "../input"
import { Button } from "../button"
import { LoadingDots } from "../loading-dots"
import Confetti, { ConfettiRef } from "../magicui/confetti"

type Inputs = z.infer<typeof NewsletterFormSchema>

export default function NewsletterForm() {
  const [success, setSuccess] = useState<boolean>(false)

  const confettiRef = useRef<ConfettiRef>(null)

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
    confettiRef.current?.fire({});
  }

  return (
    <section className="relative w-full">
      <h1
        className={cn(
          "absolute z-0 -top-1/3 left-1/2 opacity-50 -translate-x-1/2 text-4xl md:text-6xl font-bold bg-gradient-to-br from-primary-200/40 to-primary-200/0 bg-clip-text text-transparent",
        )}
      >
        Subscribe{success && "d"}
      </h1>
      <div className="my-8 bg-primary-900 border-primary-900 z-40 rounded-xl border-0 dark:border w-full p-6 md:p-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {success ? (
          <p className="text-base w-full text-center text-primary-200">
            Amazing content is on its way!
          </p>
        ) : (
          <>
            <p className="text-base text-primary-100 lowercase">
              I wont spam you. Pinky Promise!
            </p>

            <form
              onSubmit={handleSubmit(processForm)}
              className="flex items-center gap-3"
            >
              <Input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                {...register("email")}
              />

              <Button
                variant={"outline"}
                type="submit"
                disabled={isSubmitting}
                className="group"
              >
                {isSubmitting ? (
                  <LoadingDots />
                ) : (
                  <SendHorizonal className="w-4 h-4 group-hover:-rotate-45 transition-all" />
                )}
              </Button>
            </form>
          </>
        )}
      </div>

      {success && (
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
        />
      )}
    </section>
  )
}
