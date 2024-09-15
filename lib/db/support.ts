"use server"

import prisma from "@/lib/prisma"

export async function saveSupportEntry(prevState: any, formData: FormData) {
  let name = formData.get("name")?.toString() || ""
  let email = formData.get("email")?.toString() || ""
  let message = formData.get("message")?.toString() || ""

  await prisma.support.create({
    data: {
      name,
      email,
      message,
    },
  })

  return {
    success: true,
  }

  // let data = await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.RESEND_SECRET}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: "guestbook@leerob.io",
  //     to: "me@leerob.io",
  //     subject: "New Guestbook Entry",
  //     html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
  //   }),
  // })

  // let response = await data.json()
  // console.log("Email sent", response)
}