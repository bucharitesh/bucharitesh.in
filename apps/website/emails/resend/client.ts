import { Resend } from 'resend';

let resendInstance: Resend | null = null;

export const getResendClient = (): Resend => {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
};

// Backward compatibility - lazy initialization
export const resend = new Proxy({} as Resend, {
  get(target, prop) {
    const client = getResendClient();
    const value = client[prop as keyof Resend];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
