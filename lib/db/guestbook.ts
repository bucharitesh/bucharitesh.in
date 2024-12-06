"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { unstable_cache as cache, revalidatePath } from "next/cache";

async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

export const getGuestbookEntries = cache(async () => {
  return prisma.guestbook.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}, ["guestbook"]);

export async function saveGuestbookEntry(
  formData: FormData,
  localSignature?: string
) {
  let session = await getSession();
  let email = session.user?.email as string;
  let created_by = session.user?.name as string;
  let image = session.user?.image as string;
  let sub = session.user?.sub as string;

  if (!session.user) {
    throw new Error("Unauthorized");
  }

  let entry = formData.get("entry")?.toString() || "";
  let body = entry.slice(0, 500);

  await prisma.guestbook.create({
    data: {
      message: body,
      name: created_by,
      email: email,
      image: image,
      user_id: sub,
      signature: localSignature ?? "",
    },
  });

  revalidatePath("/guestbook");

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

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await getSession();
  let email = session.user?.email as string;

  if (email !== "bucharitesh@gmail.com") {
    throw new Error("Unauthorized");
  }

  await prisma.guestbook.deleteMany({
    where: {
      id: {
        in: selectedEntries,
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/guestbook");
}
