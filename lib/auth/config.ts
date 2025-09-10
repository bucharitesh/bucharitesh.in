import type { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';

export type User = {
  name: string;
  picture: string;
  sub: string;
  email?: string;
};

const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.AUTH_SECRET as string,
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.sub = token.sub;
      }
      return session;
    },
  },
};

export default authConfig;
