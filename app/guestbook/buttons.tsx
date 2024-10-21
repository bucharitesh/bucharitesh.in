"use client";

import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button className="text-xs text-primary" onClick={() => signOut()}>
      Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <button
      className="my-4 flex w-64 items-center justify-center rounded-full px-4 py-2 font-bold bg-primary/80 text-primary"
      onClick={() => signIn("github")}
    >
      Login to write
    </button>
  );
}
