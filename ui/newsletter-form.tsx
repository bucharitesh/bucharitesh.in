"use client"

import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewsletterFormSchema } from "@/lib/schema"

import { subscribe } from "@/lib/resend"
import { useState } from "react"

type Inputs = z.infer<typeof NewsletterFormSchema>

export default function NewsletterForm() {
  const [success, setSuccess] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

    setSuccess(true)
    reset()
  }

  if (success) {
    return <div>Subscribed successfully!</div>
  }

  return (
    <section>
      <div className="rounded-lg border-0 dark:border">
        <div className="flex flex-col gap-8 pt-6 md:flex-row md:justify-between md:pt-8">
          <div>
            <h2 className="text-2xl font-bold">Subscribe to my newsletter</h2>
            <p className="text-muted-foreground">
              Get updates on my work and projects.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(processForm)}
            className="flex flex-col items-start gap-3"
          >
            <div className="w-full">
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full"
                {...register("email")}
              />

              {errors.email?.message && (
                <p className="ml-1 mt-2 text-sm text-rose-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Subscribe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
