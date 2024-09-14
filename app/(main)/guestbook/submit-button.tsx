"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="flex w-28 items-center justify-center rounded px-4 py-2 font-medium bg-primary-700 text-primary-100"
      disabled={pending}
      type="submit"
    >
      Sign
    </button>
  )
}
