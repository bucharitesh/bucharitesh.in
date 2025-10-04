import findIp from '@arcjet/ip';
import { isbot } from 'isbot';
import { type NextRequest, NextResponse } from 'next/server';

// import { sendEmail } from '@/emails';
// import BookMarkSubmittedEmail from '@/emails/templates/bookmark-submitted-email';
import { formSchema } from '@/features/bookmarks/components/submit-bookmark/utils';
import rateLimit from '@/lib/rate-limit'; // TODO: Add rate limit

const limiter = rateLimit({
  interval: 600 * 1000, // 10 minutes (600 seconds * 1000 ms)
  uniqueTokenPerInterval: 500, // Max 500 IPs
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const data = await formSchema.safeParse(json);
  if (!data.success) {
    const { error } = data;
    return NextResponse.json({ error }, { status: 400 });
  }

  if (isbot(req.headers.get('User-Agent'))) {
    return NextResponse.json(
      { error: 'Bots are not allowed.' },
      { status: 403 }
    );
  }

  if (process.env.NODE_ENV === 'production') {
    // Use the @arcjet/ip package to get the client's IP address. This looks at
    // the headers set by different hosting platforms to try and get the real IP
    // address before falling back to the request's remote address. This is
    // necessary because the IP headers could be spoofed. In non-production
    // environments we allow private/internal IPs.
    const ip = findIp(req, req.headers as any);

    try {
      await limiter.check(5, ip); // Limit to 5 requests
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    }
  }

  try {
    const { url, email, type } = data.data;

    // await sendEmail({
    //   email: 'bucharitesh@gmail.com',
    //   react: BookMarkSubmittedEmail({ url, email, type }),
    //   subject: 'New bookmark submitted by ' + email,
    //   text: `New bookmark submitted: ${url} of type ${type || 'Other'}`,
    // });

    // const res = await response.json()
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:');
    return NextResponse.json(
      { error: 'Error submitting bookmark.' },
      { status: 500 }
    );
  }
}
