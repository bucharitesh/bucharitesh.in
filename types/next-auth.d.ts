import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      sub: string;
      image: string;
      name: string;
      email?: string;
    } & DefaultSession['user'];
  }
}
