import { saveSupportEntry } from "@/lib/db/support";
import { Input } from "@/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, ChevronLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";

export function ContactForm({
  setScreen,
}: {
  setScreen: Dispatch<SetStateAction<"main" | "contact">>;
}) {
  return (
    <div className="relative w-full px-3 pb-16 pt-5 sm:px-2">
      <button
        type="button"
        className="-ml-2 flex items-center text-center text-primary space-x-1 px-2 py-1"
        onClick={() => setScreen("main")}
      >
        <ChevronLeft className="h-4 w-4" />
        <h3 className="text-sm">Back</h3>
      </button>

      <AnimatePresence>
        <Form />
      </AnimatePresence>
    </div>
  );
}

export const Form = () => {
  const [state, formAction] = useFormState(saveSupportEntry, {
    success: false,
  });

  if (state?.success) {
    return (
      <motion.div
        className="flex h-[280px] flex-col items-center justify-center space-y-3 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CheckCheck className="h-8 w-8 text-primary" />
        <p className="text-primary">
          Thanks for reaching out! <br /> I'll get back to you as soon as
          possible.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      className="mt-5 grid gap-2"
      action={formAction}
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <label>
        <span className="text-sm font-medium text-primary">Name</span>
        <Input
          name="name"
          required
          placeholder="enter your name"
          autoFocus
          className={`${"border-primary-400 text-primary placeholder-primary focus:border-primary focus:ring-primary"} mt-1 block w-full resize-none rounded-md focus:outline-none sm:text-sm bg-primary-400/20`}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-primary">Email</span>
        <Input
          name="email"
          type="email"
          placeholder="enter your email"
          className={`${"border-primary-400 text-primary placeholder-primary focus:border-primary focus:ring-primary"} mt-1 block w-full resize-none rounded-md focus:outline-none sm:text-sm bg-primary-400/20`}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-primary">Message</span>
        <TextareaAutosize
          name="message"
          required
          placeholder="E.g. I want a custom website."
          minRows={8}
          autoComplete="off"
          className={`${"border-primary-400 text-primary placeholder-primary focus:border-primary focus:ring-primary"} mt-1 block w-full resize-none rounded-md focus:outline-none sm:text-sm bg-primary-400/20`}
        />
      </label>
      <SubmitButton />
    </motion.form>
  );
};
