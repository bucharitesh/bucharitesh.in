"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Provider({
  children,
  session,
  ...props
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <NextThemesProvider attribute="class" defaultTheme="light" {...props}>
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}
