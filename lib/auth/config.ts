import type { NextAuthConfig } from "next-auth"
import Github from "next-auth/providers/github"

export type User = {
  name: string
  picture: string
  sub: string
  email?: string
}

export default {
  debug: process.env.NODE_ENV !== "production" ? true : false,
  secret: process.env.AUTH_SECRET as string,
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session && session.user && token.sub) {
        session.user.sub = token.sub
      }
      return session
    },
  },
} satisfies NextAuthConfig
