import { NextRequest, NextResponse } from "next/server";

import { formSchema } from "@/features/bookmarks/components/submit-bookmark/utils";
import { sendEmail } from "@/emails";
import WelcomeEmail from "@/emails/templates/welcome-email";
import BookMarkSubmittedEmail from "@/emails/templates/bookmark-submitted-email";
// import rateLimit from '@/lib/rate-limit' // TODO: Add rate limit

// const limiter = rateLimit({
//   interval: 600 * 1000, // 10 minutes (600 seconds * 1000 ms)
//   uniqueTokenPerInterval: 500 // Max 500 IPs
// })

export async function POST(req: NextRequest) {
  const json = await req.json();
  const data = await formSchema.safeParse(json);
  if (!data.success) {
    const { error } = data;
    return NextResponse.json({ error }, { status: 400 });
  }

  //   if (isbot(req.headers.get('User-Agent'))) {
  //     return NextResponse.json({ error: 'Bots are not allowed.' }, { status: 403 })
  //   }

  // Use the @arcjet/ip package to get the client's IP address. This looks at
  // the headers set by different hosting platforms to try and get the real IP
  // address before falling back to the request's remote address. This is
  // necessary because the IP headers could be spoofed. In non-production
  // environments we allow private/internal IPs.
  //   const clientIp = ip(req, req.headers as any)

  //   try {
  //     // await limiter.check(5, clientIp) // Limit to 5 requests
  //   } catch {
  //     return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
  //   }

  try {
    const { url, email, type } = data.data;

    try {
      await sendEmail({
        email: "bucharitesh@gmail.com",
        react: BookMarkSubmittedEmail({ url, email, type }),
        subject: "New bookmark submitted",
        text: `New bookmark submitted: ${url} of type ${type || "Other"}`,
      });
      console.info("Email sent successfully");
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the entire request if email fails
    }

    // const response = await fetch(
    //   `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_BOOKMARKS_TABLE_ID}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`
    //     },
    //     body: JSON.stringify({
    //       fields: {
    //         URL: url,
    //         Email: email,
    //         Date: new Date().toISOString(),
    //         Type: type || 'Other'
    //       }
    //     })
    //   }
    // )

    // const res = await response.json()
    return NextResponse.json({ success: true });
  } catch (error) {
    console.info(error);
    return NextResponse.json(
      { error: "Error submitting bookmark." },
      { status: 500 }
    );
  }
}
