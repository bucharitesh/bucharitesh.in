import { USER } from '@/config/user';
import { resend } from './resend';
import { VARIANT_TO_FROM_MAP } from './resend/constants';
import type { ResendEmailOptions } from './resend/types';

// Send email using Resend (Recommended for production)
export const sendEmailViaResend = async (opts: ResendEmailOptions) => {
  if (!process.env.RESEND_API_KEY) {
    console.info(
      'RESEND_API_KEY is not set in the .env. Skipping sending email.'
    );
    return;
  }

  const {
    email,
    from,
    variant = 'primary',
    bcc,
    replyTo,
    subject,
    text,
    react,
    scheduledAt,
  } = opts;

  try {
    return await resend.emails.send({
      to: email,
      from: from || VARIANT_TO_FROM_MAP[variant],
      bcc: bcc,
      replyTo: replyTo || USER.email,
      subject,
      text,
      react,
      scheduledAt,
      // ...(variant === "marketing" && {
      //   headers: {
      //     "List-Unsubscribe": "https://app.dub.co/account/settings",
      //   },
      // }),
    });
  } catch (error) {
    console.error('Failed to send email via Resend:', error);
    throw error;
  }
};
