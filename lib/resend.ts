"use server"

import { Resend } from "resend"
import { NewsletterFormSchema } from "./schema"
import { z } from "zod"
import { sendEmail } from "@/emails"
import WelcomeEmail from "@/emails/welcome-email"
import { cookies } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>

const NEWSLETTER_COOKIE_NAME = "newsletter"

export async function subscribe(data: NewsletterFormInputs) {
  const result = NewsletterFormSchema.safeParse(data);

  const cookieStore = cookies();

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { email } = result.data

    // const { data: contact_list } = await resend.contacts.list({
    //   audienceId: process.env.RESEND_AUDIENCE_ID as string,
    // })

    // if (
    //   contact_list?.data && contact_list?.data.find(
    //     (contact) => contact.email === email,
    //   )
    // ) {
    //   throw new Error("You have already subscribed to the newsletter!")
    // }

    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    })

    if (!data || error) {
      throw new Error("Failed to subscribe")
    }

    sendEmail({
      email: email,
      subject: "Welcome to my newsletter",
      react: WelcomeEmail({ email: email }),
    })

    cookieStore.set(
      NEWSLETTER_COOKIE_NAME, // Name
      "1",
      {
        maxAge: 60 * 60 * 24, // 24 hours
      },
    )

    return { success: true }
  } catch (error) {
    return { error: error.message }
  }
}

export async function unsubscribe({ email }: { email: string }) {
  return await resend.contacts.remove({
    email,
    audienceId: process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID as string,
  })
}
