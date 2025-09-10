'use server';

import { sendEmail } from '@/emails';
import BookMarkSubmittedEmail from '@/emails/templates/bookmark-submitted-email';
import { getBookmarkItems } from './raindrop';

export async function getBookmarkItemsByPageIndex(
  id: string,
  pageIndex: number
) {
  return await getBookmarkItems(id, pageIndex);
}

export async function submitBookmark(url: string, email: string, type: string) {
  try {
    await sendEmail({
      email,
      react: BookMarkSubmittedEmail({ url, email, type }),
      subject: 'New bookmark submitted',
      text: `New bookmark submitted: ${url} of type ${type || 'Other'}`,
    });
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to send email' };
  }
  return { success: true };
}
