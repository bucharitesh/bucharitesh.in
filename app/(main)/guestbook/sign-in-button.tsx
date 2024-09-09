"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useSWRConfig } from "swr"
import { useState, useTransition, useEffect } from "react"

const Form = {
  Initial: "Initial",
  Loading: "Loading",
  Success: "Success",
  ErrorState: "ErrorState",
}

export default function LoginButton() {
  const { data: session, status } = useSession()
  const { mutate } = useSWRConfig()
  const { register, handleSubmit, reset } = useForm()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (status === "loading") {
      console.log("Session is loading...")
    }
  }, [status])

  const leaveEntry = async (data: any) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/guestbook", {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })

        const { error } = await res.json()
        if (error) {
          setMessage(error)
          return
        }

        reset()
        mutate("/api/guestbook")
        setMessage(`Thanks for writing! You're awesome 👑`)
      } catch (err) {
        console.error("Error submitting entry:", err)
        setMessage("An error occurred. Please try again.")
      }
    })
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (!session) {
    return (
      <button
        className="my-4 flex w-64 items-center justify-center rounded-full px-4 py-2 font-bold bg-primary-800/80 text-primary-100"
        onClick={(e) => {
          e.preventDefault()
          signIn("github")
        }}
      >
        Login to write
      </button>
    )
  }

  return (
    <div className="relative my-4 w-full">
      {session && (
        <form
          onSubmit={handleSubmit(leaveEntry)}
          className="relative my-4 flex flex-col items-start"
        >
          <div className="relative mb-4 w-full rounded-xl border border-slate-800">
            <textarea
              {...register("message", { required: true })}
              placeholder="Your message..."
              className="mt-1 block w-full rounded-md bg-transparent px-4 py-2 focus:outline-none text-primary-400"
            />
            <span className="absolute -bottom-px right-px h-px w-[40%] bg-gradient-to-r from-primary-400/0 via-primary-400/40 to-primary-400/0"></span>
            <span className="absolute -left-px top-4 h-[40%] w-px bg-gradient-to-b from-primary-400/0 via-primary-400/40 to-primary-400/0"></span>
          </div>
          <div className="flex gap-2">
            <button
              className="flex w-28 items-center justify-center rounded px-4 py-2 font-medium bg-primary-700 text-primary-100"
              type="submit"
            >
              {isPending ? "Loading..." : "Write"}
            </button>
            <a
              className="flex items-center justify-center px-4 py-2 text-xs text-primary-100"
              onClick={(e) => {
                signOut()
              }}
            >
              Sign out
            </a>
          </div>
        </form>
      )}
      {message && (
        <p
          className={`text-sm ${message.includes("Thanks") ? "text-gray-500" : "text-red-500"}`}
        >
          {message}
        </p>
      )}
      {!message && (
        <p className="text-sm text-gray-200">
          Your name and email will be safe with me.
        </p>
      )}
    </div>
  )
}
