"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { getBookmarkItems } from "./services/raindrop";

export async function getBookmarkItemsByPageIndex(id, pageIndex) {
  return await getBookmarkItems(id, pageIndex);
}

export async function saveGuestbookEntry(state: unknown, formData: FormData) {
  const local_entry_id = formData.get("local_entry_id")?.toString();
  const created_by = formData.get("created_by")?.toString() || "";
  const signature = formData.get("signature")?.toString() || "";
  const hasCreatedEntryBefore = formData
    .get("hasCreatedEntryBefore")
    ?.toString();
  const local_created_by_id = formData.get("local_created_by_id")?.toString();
  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  await sql`
    INSERT INTO "guestbook" (created_by, body, last_modified, signature, hasCreatedEntryBefore, local_created_by_id, local_entry_id, approved) 
    VALUES (${created_by}, ${body}, ${new Date().toISOString()}, ${signature}, ${hasCreatedEntryBefore}, ${local_created_by_id}, ${local_entry_id}, false);
  `;

  revalidatePath("/guestbook");
}

export async function approveGuestbookEntry(id: string) {
  await sql`
    UPDATE "guestbook" SET approved = true WHERE id = ${id};
  `;

  revalidatePath("/guestbook");
}

export async function declineGuestbookEntry(id: string) {
  await sql`
    DELETE FROM "guestbook" WHERE id = ${id};
  `;

  revalidatePath("/guestbook");
}

const GuestbookEntrySchema = z.object({
  created_by: z
    .string()
    .min(1, "pls fill out all fields")
    .max(50, "ur name is too long"),
  entry: z
    .string()
    .min(1, "pls fill out all fields")
    .max(200, "love ur long entry, but can u make it shorter?"),

  signature: z.string().optional(),
  local_entry_id: z.string().optional(),
  hasCreatedEntryBefore: z.string().optional(),
  local_created_by_id: z.string().optional(),
});

export async function validateAndSaveEntry(
  formData: FormData,
  validateOnly = false
) {
  try {
    const data = GuestbookEntrySchema.parse(Object.fromEntries(formData));

    // const isModerated = await moderateText(data.entry);
    // if (!isModerated) {
    //   return { success: false, errors: { entry: ["let's keep it clean"] } };
    // }

    if (validateOnly) {
      return { success: true };
    }

    await saveGuestbookEntry("", formData);

    // sendEmail(formData);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      errors: { form: ["An unexpected error occurred"] },
    };
  }
}

// async function sendEmail(formData: FormData) {
//   try {
//     const response = await fetch("https://mitul.ca/api/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ entry: Object.fromEntries(formData) }),
//       keepalive: true,
//     });

//     if (!response.ok) {
//       console.error("Failed to send email:", await response.text());
//     }
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }

export const getGuestbookEntries = async () => {
  const { rows } = await sql`
    SELECT * FROM "guestbook"
    TABLESAMPLE BERNOULLI (100)
    WHERE approved = true
    ORDER BY RANDOM()
    LIMIT 25;
  `;

  return rows;
};