import { AnimatePresence, motion } from "framer-motion"
import { CheckCheck, CheckCircle, ChevronLeft } from "lucide-react"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { toast } from "sonner"

export function ContactForm({
  setScreen,
}: {
  setScreen: Dispatch<SetStateAction<"main" | "contact">>
}) {
  const [data, setData] = useState<{
    message: string
    name: string
    email: string
  }>({
    message: "",
    name: "",
    email: "",
  })

  const formRef = useRef<HTMLFormElement>(null)
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">(
    "idle",
  )

  return (
    <div className="relative w-full px-3 pb-16 pt-5 sm:px-6">
      <button
        type="button"
        className="-ml-2 flex items-center text-center text-primary-100 space-x-1 px-2 py-1"
        onClick={() => setScreen("main")}
      >
        <ChevronLeft className="h-4 w-4" />
        <h3 className="text-sm">Back</h3>
      </button>

      <AnimatePresence>
        {formStatus === "success" ? (
          <motion.div
            className="flex h-[280px] flex-col items-center justify-center space-y-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCheck className="h-8 w-8 text-primary-200" />
            <p className="text-primary-500">
              Thanks for reaching out! <br /> I'll get back to you as soon as
              possible.
            </p>
          </motion.div>
        ) : (
          <motion.form
            ref={formRef}
            className="mt-5 grid gap-2"
            onSubmit={async (e) => {
              e.preventDefault()
              setFormStatus("loading")
              const res = await fetch("/api/support", {
                method: "POST",
                body: JSON.stringify(data),
              }).then((res) => res.json())
              if (res.error) {
                toast.error(res.error)
                setFormStatus("idle")
              } else {
                setData({ message: "", name: "", email: "" })
                setFormStatus("success")
              }
            }}
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <label>
              <span className="text-sm font-medium text-primary-300">Name</span>
              <input
                name="name"
                required
                autoFocus
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`${"border-primary-400 text-primary-200 placeholder-primary-300 focus:border-primary-500 focus:ring-primary-500"} mt-1 block w-full resize-none rounded-md focus:outline-none sm:text-sm bg-primary-400/20`}
              />
            </label>

            <label>
              <span className="text-sm font-medium text-primary-300">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`${"border-primary-400 text-primary-200 placeholder-primary-300 focus:border-primary-500 focus:ring-primary-500"} mt-1 block w-full resize-none rounded-md focus:outline-none sm:text-sm bg-primary-400/20`}
              />
            </label>

            <label>
              <span className="text-sm font-medium text-primary-300">
                Message
              </span>
              <TextareaAutosize
                name="message"
                required
                placeholder="E.g. I want a custom website."
                minRows={8}
                autoComplete="off"
                value={data.message}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, message: e.target.value }))
                }
                className={`${"border-primary-400 text-primary-200 placeholder-primary-300 focus:border-primary-500 focus:ring-primary-500"} mt-1 block w-full resize-none rounded-md focus:outline-none sm:text-sm bg-primary-400/20`}
              />
            </label>

            <div className="fixed bottom-0 left-0 z-10 flex h-16 w-full items-center justify-center rounded-b-lg bg-primary-600 px-3 sm:px-6">
              <button
                className="h-9"
                disabled={!data.message}
              >
                Send message
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
