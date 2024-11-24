"use client";

import { Button } from "@/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="fixed bottom-0 left-0 z-10 flex h-16 w-full items-center justify-center rounded-b-lg bg-primary px-3 sm:px-6"
      disabled={pending}
      type="submit"
    >
      {pending ? "Loading..." : "Sign"}
    </Button>
  );
}
