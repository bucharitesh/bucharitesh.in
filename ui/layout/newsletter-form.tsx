"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsletterFormSchema } from "@/lib/schema";

import { subscribe } from "@/lib/resend";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { Input } from "../input";
import { Button } from "../button";
import { LoadingDots } from "../loading-dots";
import Confetti, { ConfettiRef } from "../magicui/confetti";

type Inputs = z.infer<typeof NewsletterFormSchema>;

export default function NewsletterForm({ submitted }: { submitted: boolean }) {
  const [success, setSuccess] = useState<boolean>(submitted ?? false);

  const confettiRef = useRef<ConfettiRef>(null);

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
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await subscribe(data);

    if (result?.error) {
      console.error(result?.error ?? "An error occurred! Please try again.");
      return;
    }

    setSuccess(true);
    reset();
    confettiRef.current?.fire({});
  };

  return (
    <section className="relative my-8 overflow-clip bg-primary/95 border-primary z-40 rounded-xl border-0 dark:border w-full p-6 md:p-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <h1
        className={cn(
          "absolute uppercase -z-10 -top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4 text-4xl md:text-6xl font-bold bg-gradient-to-b opacity-5 from-primary to-primary bg-clip-text text-transparent"
        )}
      >
        Subscribe{success && "d"}
      </h1>
      <h1
        className={cn(
          "absolute uppercase -z-10 -bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-4xl md:text-6xl font-bold bg-gradient-to-b opacity-5 from-primary to-primary bg-clip-text text-transparent"
        )}
      >
        Subscribe{success && "d"}
      </h1>
      {success ? (
        <p className="text-base w-full text-center text-primary">
          Amazing content is on its way!
        </p>
      ) : (
        <>
          <p className="text-base text-primary lowercase">
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
      {success && (
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
        />
      )}
    </section>
  );
}
