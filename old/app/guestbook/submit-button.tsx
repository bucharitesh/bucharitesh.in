"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex w-28 items-center justify-center rounded px-4 py-2 font-medium bg-primary text-primary"
      disabled={pending}
      type="submit"
    >
      {pending ? "Loading..." : "Sign"}
    </button>
  );
}
