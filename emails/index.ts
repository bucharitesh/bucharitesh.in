import { CreateEmailOptions, Resend } from "resend"

export const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendEmail = async ({
  email,
  subject,
  from,
  bcc,
  replyToFromEmail,
  text,
  react,
  scheduledAt,
  marketing,
}: Omit<CreateEmailOptions, "to" | "from"> & {
  email: string
  from?: string
  replyToFromEmail?: boolean
  marketing?: boolean
}) => {
  if (process.env.NODE_ENV === "development" && !resend) {
    // Set up a fake email client for development
    console.info(
      `Email to ${email} with subject ${subject} sent from ${
        from || process.env.NEXT_PUBLIC_APP_NAME
      }`,
    )
    return Promise.resolve()
  } else if (!resend) {
    console.error(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.",
    )
    return Promise.resolve()
  }

  return resend.emails.send({
    to: email,
    from: from || "Ritesh Bucha <me@bucharitesh.in>",
    bcc: bcc,
    ...(!replyToFromEmail && {
      replyTo: "contact@bucharitesh.in",
    }),
    subject: subject,
    text: text,
    react: react,
    scheduledAt,
    // ...(marketing && {
    //   headers: {
    //     "List-Unsubscribe": "https://app.dub.co/account/settings",
    //   },
    // }),
  })
}
